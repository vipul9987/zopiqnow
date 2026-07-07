import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { validateRestaurant, validateCustomer } from "./src/lib/validation.js";
import { appendToSheet } from "./src/lib/google-sheet.js";
import { sendAdminNotification, sendCustomerAdminNotification } from "./src/lib/mail.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing
app.use(express.json());

// Simple In-Memory Rate Limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 20; // Max 20 registrations per window

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";
  const now = Date.now();
  
  let record = rateLimits.get(ip);
  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
    rateLimits.set(ip, record);
    return next();
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many registrations from this IP address. Please try again later.",
    });
  }

  record.count++;
  next();
}

// --------------------------------------------------------
// API Routes
// --------------------------------------------------------

app.post("/api/register", rateLimiter, async (req, res) => {
  try {
    const { honeypot, ...formData } = req.body;

    // Honeypot Protection for bots
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Honeypot triggered. Silent ignore.");
      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully.",
      });
    }

    const validation = validateRestaurant(formData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      });
    }

    const {
      restaurantName,
      cityAddress,
      phone,
      instagram,
      menu,
    } = validation.sanitized;
    const timestamp = new Date().toISOString();

    let sheetsSaved = false;
    let sheetsError = "";

    // 1. Store in Google Sheets
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (sheetId && clientEmail && privateKey) {
      try {
        await appendToSheet(sheetId, "Restaurants!A:F", [
          [
            timestamp,
            restaurantName,
            cityAddress,
            phone,
            instagram || "N/A",
            menu || "N/A",
          ],
        ]);
        sheetsSaved = true;
      } catch (err: any) {
        console.error("Google Sheets storage failure:", err);
        sheetsError = err?.message || String(err);
      }
    } else {
      const missing = [];
      if (!sheetId) missing.push("GOOGLE_SHEET_ID");
      if (!clientEmail) missing.push("GOOGLE_CLIENT_EMAIL");
      if (!privateKey) missing.push("GOOGLE_PRIVATE_KEY");
      sheetsError = `Missing environment variables: ${missing.join(", ")}`;
      console.warn("Google Sheets saving skipped. " + sheetsError);
    }

    // 2. Send email notification to Admin
    try {
      await sendAdminNotification({
        restaurantName,
        cityAddress,
        phone,
        instagram,
        menu,
      });
    } catch (err) {
      console.error("Admin mail notification error:", err);
    }

    // If Google Sheets configuration is missing or incorrect, we return an active alert to let the user know,
    // while keeping the registration success on the frontend.
    if (!sheetsSaved) {
      return res.status(200).json({
        success: true,
        message: "Details received, but Google Sheets configuration is pending.",
        sheetsConfigured: false,
        sheetsError,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration submitted successfully.",
      sheetsConfigured: true,
    });

  } catch (error: any) {
    console.error("Server registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.post("/api/register-customer", rateLimiter, async (req, res) => {
  try {
    const { honeypot, ...formData } = req.body;

    // Honeypot Protection for bots
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Customer Honeypot triggered. Silent ignore.");
      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully.",
      });
    }

    const validation = validateCustomer(formData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      });
    }

    const {
      name,
      email,
      cityAddress,
      favoriteCuisine,
    } = validation.sanitized;
    const timestamp = new Date().toISOString();

    let sheetsSaved = false;
    let sheetsError = "";

    // 1. Store in Google Sheets under Customers sheet
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (sheetId && clientEmail && privateKey) {
      try {
        await appendToSheet(sheetId, "Customers!A:E", [
          [
            timestamp,
            name,
            email,
            cityAddress,
            favoriteCuisine || "N/A",
          ],
        ]);
        sheetsSaved = true;
      } catch (err: any) {
        console.error("Google Sheets customer storage failure:", err);
        sheetsError = err?.message || String(err);
      }
    } else {
      const missing = [];
      if (!sheetId) missing.push("GOOGLE_SHEET_ID");
      if (!clientEmail) missing.push("GOOGLE_CLIENT_EMAIL");
      if (!privateKey) missing.push("GOOGLE_PRIVATE_KEY");
      sheetsError = `Missing environment variables: ${missing.join(", ")}`;
      console.warn("Google Sheets saving skipped for customer. " + sheetsError);
    }

    // 2. Send email notification to Admin
    try {
      await sendCustomerAdminNotification({
        name,
        email,
        cityAddress,
        favoriteCuisine,
      });
    } catch (err) {
      console.error("Customer Admin mail notification error:", err);
    }

    if (!sheetsSaved) {
      return res.status(200).json({
        success: true,
        message: "Details received, but Google Sheets configuration is pending.",
        sheetsConfigured: false,
        sheetsError,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration submitted successfully.",
      sheetsConfigured: true,
    });

  } catch (error: any) {
    console.error("Server customer registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

// --------------------------------------------------------
// Vite Middleware / Asset Serving
// --------------------------------------------------------

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
