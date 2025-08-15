import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  readTime: number
  featured?: boolean
  image?: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  readTime: number
  featured?: boolean
  image?: string
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.filter(name => name.endsWith(".md")).map(name => name.replace(/\.md$/, ""))
  } catch (error) {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Process markdown content to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.substring(0, 160) + "...",
      content: contentHtml,
      author: data.author || "Anand Jaiswal",
      tags: data.tags || [],
      readTime: calculateReadTime(content),
      featured: data.featured || false,
      image: data.image || null,
    }
  } catch (error) {
    return null
  }
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(async slug => {
      const post = await getPostBySlug(slug)
      if (!post) {
        return null
      }

      // Return only metadata for listing
      const { content, ...meta } = post
      return meta
    })
  )

  return posts
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.featured)
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  try {
    const slugs = getAllPostSlugs()
    const allTags = new Set<string>()

    slugs.forEach(slug => {
      try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(fileContents)

        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach((tag: string) => allTags.add(tag))
        }
      } catch (error) {
        // Skip files that can't be read
      }
    })

    return Array.from(allTags).sort()
  } catch (error) {
    return []
  }
}
