import { getAllPosts, getFeaturedPosts, getAllTags } from "@/lib/blog"
import { BlogCard } from "@/components/ui/blog-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Thoughts, tutorials, and insights about web development, technology trends, and my journey as a developer.",
}

export default async function BlogPage() {
  const [allPosts, featuredPosts, allTags] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllTags(),
  ])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">Blog & Insights</GradientText>
          </h1>

          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights about web development, technology trends, and my
            journey as a developer
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <GradientText gradient="secondary">Featured Posts</GradientText>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post.slug} {...post} featured={true} delay={index * 0.1} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
              <GradientText gradient="rainbow">All Posts</GradientText>
            </h2>

            {/* Tags Filter - Simple version for now */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-foreground-muted">Topics:</span>
                {allTags.slice(0, 5).map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {allTags.length > 5 && (
                  <span className="px-3 py-1 text-xs font-medium bg-foreground-muted/10 text-foreground-muted rounded-full">
                    +{allTags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>

          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post, index) => (
                <BlogCard key={post.slug} {...post} delay={index * 0.1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-foreground-primary mb-4">No Blog Posts Yet</h3>
              <p className="text-foreground-muted max-w-md mx-auto">
                I'm working on some amazing content! Check back soon for insights about web
                development, technology trends, and my coding journey.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <GradientText gradient="primary">Stay Updated</GradientText>
          </h3>
          <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
            Subscribe to get notified when I publish new articles about web development, technology
            insights, and coding tutorials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
