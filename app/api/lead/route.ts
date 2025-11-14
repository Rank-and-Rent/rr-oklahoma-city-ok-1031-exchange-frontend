import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Verify Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn("TURNSTILE_SECRET_KEY not set, skipping verification");
    return true;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

// Send email via SendGrid
async function sendEmailViaSendGrid(formData: any) {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_TO_EMAIL) {
    console.warn("SendGrid not configured, skipping email");
    return;
  }

  const msg = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@1031exchangeoklahomacity.com",
    subject: `New 1031 Exchange Lead: ${formData.name}`,
    text: `
New Lead Form Submission

Name: ${formData.name}
Company: ${formData.company || "N/A"}
Email: ${formData.email}
Phone: ${formData.phone}
Project Type: ${formData.projectType}
Timeline: ${formData.timeline || "N/A"}
Details: ${formData.details || "N/A"}
    `.trim(),
    html: `
      <h2>New 1031 Exchange Lead</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company || "N/A"}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Project Type:</strong> ${formData.projectType}</p>
      <p><strong>Timeline:</strong> ${formData.timeline || "N/A"}</p>
      <p><strong>Details:</strong> ${formData.details || "N/A"}</p>
    `.trim(),
  };

  await sgMail.send(msg);
}

// Send to Zapier webhook
async function sendToZapier(formData: any) {
  if (!process.env.ZAPIER_WEBHOOK_URL) {
    console.warn("Zapier webhook not configured, skipping");
    return;
  }

  try {
    await fetch(process.env.ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Zapier webhook error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { turnstileToken, ...formData } = body;

    // Verify Turnstile token
    if (turnstileToken) {
      const isValid = await verifyTurnstileToken(turnstileToken);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid security verification" }, { status: 400 });
      }
    }

    // Send email via SendGrid
    await sendEmailViaSendGrid(formData);

    // Send to Zapier webhook
    await sendToZapier(formData);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

