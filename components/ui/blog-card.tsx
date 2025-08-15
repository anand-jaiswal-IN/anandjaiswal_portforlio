"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiCalendar, HiClock, HiUser, HiTag, HiArrowRight } from "react-icons/hi"
import { FloatingCard } from "./floating-card"
import { formatDate } from "@/lib/utils"
import { BlogPostMeta } from "@/lib/blog"

interface BlogCardProps extends BlogPostMeta {
  delay?: number
  featured?: boolean
}

export function BlogCard({
  slug,
  title,
  date,
  excerpt,
  author,
  tags,
  readTime,
  featured = false,
  image,
  delay = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="group h-full"
    >
      <FloatingCard
        delay={delay}
        intensity="low"
        style="glass"
        className={`h-full overflow-hidden hover:shadow-2xl transition-all duration-500 ${
          featured ? "ring-2 ring-primary/20" : ""
        }`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Blog Image */}
        <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl font-bold text-primary/50">
                {title
                  .split(" ")
                  .slice(0, 2)
                  .map(word => word[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Overlay on hover */}
          <Link href={`/blog/${slug}`}>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <HiArrowRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </Link>
        </div>

        {/* Blog Info */}
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
            <div className="flex items-center gap-1">
              <HiCalendar className="w-3 h-3" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiClock className="w-3 h-3" />
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <HiUser className="w-3 h-3" />
              <span>{author}</span>
            </div>
          </div>

          <Link href={`/blog/${slug}`}>
            <h3 className="text-xl font-bold text-foreground-primary group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
              {title}
            </h3>
          </Link>

          <p className="text-foreground-muted text-sm leading-relaxed flex-1 line-clamp-3">
            {excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 flex items-center gap-1"
                >
                  <HiTag className="w-2 h-2" />
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium bg-foreground-muted/10 text-foreground-muted rounded-full">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read More Link */}
          <Link
            href={`/blog/${slug}`}
            className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium pt-2 group/link"
          >
            Read More
            <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </FloatingCard>
    </motion.div>
  )
}
