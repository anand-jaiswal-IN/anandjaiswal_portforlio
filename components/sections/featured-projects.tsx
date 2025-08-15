"use client"

import { motion } from "framer-motion"
import { HiExternalLink, HiArrowRight } from "react-icons/hi"
import { FaGithub } from "react-icons/fa"
import { FloatingCard } from "@/components/ui/floating-card"
import { GradientText } from "@/components/ui/gradient-text"

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description: "A modern, full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com/anandjaiswal/ecommerce",
    live: "https://ecommerce-demo.anandjaiswal.dev",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, team collaboration, and advanced analytics.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/anandjaiswal/taskmanager",
    live: "https://tasks.anandjaiswal.dev",
    featured: true
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content creation platform with multiple templates, SEO optimization, and team collaboration.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "OpenAI", "Prisma", "Tailwind"],
    github: "https://github.com/anandjaiswal/ai-content",
    live: "https://content.anandjaiswal.dev",
    featured: true
  }
]

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-4 bg-background-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <GradientText gradient="primary">
              Featured Projects
            </GradientText>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise in modern web technologies and creative problem-solving
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <FloatingCard
                delay={index * 0.1}
                intensity="low"
                style="glass"
                className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/50">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <FaGithub className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <HiExternalLink className="w-5 h-5 text-white" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground-primary group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto group"
          >
            View All Projects
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
