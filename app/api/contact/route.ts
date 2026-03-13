import { NextResponse } from "next/server";
import { contact } from "@/components/portfolioData";

const resendApiUrl = "https://api.resend.com/emails";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const sanitizeValue = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const resendToEmail = process.env.RESEND_TO_EMAIL ?? contact.email;

  if (!resendApiKey || !resendFromEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured on the server." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = sanitizeValue(payload.name);
  const email = sanitizeValue(payload.email);
  const company = sanitizeValue(payload.company);
  const subject = sanitizeValue(payload.subject);
  const message = sanitizeValue(payload.message);
  const website = sanitizeValue(payload.website);

  if (website) {
    return NextResponse.json({ message: "Message sent successfully." });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 80 || email.length > 120 || company.length > 120 || subject.length > 120 || message.length > 2000) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  const recruiterDetails = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    message,
  ].join("\n");

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const resendResponse = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: resendToEmail,
      reply_to: email,
      subject: `${subject || "Portfolio inquiry"} | Portfolio contact`,
      text: recruiterDetails,
      html: htmlMessage,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();

    return NextResponse.json(
      {
        error:
          errorBody || "Unable to send the message right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks for reaching out. Your message has been sent.",
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
