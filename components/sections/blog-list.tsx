"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { BlogCard } from "@/components/ui/blog-card"
import { ProjectFilter } from "@/components/ui/project-filter"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"
import { BlogPostMeta } from "@/lib/blog"

type BlogListSectionProps = {
  posts: BlogPostMeta[]
}

function getCategories(posts: BlogPostMeta[]): string[] {
  const uniqueTags = new Set<string>()

  posts.forEach(post => {
    post.tags.forEach(tag => uniqueTags.add(tag))
  })

  return ["All", ...Array.from(uniqueTags).sort((a, b) => a.localeCompare(b))]
}

export function BlogListSection({ posts }: BlogListSectionProps) {
  const categories = useMemo(() => getCategories(posts), [posts])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts =
    activeCategory === "All" ? posts : posts.filter(post => post.tags.includes(activeCategory))

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">Blog & Insights</GradientText>
          </h1>

          <AnimatedText
            text="Stories, tutorials, and practical engineering notes from my full-stack journey."
            className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed"
            delay={0.3}
          />
        </motion.div>

        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} {...post} delay={index * 0.1} featured={post.featured} />
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-xl text-foreground-muted">No blog posts found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
