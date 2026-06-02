import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // CORS & Origin Validation
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowedOrigins = [
    "https://pntech.in",
    "https://www.pntech.in",
    "https://pntech-source-code.vercel.app",
    "https://pntech.vercel.app",
  ];

  // Allow localhost & 127.0.0.1 for development
  const isLocalhost =
    origin?.startsWith("http://localhost") ||
    referer?.startsWith("http://localhost") ||
    origin?.startsWith("http://127.0.0.1") ||
    referer?.startsWith("http://127.0.0.1");

  // Allow Vercel preview/deployment domains
  const isVercel =
    origin?.endsWith(".vercel.app") || referer?.includes(".vercel.app");

  if (origin && !allowedOrigins.includes(origin) && !isLocalhost && !isVercel) {
    return res.status(403).json({
      success: false,
      error: "Forbidden: Request origin not allowed.",
    });
  }

  // Set secure CORS headers
  if (origin && (allowedOrigins.includes(origin) || isLocalhost || isVercel)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://pntech.in");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      company,
      country,
      request_type,
      message,
      _subject,
      website,
    } = req.body;

    // Honeypot check (website is a hidden input field to catch automated spam bots)
    if (website && website.trim() !== "") {
      console.warn(
        "Honeypot input detected. Silently ignoring email dispatch.",
      );
      // Return 200 success so the bot believes it succeeded, preventing form retry loops
      return res.status(200).json({
        success: true,
        message: "Emails sent successfully (honeypot passive mitigation)",
      });
    }

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Name and email are required fields" });
    }

    // HTML Escaping Helper to sanitize inputs and prevent server-side HTML Injection in emails
    const escapeHtml = (text) => {
      if (typeof text !== "string") return "";
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sName = escapeHtml(name);
    const sEmail = escapeHtml(email);
    const sPhone = escapeHtml(phone);
    const sCompany = escapeHtml(company);
    const sCountry = escapeHtml(country);
    const sRequestType = escapeHtml(request_type);
    const sMessage = escapeHtml(message);
    const sSubject = escapeHtml(_subject);

    // Configure sender & receiver options
    const targetEmail = process.env.RECIPIENT_EMAIL || "business@pntech.in";
    const senderDomainEmail = process.env.SENDER_EMAIL || "business@pntech.in"; // Must be a verified email on your domain
    const senderName = "PN Technologies";

    // 1. Construct HTML for the Company Notification Email
    const fieldsHtml = [
      { label: "Name", value: sName },
      { label: "Email", value: sEmail },
      { label: "Phone", value: sPhone || "N/A" },
      { label: "Company", value: sCompany || "N/A" },
      { label: "Country", value: sCountry || "N/A" },
      { label: "Request Type", value: sRequestType || "General Inquiry" },
    ]
      .map(
        (f) => `
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 12px; color: #888; font-weight: 500; width: 140px;">${f.label}</td>
        <td style="padding: 12px; color: #fff;">${f.value}</td>
      </tr>
    `,
      )
      .join("");

    const companyMailHtml = `
      <div style="background-color: #0b0b0b; color: #ffffff; font-family: 'Inter', sans-serif; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #ff6600;">
        <h2 style="color: #ff6600; border-bottom: 2px solid #ff6600; padding-bottom: 10px; margin-top: 0;">New Website Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${fieldsHtml}
        </table>
        <div style="margin-top: 30px; background-color: #161616; padding: 15px; border-radius: 8px; border-left: 4px solid #ff6600;">
          <h4 style="color: #ff6600; margin-top: 0; margin-bottom: 8px;">Message details:</h4>
          <p style="color: #ddd; line-height: 1.6; margin: 0; white-space: pre-wrap;">${sMessage || "No message provided"}</p>
        </div>
      </div>
    `;

    // 2. Construct HTML for the Customer Confirmation Email
    const customerMailHtml = `
      <div style="background-color: #0b0b0b; color: #ffffff; font-family: 'Inter', sans-serif; padding: 40px 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #333; text-align: center;">
        <div style="margin-bottom: 20px;">
          <span style="font-size: 24px; font-weight: 700; color: #ff6600; letter-spacing: 1px;">PN TECHNOLOGIES</span>
          <div style="font-size: 11px; color: #888; margin-top: 4px; letter-spacing: 2px;">AUTHORIZED HAROGIC DISTRIBUTION PARTNER</div>
        </div>
        
        <h3 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-top: 30px;">Inquiry Received</h3>
        <p style="color: #aaa; font-size: 15px; line-height: 1.6; max-width: 480px; margin: 15px auto 30px;">
          Dear ${sName},<br><br>
          Thank you for reaching out to PN Technologies. We have successfully received your request and our RF specialists are reviewing it. You can expect a professional response with specifications or a quote in 1-2 business days.
        </p>
        
        <div style="background-color: #121212; padding: 20px; border-radius: 8px; text-align: left; border: 1px solid #222; margin-bottom: 30px;">
          <div style="color: #ff6600; font-size: 13px; font-weight: 600; letter-spacing: 1px; margin-bottom: 12px;">SUBMISSION BRIEF</div>
          <div style="margin-bottom: 8px; font-size: 14px;"><strong style="color: #888;">Request Type:</strong> <span style="color: #eee;">${sRequestType || "General Inquiry"}</span></div>
          <div style="margin-bottom: 8px; font-size: 14px;"><strong style="color: #888;">Company:</strong> <span style="color: #eee;">${sCompany || "N/A"}</span></div>
          <div style="font-size: 14px; color: #888;"><strong style="color: #888;">Message:</strong><p style="color: #aaa; margin: 4px 0 0 0; line-height: 1.4; white-space: pre-wrap;">${sMessage || "N/A"}</p></div>
        </div>

        <p style="color: #666; font-size: 13px; margin-top: 30px;">
          If you have immediate questions, feel free to reply directly to this email or reach us at <a href="mailto:${targetEmail}" style="color: #ff6600; text-decoration: none;">${targetEmail}</a>.
        </p>
        
        <hr style="border: 0; border-top: 1px solid #222; margin: 30px 0;">
        
        <div style="font-size: 12px; color: #555;">
          &copy; 2026 PN Technologies. Ahmedabad & Bhopal, India. All rights reserved.
        </div>
      </div>
    `;

    // 3. Send Email using either SMTP or Resend API
    const useResend = !!process.env.RESEND_API_KEY;
    const useSMTP = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    );

    if (useResend) {
      // Send using Resend REST API
      const resendApiKey = process.env.RESEND_API_KEY;

      // Send notification to Company
      const companyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `${senderName} <${senderDomainEmail}>`,
          to: targetEmail,
          reply_to: email,
          subject: _subject || "New Website Inquiry",
          html: companyMailHtml,
        }),
      });

      if (!companyRes.ok) {
        const errText = await companyRes.text();
        throw new Error(`Resend notification dispatch failed: ${errText}`);
      }

      // Send confirmation to Customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `${senderName} <${senderDomainEmail}>`,
          to: email,
          subject: "We have received your inquiry - PN Technologies",
          html: customerMailHtml,
        }),
      });

      return res.status(200).json({
        success: true,
        message: "Emails sent successfully via Resend API",
      });
    } else if (useSMTP) {
      // Send using SMTP (Zoho Mail, Google Workspace, Hostinger, etc.)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_SECURE !== "false", // Default to SSL/TLS (port 465)
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send notification to Company
      await transporter.sendMail({
        from: `"${senderName}" <${senderDomainEmail}>`,
        to: targetEmail,
        replyTo: email,
        subject: _subject || "New Website Inquiry",
        html: companyMailHtml,
      });

      // Send confirmation to Customer
      await transporter.sendMail({
        from: `"${senderName}" <${senderDomainEmail}>`,
        to: email,
        subject: "We have received your inquiry - PN Technologies",
        html: customerMailHtml,
      });

      return res
        .status(200)
        .json({ success: true, message: "Emails sent successfully via SMTP" });
    } else {
      // Fallback: Environment variables not configured
      console.warn(
        "Email dispatcher environment variables are not configured on Vercel.",
      );
      return res.status(501).json({
        success: false,
        error:
          "Email service not configured. Please configure RESEND_API_KEY or SMTP variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) on Vercel Dashboard.",
      });
    }
  } catch (error) {
    console.error("Email dispatcher error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
