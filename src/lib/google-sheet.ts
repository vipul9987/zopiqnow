import { google } from "googleapis";

let sheetsClient: any = null;

export function getSheetsClient() {
  if (!sheetsClient) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error(
        "Google Sheets credentials are missing. Please define GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in your Environment Variables (Settings)."
      );
    }

    // Clean up private key to handle common pasting mistakes (e.g. nested quotes)
    let formattedPrivateKey = privateKey.trim();
    while (
      (formattedPrivateKey.startsWith('"') && formattedPrivateKey.endsWith('"')) ||
      (formattedPrivateKey.startsWith("'") && formattedPrivateKey.endsWith("'"))
    ) {
      formattedPrivateKey = formattedPrivateKey.slice(1, -1).trim();
    }
    formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
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
    
    // Add header row for the sheet
    const headers = [
      "Timestamp",
      "Restaurant Name",
      "City & Address",
      "Phone Number",
      "Instagram",
      "Menu"
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
