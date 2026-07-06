import { google } from "googleapis";

let sheetsClient: any = null;

export function getSheetsClient() {
  if (!sheetsClient) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error("Google Sheets API credentials (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY) are missing in environment variables");
    }

    // Fix escaped newlines in private key
    const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

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
  
  // Ensure spreadsheet contains this sheet title before trying to append or handle
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
    console.error("Error appending to sheet:", error);
    throw error;
  }
}

export async function ensureSheetExists(spreadsheetId: string, title: string) {
  const sheets = getSheetsClient();
  
  // Check if spreadsheet contains this sheet title
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
    let headers: string[] = [];
    if (title === "Customers") {
      headers = ["Timestamp", "Full Name", "Email", "Phone", "City", "Notify"];
    } else if (title === "Restaurants") {
      headers = [
        "Timestamp",
        "Restaurant Name",
        "Owner Name",
        "Business Email",
        "Phone",
        "Cuisine",
        "Average Daily Orders",
        "Website",
        "City",
        "Message"
      ];
    }
    
    if (headers.length > 0) {
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
}
