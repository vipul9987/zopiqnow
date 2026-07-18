import { google } from "googleapis";
import fs from "fs";
import path from "path";

let sheetsClient: any = null;

export function getSheetsClient() {
  if (!sheetsClient) {
    let finalClientEmail = "";
    let finalPrivateKey = "";

    // 1. Check if google-service-account.json exists in root directory
    const saPath = path.join(process.cwd(), "google-service-account.json");
    if (fs.existsSync(saPath)) {
      try {
        const saContent = fs.readFileSync(saPath, "utf8");
        const saData = JSON.parse(saContent);
        if (saData.client_email && saData.private_key) {
          finalClientEmail = saData.client_email;
          finalPrivateKey = saData.private_key;
        }
      } catch (err: any) {
        console.error("Error loading service account from google-service-account.json:", err?.message || err);
      }
    }

    // 2. If not loaded, fall back to environment variables
    if (!finalClientEmail || !finalPrivateKey) {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;

      if (!clientEmail || !privateKey) {
        throw new Error(
          "Google Sheets credentials are missing. Please define GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in your Environment Variables (Settings) or make sure google-service-account.json exists."
        );
      }

      // Helper to safely parse JSON if an env var contains the whole service account json file
      const tryParseJson = (str: string) => {
        try {
          const trimmed = str.trim();
          if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            return JSON.parse(trimmed);
          }
        } catch (e) {
          // Not valid JSON
        }
        return null;
      };

      const jsonEmail = tryParseJson(clientEmail);
      const jsonKey = tryParseJson(privateKey);

      if (jsonEmail && jsonEmail.client_email && jsonEmail.private_key) {
        finalClientEmail = jsonEmail.client_email;
        finalPrivateKey = jsonEmail.private_key;
      } else if (jsonKey && jsonKey.client_email && jsonKey.private_key) {
        finalClientEmail = jsonKey.client_email;
        finalPrivateKey = jsonKey.private_key;
      } else {
        // Direct raw parsing with deep sanitization (stripping surrounding quotes)
        let formattedClientEmail = clientEmail.trim();
        while (
          (formattedClientEmail.startsWith('"') && formattedClientEmail.endsWith('"')) ||
          (formattedClientEmail.startsWith("'") && formattedClientEmail.endsWith("'"))
        ) {
          formattedClientEmail = formattedClientEmail.slice(1, -1).trim();
        }

        let formattedPrivateKey = privateKey.trim();
        while (
          (formattedPrivateKey.startsWith('"') && formattedPrivateKey.endsWith('"')) ||
          (formattedPrivateKey.startsWith("'") && formattedPrivateKey.endsWith("'"))
        ) {
          formattedPrivateKey = formattedPrivateKey.slice(1, -1).trim();
        }
        formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, "\n");

        finalClientEmail = formattedClientEmail;
        finalPrivateKey = formattedPrivateKey;
      }
    }

    if (!finalClientEmail || !finalPrivateKey) {
      throw new Error(
        "Invalid Google Sheets credentials. Please check your GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY configuration."
      );
    }

    // Sanitize private key newlines just in case they are formatted with literal \n characters
    let sanitizedPrivateKey = finalPrivateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: finalClientEmail,
      key: sanitizedPrivateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    sheetsClient = google.sheets({ version: "v4", auth });
  }
  return sheetsClient;
}

export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  const sheets = getSheetsClient();
  const tabName = range.split("!")[0];
  
  // Ensure spreadsheet contains this sheet title before trying to append
  await ensureSheetExists(spreadsheetId, tabName);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
  } catch (error: any) {
    console.error("Error appending to Google Sheet:", error?.message || error);
    throw error;
  }
}

export async function ensureSheetExists(spreadsheetId: string, title: string) {
  const sheets = getSheetsClient();
  
  // Get spreadsheet structure
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
  });
  
  const sheetExists = spreadsheet.data.sheets?.some(
    (s: any) => s.properties?.title === title
  );
  
  if (!sheetExists) {
    // Create the sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    });
    
    // Add header row for the sheet depending on sheet name
    const headers = title === "Customers"
      ? [
          "Timestamp",
          "Name",
          "Email",
          "City & Address",
          "Favorite Cuisine"
        ]
      : [
          "Timestamp",
          "Restaurant or Business Name",
          "Owner or Manager Name",
          "City & Address",
          "Phone Number",
          "Instagram Profile",
          "Menu Details"
        ];
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headers],
      },
    });
  }
}
