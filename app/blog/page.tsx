import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Thoughts, tutorials, and insights about web development, technology trends, and my journey as a developer.",
}

export default async function BlogPage(){
  return (
    <>
    <p>Blog Posts</p>
    </>
  )
}
