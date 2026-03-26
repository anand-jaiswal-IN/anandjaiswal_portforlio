import { NextResponse } from "next/server"
import { getBlogPostBySlug } from "@/lib/blog"

interface Context {
  params: Promise<{ slug: string }>
}

export async function GET(_: Request, context: Context) {
  try {
    const { slug } = await context.params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Blog post not found." }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch {
    return NextResponse.json({ message: "Unable to fetch blog post." }, { status: 500 })
  }
}
