"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ProjectFilter } from "@/components/ui/project-filter"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"

const projects = [
  {
    title: "Anonymous Messaging App",
    description:
      "A modern, full-stack anonymous messaging application that allows users to send and receive anonymous messages.",
    image: "/projects/anonymous_messaging_app.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "Tailwind CSS",
      "Mongoose",
      "Docker",
    ],
    github: "https://github.com/anand-jaiswal-IN/anonymous-message-app",
    live: "https://anonymous-message-app-lake.vercel.app/",
    date: "2025",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Restaurant Lookup",
    description:
      "Django project created for learning and exploration purposes. It focuses on restaurant management and allows you to model various aspects like cities, restaurants, food categories, dishes, and user ratings for both restaurants and dishes.",
    image: "/projects/restaurant_lookup.png",
    technologies: ["Django", "PostgreSQL", "Django ORM", "JavaScript", "Docker"],
    github: "https://github.com/anand-jaiswal-IN/restaurantlookup",
    live: "https://restaurantlookup.onrender.com/",
    date: "2025",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Fullstack Fastapi",
    description:
      "Full stack, modern web application template. Using FastAPI, React, SQLModel, PostgreSQL, Docker, GitHub Actions, automatic HTTPS and more.",
    image: "/projects/fullstack_fastapi.png",
    technologies: ["FastAPI", "SQLModel", "React", "Docker Compose"],
    github: "https://github.com/anand-jaiswal-IN/fullstack-fastapi",
    live: "https://github.com/anand-jaiswal-IN/fullstack-fastapi",
    date: "2025",
    category: "Full Stack",
    featured: true,
  },

  {
    title: "Todo App with Express and MongoDB",
    description:
      "Full stack, simple todo web application. Using Express.js, Node.js, MongoDB, and Mongoose. Can create user accounts, add, edit, and delete todo items. A great project for learning the basics of backend development with Express and MongoDB.",
    image: "/projects/todo_app_express_mongodb.png",
    technologies: ["Express.js", "Node.js", "MongoDB", "Mongoose"],
    github: "https://github.com/anand-jaiswal-IN/todo-express-app",
    live: "https://github.com/anand-jaiswal-IN/todo-express-app",
    date: "2024",
    category: "Full Stack",
    featured: false,
  },

  {
    title: "Music Academy",
    description: "Music academy template website developed in Next.js and Acertinity UI.",
    image: "/projects/music_academy.png",
    technologies: ["Next.js", "Tailwind CSS", "Acertinity UI", "TypeScript"],
    github: "https://github.com/anand-jaiswal-IN/music-academy",
    live: "https://github.com/anand-jaiswal-IN/music-academy",
    date: "2025",
    category: "Frontend",
    featured: false,
  },

  {
    title: "Booking Dot Com Clone",
    description:
      "A clone of the popular travel booking website Booking.com, built using Next.js and Tailwind CSS. It features a responsive design and allows users to search for hotels, view details, and make bookings.",
    image: "/projects/booking_dot_com_website.png",
    technologies: ["Vite", "React", "Tailwind CSS", "Javascript"],
    github: "https://github.com/anand-jaiswal-IN/booking.com-website",
    live: "https://github.com/anand-jaiswal-IN/booking.com-website",
    date: "2024",
    category: "Frontend",
    featured: false,
  },

  {
    title: "User Service API",
    description:
      "A RESTful API built with FastAPI that provides user management functionalities, including user registration, authentication, management with Google OAuth, email services, and profile management. It uses SQLModel for database interactions and JWT for secure authentication.",
    image: "/projects/user_service_api.png",
    technologies: ["FastAPI", "SQLModel", "Docker"],
    github: "https://github.com/anand-jaiswal-IN/user_service",
    live: "https://github.com/anand-jaiswal-IN/user_service",
    date: "2025",
    category: "Backend",
    featured: false,
  },

  {
    title: "User Registration System",
    description:
      "This is an Express.js Node.js server implementing a User Registration System with MongoDB as the database service and Mongoose as the ODM (Object Data Mapper). The system provides endpoints for user registration, login, and profile management. It includes features such as password hashing for security, JWT (JSON Web Token) for authentication, and input validation to ensure data integrity.",
    image: "/projects/user_registration_system.png",
    technologies: ["Express.js", "Node.js", "MongoDB", "Mongoose", "Nodemailer", "JWT"],
    github: "https://github.com/anand-jaiswal-IN/user-registration-api",
    live: "https://github.com/anand-jaiswal-IN/user-registration-api",
    date: "2025",
    category: "Backend",
    featured: false,
  },
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "AI Engineering/ML"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
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
            <GradientText gradient="primary">My Projects</GradientText>
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-foreground-muted">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        ></motion.div>
      </div>
    </div>
  )
}
