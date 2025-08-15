"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ProjectFilter } from "@/components/ui/project-filter"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern, full-stack e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard.",
    longDescription: "Built with Next.js and TypeScript, this platform features advanced product management, secure payment processing with Stripe, real-time inventory tracking, and a powerful admin dashboard. The application includes user authentication, order management, and detailed analytics.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
    github: "https://github.com/anandjaiswal/ecommerce",
    live: "https://ecommerce-demo.anandjaiswal.dev",
    date: "2024",
    category: "Full Stack",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, team collaboration, and advanced analytics.",
    longDescription: "A comprehensive project management solution featuring real-time collaboration, task assignment, progress tracking, and team analytics. Built with modern web technologies for optimal performance and user experience.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
    github: "https://github.com/anandjaiswal/taskmanager",
    live: "https://tasks.anandjaiswal.dev",
    date: "2024",
    category: "Full Stack",
    featured: true
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content creation platform with multiple templates, SEO optimization, and team collaboration features.",
    longDescription: "Leveraging OpenAI's GPT models, this platform helps users generate high-quality content for various purposes. Features include template management, SEO optimization, content scheduling, and team collaboration tools.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "Tailwind CSS", "Vercel AI SDK"],
    github: "https://github.com/anandjaiswal/ai-content",
    live: "https://content.anandjaiswal.dev",
    date: "2024",
    category: "AI/ML",
    featured: true
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather application with detailed forecasts, interactive maps, and location-based services.",
    technologies: ["React", "Weather API", "Chart.js", "Geolocation API"],
    github: "https://github.com/anandjaiswal/weather-app",
    live: "https://weather.anandjaiswal.dev",
    date: "2023",
    category: "Frontend"
  },
  {
    title: "Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking with advanced analytics and price alerts.",
    technologies: ["Vue.js", "CoinGecko API", "Chart.js", "Firebase"],
    github: "https://github.com/anandjaiswal/crypto-tracker",
    live: "https://crypto.anandjaiswal.dev",
    date: "2023",
    category: "Frontend"
  },
  {
    title: "Blog CMS",
    description: "Headless content management system for blogs with markdown support and SEO optimization.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
    github: "https://github.com/anandjaiswal/blog-cms",
    date: "2023",
    category: "Backend"
  },
  {
    title: "Chat Application",
    description: "Real-time messaging application with group chats, file sharing, and emoji support.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "https://github.com/anandjaiswal/chat-app",
    live: "https://chat.anandjaiswal.dev",
    date: "2023",
    category: "Full Stack"
  },
  {
    title: "Recipe Finder",
    description: "Mobile-first recipe discovery app with ingredient-based search and meal planning.",
    technologies: ["React Native", "Expo", "Recipe API", "AsyncStorage"],
    github: "https://github.com/anandjaiswal/recipe-finder",
    date: "2023",
    category: "Mobile"
  },
  {
    title: "Expense Tracker",
    description: "Personal finance management app with budget tracking, expense categorization, and financial insights.",
    technologies: ["Flutter", "Firebase", "Chart.js", "SQLite"],
    github: "https://github.com/anandjaiswal/expense-tracker",
    date: "2023",
    category: "Mobile"
  }
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile", "AI/ML"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">
              My Projects
            </GradientText>
          </h1>
          
          <AnimatedText
            text="A collection of projects showcasing my skills in modern web development, from concept to deployment"
            className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed"
            delay={0.3}
          />
        </motion.div>

        {/* Filter */}
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-foreground-muted">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Total Projects", value: projects.length },
            { label: "Technologies Used", value: "20+" },
            { label: "Years Experience", value: "3+" },
            { label: "Happy Clients", value: "15+" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-foreground-muted text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
