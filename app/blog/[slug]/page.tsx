import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { HiCalendar, HiClock, HiUser, HiTag, HiArrowLeft, HiShare } from "react-icons/hi"
import Link from "next/link"
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { GradientText } from "@/components/ui/gradient-text"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8 group"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Featured Image */}
          {post.image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <GradientText gradient="primary">
              {post.title}
            </GradientText>
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-foreground-muted mb-6">
            <div className="flex items-center gap-2">
              <HiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiCalendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20 flex items-center gap-1"
                >
                  <HiTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Button */}
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-foreground-primary/10 transition-colors">
            <HiShare className="w-4 h-4" />
            Share Article
          </button>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground-primary mb-2">
                About the Author
              </h3>
              <p className="text-foreground-muted">
                {post.author} is a full-stack developer passionate about creating 
                exceptional digital experiences and sharing knowledge with the community.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-colors">
                Follow
              </button>
              <button className="px-6 py-3 glass rounded-full font-semibold hover:bg-foreground-primary/10 transition-colors">
                More Posts
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
