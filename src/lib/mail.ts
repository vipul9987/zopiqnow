import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const secure = process.env.SMTP_SECURE === "true" || false;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error("SMTP credentials (SMTP_USER, SMTP_PASS) are missing in environment variables");
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }
  return transporter;
}

export async function sendAdminNotification(data: any) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL is missing in environment variables. Admin notification skipped.");
    return;
  }

  let transporterInstance;
  try {
    transporterInstance = getTransporter();
  } catch (err: any) {
    console.warn("SMTP credentials not configured. Skipping admin notification mail:", err.message);
    return;
  }

  const timestamp = new Date().toLocaleString();
  const subject = `New Restaurant Registration: ${data.restaurantName}`;
  const html = `
    <div style="font-family: sans-serif; color: #111111; max-width: 600px; border: 1px solid #EAEAEA; border-radius: 12px; padding: 24px; background-color: #FFFFFF;">
      <h2 style="color: #FA5903; margin-top: 0; font-size: 20px; font-weight: bold;">New Restaurant Onboarded</h2>
      <p style="color: #555555; font-size: 14px; margin-bottom: 20px;">A restaurant has requested early access with the following details:</p>
      <table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #EAEAEA; width: 100%; font-size: 14px; text-align: left;">
        <tr style="background-color: #F8F9FB;"><th style="width: 35%;">Field</th><th>Value</th></tr>
        <tr><td><strong>Restaurant Name</strong></td><td>${data.restaurantName}</td></tr>
        <tr><td><strong>City & Address</strong></td><td>${data.cityAddress}</td></tr>
        <tr><td><strong>Phone Number</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Instagram</strong></td><td>${data.instagram || "Not provided"}</td></tr>
        <tr><td><strong>Menu</strong></td><td>${data.menu || "Not provided"}</td></tr>
        <tr><td><strong>Timestamp</strong></td><td>${timestamp}</td></tr>
      </table>
    </div>
  `;

  try {
    await transporterInstance.sendMail({
      from: `"ZopiqNow Portal" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject,
      html,
    });
  } catch (error: any) {
    console.error("Failed to send admin notification email:", error?.message || error);
  }
}
