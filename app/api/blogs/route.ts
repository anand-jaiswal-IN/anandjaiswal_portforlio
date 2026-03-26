import { NextRequest, NextResponse } from "next/server"
import { createBlogPost, getAllBlogPostMeta } from "@/lib/blog"

const ADMIN_SESSION_COOKIE = "blog_admin_session"

type CreateBlogPayload = {
  title?: string
  excerpt?: string
  author?: string
  tags?: string[] | string
  image?: string
  content?: string
  featured?: boolean
}

function parseTags(tags: CreateBlogPayload["tags"]): string[] {
  if (!tags) {
    return []
  }

  if (Array.isArray(tags)) {
    return tags
  }

  return tags
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean)
}

function isAuthorized(req: NextRequest): boolean {
  const configuredKey = process.env.BLOG_ADMIN_KEY?.trim()

  if (!configuredKey) {
    return false
  }

  const requestKey = req.headers.get("x-admin-key")?.trim()
  const sessionKey = req.cookies.get(ADMIN_SESSION_COOKIE)?.value?.trim()

  return requestKey === configuredKey || sessionKey === configuredKey
}

export async function GET() {
  try {
    const posts = await getAllBlogPostMeta()
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ message: "Unable to fetch blog posts." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.BLOG_ADMIN_KEY?.trim()) {
      return NextResponse.json(
        { message: "BLOG_ADMIN_KEY is missing in server environment." },
        { status: 500 },
      )
    }

    if (!isAuthorized(req)) {
      return NextResponse.json({ message: "Invalid admin key." }, { status: 401 })
    }

    const payload = (await req.json()) as CreateBlogPayload

    const post = await createBlogPost({
      title: payload.title ?? "",
      excerpt: payload.excerpt ?? "",
      author: payload.author ?? "",
      tags: parseTags(payload.tags),
      image: payload.image,
      content: payload.content ?? "",
      featured: payload.featured,
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create blog post."
    return NextResponse.json({ message }, { status: 400 })
  }
}
