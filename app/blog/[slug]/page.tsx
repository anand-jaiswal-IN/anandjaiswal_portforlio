import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { HiCalendar, HiClock, HiUser, HiTag } from "react-icons/hi"
import { GradientText } from "@/components/ui/gradient-text"
import { formatDate } from "@/lib/utils"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog"

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <GradientText gradient="primary">{post.title}</GradientText>
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted mb-8">
            <div className="flex items-center gap-2">
              <HiCalendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <HiUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {post.image ? (
            <div className="relative h-[250px] sm:h-[360px] w-full rounded-2xl overflow-hidden border border-border">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}
        </header>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 flex items-center gap-1"
              >
                <HiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <section
          className="text-foreground-primary leading-8 text-[1.05rem] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_a]:text-primary [&_a]:underline [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-foreground-muted/20 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:bg-black/80 [&_pre]:text-white [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  )
}
