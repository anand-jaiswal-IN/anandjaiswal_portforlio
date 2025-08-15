"use client"

import { motion } from "framer-motion"
import {
  HiCode,
  HiDatabase,
  HiDeviceMobile,
  HiColorSwatch,
  HiGlobeAlt,
  HiLightningBolt,
  HiShieldCheck,
} from "react-icons/hi"
import {
  FaBrain,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaFigma,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaSwift,
  FaAndroid,
} from "react-icons/fa"
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiPrisma,
  SiVercel,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiGithubactions,
  SiEslint,
  SiPrettier,
  SiWebpack,
  SiVite,
  SiFramer,
  SiDjango,
  SiFastapi,
  SiSocketdotio,
  SiMysql,
  SiSqlite,
  SiSupabase,
  SiDart,
  SiKotlin,
  SiHuggingface,
} from "react-icons/si"
import { SkillBar } from "@/components/ui/skill-bar"
import { FloatingCard } from "@/components/ui/floating-card"
import { GradientText } from "@/components/ui/gradient-text"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: HiCode,
    color: "text-blue-500",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 80 },
      { name: "SASS/SCSS", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: HiDatabase,
    color: "text-green-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    title: "Mobile Development",
    icon: HiDeviceMobile,
    color: "text-purple-500",
    skills: [
      { name: "React Native", level: 85 },
      { name: "Flutter", level: 75 },
      { name: "iOS Development", level: 70 },
      { name: "Android Development", level: 72 },
      { name: "Expo", level: 88 },
    ],
  },
  {
    title: "UI/UX Design",
    icon: HiColorSwatch,
    color: "text-pink-500",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Adobe XD", level: 85 },
      { name: "Design Systems", level: 88 },
      { name: "Prototyping", level: 85 },
      { name: "User Research", level: 75 },
    ],
  },
]

// TODO: This will be fetched from backend API
// Example API structure: GET /api/technologies
const technologyCategories = [
  {
    title: "Frontend",
    icon: HiCode,
    color: "text-blue-500",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vue.js", icon: FaVuejs },
      { name: "JavaScript", icon: FaJs },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "SASS", icon: FaSass },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    title: "Backend",
    icon: HiDatabase,
    color: "text-green-500",
    technologies: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Python", icon: FaPython },
      { name: "Express", icon: SiExpress },
      { name: "GraphQL", icon: SiGraphql },
      { name: "Django", icon: SiDjango },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "REST APIs", icon: HiGlobeAlt },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: HiLightningBolt,
    color: "text-purple-500",
    technologies: [
      { name: "Docker", icon: FaDocker },
      { name: "AWS", icon: FaAws },
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Vercel", icon: SiVercel },
      { name: "Webpack", icon: SiWebpack },
      { name: "Vite", icon: SiVite },
      { name: "ESLint", icon: SiEslint },
      { name: "Prettier", icon: SiPrettier },
      { name: "Figma", icon: FaFigma },
    ],
  },
  {
    title: "Databases",
    icon: HiDatabase,
    color: "text-red-500",
    technologies: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
      { name: "Prisma", icon: SiPrisma },
      { name: "MySQL", icon: SiMysql },
      { name: "SQLite", icon: SiSqlite },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    title: "AI/ML",
    icon: FaBrain,
    color: "text-pink-500",
    technologies: [
      { name: "OpenAI API", icon: SiOpenai },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "LangChain", icon: HiLightningBolt },
      { name: "Vector DBs", icon: HiDatabase },
      { name: "RAG", icon: FaBrain },
      { name: "Prompt Engineering", icon: HiCode },
    ],
  },
  {
    title: "Mobile",
    icon: HiDeviceMobile,
    color: "text-orange-500",
    technologies: [
      { name: "React Native", icon: FaReact },
      { name: "Flutter", icon: SiDart },
      { name: "Swift", icon: FaSwift },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Android", icon: FaAndroid },
      { name: "iOS", icon: FaSwift },
    ],
  },
]

const domains = [
  {
    title: "Web Development",
    icon: HiGlobeAlt,
    description: "Full-stack web applications with modern frameworks and best practices",
    color: "text-blue-500",
  },
  {
    title: "Mobile Apps",
    icon: HiDeviceMobile,
    description: "Cross-platform mobile applications for iOS and Android",
    color: "text-purple-500",
  },
  {
    title: "AI/ML Integration",
    icon: FaBrain,
    description: "Integrating AI models and machine learning capabilities",
    color: "text-orange-500",
  },
  {
    title: "Performance Optimization",
    icon: HiLightningBolt,
    description: "Optimizing applications for speed, SEO, and user experience",
    color: "text-yellow-500",
  },
  {
    title: "Security",
    icon: HiShieldCheck,
    description: "Implementing secure authentication and data protection",
    color: "text-red-500",
  },
  {
    title: "UI/UX Design",
    icon: HiColorSwatch,
    description: "Creating beautiful and intuitive user interfaces",
    color: "text-pink-500",
  },
]

export function SkillsDetailed() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">Skills & Expertise</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and domains of expertise
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <FloatingCard
              key={category.title}
              delay={index * 0.1}
              intensity="low"
              style="glass"
              className="h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground-primary">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.2 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </FloatingCard>
          ))}
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <GradientText gradient="secondary">Technologies I Work With</GradientText>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyCategories.map((category, categoryIndex) => (
              <FloatingCard
                key={category.title}
                delay={categoryIndex * 0.1}
                intensity="low"
                style="glass"
                className="h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-primary">
                    {category.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: categoryIndex * 0.1 + techIndex * 0.05,
                        duration: 0.3,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-3 py-2 bg-background-secondary/30 text-foreground-primary rounded-full hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-200 cursor-default border border-border/50 hover:border-primary/30"
                    >
                      <tech.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>

        {/* Domains */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <GradientText gradient="rainbow">Domains of Expertise</GradientText>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, index) => (
              <FloatingCard
                key={domain.title}
                delay={index * 0.1}
                intensity="low"
                style="glass"
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                >
                  <domain.icon className={`w-8 h-8 ${domain.color}`} />
                </div>

                <h4 className="text-lg font-semibold mb-2 text-foreground-primary">
                  {domain.title}
                </h4>

                <p className="text-foreground-muted text-sm leading-relaxed">
                  {domain.description}
                </p>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
