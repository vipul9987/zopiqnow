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

export async function sendAdminNotification(type: "customer" | "restaurant", data: any) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL is missing in environment variables. Admin notification skipped.");
    return;
  }

  const transporter = getTransporter();
  const timestamp = new Date().toLocaleString();

  let subject = "";
  let html = "";

  if (type === "customer") {
    subject = "New Customer Pre Registration";
    html = `
      <div style="font-family: sans-serif; color: #111111; max-width: 600px; border: 1px solid #EAEAEA; border-radius: 12px; padding: 24px; background-color: #FFFFFF;">
        <h2 style="color: #FA5903; margin-top: 0; font-size: 20px; font-weight: bold;">New customer registered</h2>
        <p style="color: #555555; font-size: 14px; margin-bottom: 20px;">A new customer has registered for the launch cohort.</p>
        <table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #EAEAEA; width: 100%; font-size: 14px; text-align: left;">
          <tr style="background-color: #F8F9FB;"><th style="width: 30%;">Field</th><th>Value</th></tr>
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>City</strong></td><td>${data.city}</td></tr>
          <tr><td><strong>Timestamp</strong></td><td>${timestamp}</td></tr>
        </table>
      </div>
    `;
  } else {
    subject = "New Restaurant Partner Request";
    html = `
      <div style="font-family: sans-serif; color: #111111; max-width: 600px; border: 1px solid #EAEAEA; border-radius: 12px; padding: 24px; background-color: #FFFFFF;">
        <h2 style="color: #FA5903; margin-top: 0; font-size: 20px; font-weight: bold;">New Restaurant Partner Request</h2>
        <p style="color: #555555; font-size: 14px; margin-bottom: 20px;">A restaurant has requested partnership details for the launch cohort.</p>
        <table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #EAEAEA; width: 100%; font-size: 14px; text-align: left;">
          <tr style="background-color: #F8F9FB;"><th style="width: 35%;">Field</th><th>Value</th></tr>
          <tr><td><strong>Restaurant Name</strong></td><td>${data.restaurantName}</td></tr>
          <tr><td><strong>Owner Name</strong></td><td>${data.ownerName}</td></tr>
          <tr><td><strong>Business Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Cuisine</strong></td><td>${data.cuisineType}</td></tr>
          <tr><td><strong>Average Orders</strong></td><td>${data.averageDailyOrders}</td></tr>
          <tr><td><strong>Website</strong></td><td>${data.website || "N/A"}</td></tr>
          <tr><td><strong>City</strong></td><td>${data.city}</td></tr>
          <tr><td><strong>Message</strong></td><td>${data.message || "N/A"}</td></tr>
          <tr><td><strong>Timestamp</strong></td><td>${timestamp}</td></tr>
        </table>
      </div>
    `;
  }

  await transporter.sendMail({
    from: `"ZopiqNow Portal" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject,
    html,
  });
}

export async function sendCustomerConfirmation(email: string, name: string) {
  const transporter = getTransporter();
  
  const subject = "Welcome to ZopiqNow 🎉";
  const html = `
    <div style="font-family: sans-serif; color: #555555; max-width: 600px; margin: 0 auto; border: 1px solid #EAEAEA; border-radius: 15px; padding: 25px; background-color: #FFFFFF;">
      <h2 style="color: #FA5903; margin-top: 0; font-size: 22px;">Welcome to ZopiqNow, ${name}! 🎉</h2>
      <p style="font-size: 14px; line-height: 1.6;">Thank you for joining the ZopiqNow Early Access Program.</p>
      <p style="font-size: 14px; line-height: 1.6;">We'll notify you as soon as we launch in your city.</p>
      <br />
      <hr style="border: 0; border-top: 1px solid #EAEAEA; margin: 20px 0;" />
      <p style="font-size: 11px; color: #999999; text-align: center;">© 2026 ZopiqNow Inc. All rights reserved.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"ZopiqNow" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html,
  });
}

export async function sendRestaurantConfirmation(email: string, name: string) {
  const transporter = getTransporter();

  const subject = "Thanks for Partnering with ZopiqNow 🚀";
  const html = `
    <div style="font-family: sans-serif; color: #555555; max-width: 600px; margin: 0 auto; border: 1px solid #EAEAEA; border-radius: 15px; padding: 25px; background-color: #FFFFFF;">
      <h2 style="color: #FA5903; margin-top: 0; font-size: 22px;">Thanks for Partnering with ZopiqNow, ${name}! 🚀</h2>
      <p style="font-size: 14px; line-height: 1.6;">Thank you for registering your restaurant.</p>
      <p style="font-size: 14px; line-height: 1.6;">Our onboarding team will review your submission and contact you before launch.</p>
      <br />
      <hr style="border: 0; border-top: 1px solid #EAEAEA; margin: 20px 0;" />
      <p style="font-size: 11px; color: #999999; text-align: center;">© 2026 ZopiqNow Inc. All rights reserved.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"ZopiqNow" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html,
  });
}
