import { Metadata } from "next"
import { getAllBlogPostMeta } from "@/lib/blog"
import { BlogListSection } from "../../components/sections/blog-list"

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Thoughts, tutorials, and insights about web development, technology trends, and my journey as a developer.",
}

export default async function BlogPage() {
  const posts = await getAllBlogPostMeta()

  return <BlogListSection posts={posts} />
}
