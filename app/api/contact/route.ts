import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload

    const name = body.name?.trim()
    const email = body.email?.trim()
    const subject = body.subject?.trim()
    const message = body.message?.trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const portValue = process.env.SMTP_PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !portValue || !user || !pass) {
      return NextResponse.json(
        { message: "Email service is not configured on the server." },
        { status: 500 },
      )
    }

    const port = Number(portValue)
    if (!Number.isFinite(port)) {
      return NextResponse.json({ message: "Invalid SMTP configuration." }, { status: 500 })
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "anandjaiswalprofessional@gmail.com"
    const fromEmail = process.env.CONTACT_FROM_EMAIL || user
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    })

    await transporter.sendMail({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Portfolio Message: ${subject}`,
      text: [
        "New message received from your portfolio contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New message from portfolio contact form</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    return NextResponse.json({ message: "Message sent successfully." })
  } catch {
    return NextResponse.json(
      { message: "Unable to send message right now. Please try again later." },
      { status: 500 },
    )
  }
}
