import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateRestaurant } from "../src/lib/validation.js";
import { appendToSheet } from "../src/lib/google-sheet.js";
import { sendAdminNotification } from "../src/lib/mail.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
  
  try {
    const { honeypot, ...formData } = req.body || {};

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
      ownerName,
      cityAddress,
      phone,
      instagram,
      menu,
    } = validation.sanitized;
    const timestamp = new Date().toISOString();

    let sheetsSaved = false;
    let sheetsError = "";

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (sheetId && clientEmail && privateKey) {
      try {
        await appendToSheet(sheetId, "Restaurants!A:G", [
          [
            timestamp,
            restaurantName,
            ownerName,
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

    try {
      await sendAdminNotification({
        restaurantName,
        ownerName,
        cityAddress,
        phone,
        instagram,
        menu,
      });
    } catch (err) {
      console.error("Admin mail notification error:", err);
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
    console.error("Serverless registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
