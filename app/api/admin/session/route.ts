import { NextRequest, NextResponse } from "next/server"

const ADMIN_SESSION_COOKIE = "blog_admin_session"

type AuthPayload = {
  adminKey?: string
}

function getConfiguredAdminKey(): string {
  return process.env.BLOG_ADMIN_KEY?.trim() ?? ""
}

function isSessionValid(req: NextRequest): boolean {
  const configured = getConfiguredAdminKey()
  if (!configured) {
    return false
  }

  const cookieValue = req.cookies.get(ADMIN_SESSION_COOKIE)?.value?.trim()
  return cookieValue === configured
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ authenticated: isSessionValid(req) })
}

export async function POST(req: NextRequest) {
  const configured = getConfiguredAdminKey()

  if (!configured) {
    return NextResponse.json(
      { message: "BLOG_ADMIN_KEY is missing in server environment." },
      { status: 500 },
    )
  }

  const body = (await req.json().catch(() => ({}))) as AuthPayload
  const provided = body.adminKey?.trim() ?? ""

  if (!provided || provided !== configured) {
    return NextResponse.json({ message: "Invalid admin key." }, { status: 401 })
  }

  const response = NextResponse.json({ authenticated: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, configured, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false })
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  return response
}
