import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (resendClient) return resendClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "Missing Resend API key. Set RESEND_API_KEY in your environment (server-side only)."
    );
  }
  resendClient = new Resend(key);
  return resendClient;
}

export interface QuotationEmailData {
  clientEmail: string;
  clientName: string;
  quotationNumber: string;
  quotationLink: string;
  totalAmount: number;
  validUntil?: Date;
}

export async function sendQuotationEmail(data: QuotationEmailData) {
  try {
    const { data: emailData, error } = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "KPT Crane & Machinery <noreply@kptcrane.com>",
      to: data.clientEmail,
      subject: `Quotation #${data.quotationNumber} - KPT Crane & Machinery`,
      html: generateQuotationEmailHTML(data),
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    return emailData;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company_name?: string | null
  message: string
}

export async function sendContactNotification(data: ContactFormData) {
  try {
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company_name || "-")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `

    const { data: emailData, error } = await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "KPT Crane & Machinery <noreply@kptcrane.com>",
      to: process.env.CONTACT_NOTIFICATION_EMAIL || "contact@orionatech.in",
      subject: `New Contact Submission from ${data.name}`,
      html,
    })

    if (error) {
      console.error("Resend error (contact):", error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error("Failed to send contact notification:", error)
    throw error
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function generateQuotationEmailHTML(data: QuotationEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quotation #${data.quotationNumber}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">KPT Crane & Machinery</h1>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; margin-top: 20px;">
          <h2 style="color: #0f172a; margin-top: 0;">Dear ${data.clientName},</h2>
          
          <p>Thank you for your interest in our industrial solutions. We are pleased to provide you with the following quotation:</p>
          
          <div style="background-color: white; border: 1px solid #ddd; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Quotation Number:</strong> #${data.quotationNumber}</p>
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${data.totalAmount.toLocaleString("en-IN")}</p>
            ${data.validUntil ? `<p style="margin: 5px 0;"><strong>Valid Until:</strong> ${data.validUntil.toLocaleDateString()}</p>` : ""}
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.quotationLink}" 
               style="background-color: #0f172a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block;">
              View Complete Quotation
            </a>
          </div>
          
          <p style="margin-top: 30px;">This is a secure link that provides access to your detailed quotation. Please review it at your convenience.</p>
          
          <p>If you have any questions or need clarification, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>KPT Crane & Machinery</strong><br>
            Industrial Solutions Provider
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
      </body>
    </html>
  `;
}


