import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { validateCustomer, validateRestaurant } from "./src/lib/validation.js";
import { appendToSheet } from "./src/lib/google-sheet.js";
import {
  sendAdminNotification,
  sendCustomerConfirmation,
  sendRestaurantConfirmation,
} from "./src/lib/mail.js";

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
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per window

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
    const { type, honeypot, ...formData } = req.body;

    // Honeypot Protection for bots
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Honeypot triggered. Silent ignore.");
      // Return true to fool the spam bot
      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully.",
      });
    }

    if (type === "customer") {
      const validation = validateCustomer(formData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: validation.errors,
        });
      }

      const { name, email, phone, city, notify } = validation.sanitized;
      const timestamp = new Date().toISOString();

      // 1. Store in Google Sheets
      const sheetId = process.env.GOOGLE_SHEET_ID;
      if (sheetId) {
        try {
          await appendToSheet(sheetId, "Customers!A:F", [
            [timestamp, name, email, phone, city, notify ? "YES" : "NO"],
          ]);
        } catch (err) {
          console.error("Google Sheets error (customer):", err);
          // Don't completely fail if Google Sheets is down, but we log it
        }
      } else {
        console.warn("GOOGLE_SHEET_ID is missing. Google Sheets saving skipped.");
      }

      // 2. Send emails
      try {
        await sendAdminNotification("customer", { name, email, phone, city });
      } catch (err) {
        console.error("Admin mail notification error (customer):", err);
      }

      try {
        await sendCustomerConfirmation(email, name);
      } catch (err) {
        console.error("Confirmation mail error (customer):", err);
      }

      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully.",
      });

    } else if (type === "restaurant") {
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
        ownerName,
        email,
        phone,
        city,
        cuisineType,
        averageDailyOrders,
        website,
        message,
      } = validation.sanitized;
      const timestamp = new Date().toISOString();

      // 1. Store in Google Sheets
      const sheetId = process.env.GOOGLE_SHEET_ID;
      if (sheetId) {
        try {
          await appendToSheet(sheetId, "Restaurants!A:J", [
            [
              timestamp,
              restaurantName,
              ownerName,
              email,
              phone,
              cuisineType,
              averageDailyOrders,
              website,
              city,
              message,
            ],
          ]);
        } catch (err) {
          console.error("Google Sheets error (restaurant):", err);
        }
      } else {
        console.warn("GOOGLE_SHEET_ID is missing. Google Sheets saving skipped.");
      }

      // 2. Send emails
      try {
        await sendAdminNotification("restaurant", {
          restaurantName,
          ownerName,
          email,
          phone,
          cuisineType,
          averageDailyOrders,
          website,
          city,
          message,
        });
      } catch (err) {
        console.error("Admin mail notification error (restaurant):", err);
      }

      try {
        await sendRestaurantConfirmation(email, ownerName);
      } catch (err) {
        console.error("Confirmation mail error (restaurant):", err);
      }

      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully.",
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: { type: "Invalid registration type" },
      });
    }

  } catch (error: any) {
    console.error("Server registration error:", error);
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
