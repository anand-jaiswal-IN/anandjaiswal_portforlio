"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiCode,
  HiColorSwatch,
  HiDatabase,
  HiServer,
  HiGlobeAlt,
  HiLightningBolt,
  HiArrowRight,
  HiChip,
} from "react-icons/hi"
import { FaTools } from "react-icons/fa"
import { FloatingCard } from "@/components/ui/floating-card"
import { GradientText } from "@/components/ui/gradient-text"

const skills = [
  {
    icon: HiCode,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS",
    color: "text-blue-500",
    delay: 0,
  },
  {
    icon: HiServer,
    title: "Backend Development",
    description: "Node.js - Express, Python - Django, FastAPI",
    color: "text-red-500",
    delay: 0.1,
  },
  {
    icon: HiDatabase,
    title: "Database & ORM/ODM",
    description: "Postgresql, MySQL, SQLite, MongoDB, Prisma, SQLAlchemy, Drizzle, Mongoose, Redis",
    color: "text-green-500",
    delay: 0.2,
  },
  {
    icon: HiColorSwatch,
    title: "UI/UX Design",
    description: "Figma, Photoshop, Adobe XD, Design Systems",
    color: "text-pink-500",
    delay: 0.3,
  },
  {
    icon: HiGlobeAlt,
    title: "Web Technologies",
    description: "GraphQL, REST APIs, WebSockets",
    color: "text-orange-500",
    delay: 0.4,
  },
  {
    icon: HiLightningBolt,
    title: "Performance",
    description: "Optimization, SEO, Accessibility",
    color: "text-yellow-500",
    delay: 0.5,
  },
  {
    icon: FaTools,
    title: "Tools & DevOps",
    description: "Docker, CI/CD, Git, Linux, Methodologies, AWS(Basic), Vercel, Netlify",
    color: "text-indigo-500",
    delay: 0.6,
  },
  {
    icon: HiChip,
    title: "AI & Machine Learning",
    description: "Prompt Engineering, Language Models, LangChain",
    color: "text-teal-500",
    delay: 0.7,
  },
]

export function SkillsPreview() {
  return (
    <section className="py-20 px-4 bg-background-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <GradientText gradient="primary">Skills & Expertise</GradientText>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and beautiful digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <FloatingCard
              key={skill.title}
              delay={skill.delay}
              intensity="low"
              style="glass"
              className="group hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
              >
                <skill.icon className={`w-6 h-6 ${skill.color}`} />
              </motion.div>

              <h3 className="text-xl font-semibold mb-2 text-foreground-primary">{skill.title}</h3>

              <p className="text-foreground-muted text-sm leading-relaxed">{skill.description}</p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </FloatingCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/about#skills">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group cursor-pointer"
            >
              View All Skills
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
