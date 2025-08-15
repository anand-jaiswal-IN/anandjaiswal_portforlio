"use client"

import { motion } from "framer-motion"
import { HiExternalLink, HiCalendar, HiTag } from "react-icons/hi"
import { FaGithub } from "react-icons/fa"
import { FloatingCard } from "./floating-card"

interface ProjectCardProps {
  title: string
  description: string
  longDescription?: string
  image?: string
  technologies: string[]
  github?: string
  live?: string
  date: string
  category: string
  featured?: boolean
  delay?: number
}

export function ProjectCard({
  title,
  description,
  longDescription,
  image,
  technologies,
  github,
  live,
  date,
  category,
  featured = false,
  delay = 0,
}: ProjectCardProps) {
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

        {/* Project Image */}
        <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl font-bold text-primary/50">
                {title
                  .split(" ")
                  .map(word => word[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                title="View Source Code"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </motion.a>
            )}
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                title="View Live Demo"
              >
                <HiExternalLink className="w-5 h-5 text-white" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Category and Date */}
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <div className="flex items-center gap-1">
              <HiTag className="w-3 h-3" />
              <span>{category}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiCalendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground-primary group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-foreground-muted text-sm leading-relaxed flex-1">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                Code
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <HiExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </FloatingCard>
    </motion.div>
  )
}
