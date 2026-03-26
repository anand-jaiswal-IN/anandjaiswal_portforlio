import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkHtml from "remark-html"
import { slugify } from "@/lib/utils"

export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: number
  tags: string[]
  image?: string
  featured?: boolean
}

export type BlogPost = BlogPostMeta & {
  content: string
  contentHtml: string
}

type CreateBlogPostInput = {
  title: string
  excerpt: string
  author: string
  tags: string[]
  image?: string
  content: string
  featured?: boolean
}

const BLOG_POSTS_DIR = path.join(process.cwd(), "content", "blog")

type BlogFrontmatter = {
  title?: string
  excerpt?: string
  author?: string
  date?: string
  readTime?: number
  tags?: string[]
  image?: string
  featured?: boolean
}

async function ensureBlogPostsDir(): Promise<void> {
  await fs.mkdir(BLOG_POSTS_DIR, { recursive: true })
}

function sanitizeInput(input: CreateBlogPostInput): CreateBlogPostInput {
  return {
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    author: input.author.trim(),
    tags: input.tags.map(tag => tag.trim()).filter(Boolean),
    image: input.image?.trim() || undefined,
    content: input.content.trim(),
    featured: Boolean(input.featured),
  }
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags.map(tag => String(tag).trim()).filter(Boolean)
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content)
  return result.toString()
}

async function readPostFromFile(fileName: string): Promise<BlogPost> {
  const slug = fileName.replace(/\.md$/, "")
  const fullPath = path.join(BLOG_POSTS_DIR, fileName)
  const source = await fs.readFile(fullPath, "utf-8")
  const parsed = matter(source)
  const frontmatter = parsed.data as BlogFrontmatter

  const title = frontmatter.title?.trim() || slug
  const content = parsed.content.trim()
  const excerpt =
    frontmatter.excerpt?.trim() ||
    content.split(/\n\s*\n/)[0]?.replace(/[#>*`\-]/g, "").trim() ||
    title
  const author = frontmatter.author?.trim() || "Admin"
  const date = frontmatter.date || new Date((await fs.stat(fullPath)).mtime).toISOString()
  const readTime =
    typeof frontmatter.readTime === "number" ? frontmatter.readTime : estimateReadTime(content)
  const tags = normalizeTags(frontmatter.tags)
  const image = frontmatter.image?.trim() || undefined
  const featured = Boolean(frontmatter.featured)
  const contentHtml = await markdownToHtml(content)

  return {
    slug,
    title,
    excerpt,
    author,
    date,
    readTime,
    tags,
    image,
    featured,
    content,
    contentHtml,
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await ensureBlogPostsDir()
  const fileNames = await fs.readdir(BLOG_POSTS_DIR)
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith(".md"))

  const posts = await Promise.all(markdownFiles.map(readPostFromFile))
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getAllBlogPostMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts()
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    image: post.image,
    featured: post.featured,
  }))
}

export async function getFeaturedBlogPostMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPostMeta()
  return posts.filter(post => post.featured)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts()
  return posts.find(post => post.slug === slug) ?? null
}

export async function createBlogPost(input: CreateBlogPostInput): Promise<BlogPost> {
  const cleaned = sanitizeInput(input)

  if (!cleaned.title || !cleaned.excerpt || !cleaned.author || !cleaned.content) {
    throw new Error("Missing required blog fields.")
  }

  await ensureBlogPostsDir()
  const baseSlug = slugify(cleaned.title)

  if (!baseSlug) {
    throw new Error("Unable to generate slug from title.")
  }

  let slug = baseSlug
  let suffix = 1

  while (true) {
    try {
      await fs.access(path.join(BLOG_POSTS_DIR, `${slug}.md`))
      slug = `${baseSlug}-${suffix}`
      suffix += 1
    } catch {
      break
    }
  }

  const date = new Date().toISOString()
  const readTime = estimateReadTime(cleaned.content)

  const markdownWithFrontmatter = matter.stringify(cleaned.content, {
    title: cleaned.title,
    excerpt: cleaned.excerpt,
    author: cleaned.author,
    date,
    readTime,
    tags: cleaned.tags,
    image: cleaned.image,
    featured: cleaned.featured,
  })

  await fs.writeFile(path.join(BLOG_POSTS_DIR, `${slug}.md`), markdownWithFrontmatter, "utf-8")

  const contentHtml = await markdownToHtml(cleaned.content)

  const newPost: BlogPost = {
    slug,
    title: cleaned.title,
    excerpt: cleaned.excerpt,
    author: cleaned.author,
    date,
    readTime,
    tags: cleaned.tags,
    image: cleaned.image,
    featured: cleaned.featured,
    content: cleaned.content,
    contentHtml,
  }

  return newPost
}
