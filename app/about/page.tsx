"use client"

import { motion } from "framer-motion"
import { HiDownload, HiMail, HiCode, HiUsers } from "react-icons/hi"
import { FaCoffee, FaTrophy } from "react-icons/fa"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"
import { Timeline } from "@/components/ui/timeline"
import { StatsCard } from "@/components/ui/stats-card"
import { SkillsDetailed } from "@/components/sections/skills-detailed"
import Image from "next/image"

const education = [
  {
    title: "Bachelor of Technology in Computer Science",
    organization: "Indian Institute of Technology (IIT)",
    location: "Delhi, India",
    period: "2019 - 2023",
    description:
      "Graduated with First Class Honors, specializing in Software Engineering and Data Structures. Completed coursework in Advanced Algorithms, Database Systems, Machine Learning, and Web Technologies.",
    achievements: [
      "Graduated with 8.5/10 CGPA",
      "Led the Web Development Club for 2 years",
      "Won 3 hackathons during college",
      "Published research paper on 'Optimizing React Performance'",
    ],
  },
  {
    title: "Higher Secondary Education",
    organization: "Delhi Public School",
    location: "Delhi, India",
    period: "2017 - 2019",
    description:
      "Completed 12th grade with focus on Mathematics, Physics, and Computer Science. Achieved 95% marks and was among the top 5% of students.",
    achievements: [
      "95% marks in 12th grade",
      "School topper in Computer Science",
      "Captain of the Programming Club",
    ],
  },
]

const experience = [
  {
    title: "Senior Full Stack Developer",
    organization: "TechCorp Solutions",
    location: "Remote",
    period: "2023 - Present",
    current: true,
    description:
      "Leading development of enterprise web applications using React, Next.js, and Node.js. Managing a team of 4 developers and collaborating with cross-functional teams to deliver high-quality software solutions.",
    achievements: [
      "Increased application performance by 40%",
      "Led migration to microservices architecture",
      "Mentored 3 junior developers",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
  },
  {
    title: "Full Stack Developer",
    organization: "StartupXYZ",
    location: "Bangalore, India",
    period: "2022 - 2023",
    description:
      "Developed and maintained multiple client projects using modern web technologies. Worked closely with designers and product managers to create user-friendly applications.",
    achievements: [
      "Built 5+ production applications",
      "Reduced loading times by 50%",
      "Implemented responsive designs for mobile-first approach",
      "Integrated third-party APIs and payment gateways",
    ],
  },
  {
    title: "Frontend Developer Intern",
    organization: "WebDev Agency",
    location: "Delhi, India",
    period: "2021 - 2022",
    description:
      "Gained hands-on experience in frontend development, working on various client projects and learning industry best practices.",
    achievements: [
      "Converted 10+ Figma designs to responsive websites",
      "Learned React, TypeScript, and modern CSS frameworks",
      "Collaborated with senior developers on code reviews",
    ],
  },
]

const stats = [
  {
    icon: HiCode,
    value: "50+",
    label: "Projects Completed",
    description: "From small websites to enterprise applications",
    color: "text-blue-500",
  },
  {
    icon: HiUsers,
    value: "25+",
    label: "Happy Clients",
    description: "Satisfied clients across different industries",
    color: "text-green-500",
  },
  {
    icon: FaTrophy,
    value: "5+",
    label: "Awards Won",
    description: "Recognition for outstanding work and innovation",
    color: "text-purple-500",
  },
  {
    icon: FaCoffee,
    value: "1000+",
    label: "Cups of Coffee",
    description: "Fuel for late-night coding sessions",
    color: "text-orange-500",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">About Me</GradientText>
          </h1>

          <AnimatedText
            text="Get to know the person behind the code - my journey, passion, and vision for creating exceptional digital experiences"
            className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed"
            delay={0.3}
          />
        </motion.div>

        {/* Personal Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <GradientText gradient="secondary">My Story</GradientText>
              </h2>

              <div className="space-y-4 text-foreground-muted leading-relaxed">
                <p>
                  Hello! I&apos;m Anand Jaiswal, a passionate full-stack developer with over 3 years
                  of experience creating digital solutions that make a difference. My journey in
                  technology started during my college years when I discovered the power of code to
                  solve real-world problems.
                </p>

                <p>
                  What drives me is the intersection of technology and creativity. I believe that
                  great software is not just about functionality&mdash;it&apos;s about creating
                  experiences that delight users and solve meaningful problems. This philosophy
                  guides every project I work on.
                </p>

                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                  contributing to open-source projects, or sharing knowledge with the developer
                  community. I&apos;m always eager to learn and take on new challenges that push the
                  boundaries of what&apos;s possible.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <HiDownload className="w-4 h-4" />
                  Download Resume
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 glass rounded-full font-semibold hover:bg-foreground-primary/10 transition-all duration-300 flex items-center gap-2"
                >
                  <HiMail className="w-4 h-4" />
                  Get In Touch
                </motion.button>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Profile Image Placeholder */}
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl font-bold text-primary/50 glass">
                  <Image src="/my_img.png" fill={true} alt="my_image" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <GradientText gradient="rainbow">By the Numbers</GradientText>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <GradientText gradient="primary">Professional Experience</GradientText>
          </h2>

          <Timeline items={experience} />
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <GradientText gradient="secondary">Education</GradientText>
          </h2>

          <Timeline items={education} />
        </motion.div>

        {/* Skills Section */}
        <div id="skills">
          <SkillsDetailed />
        </div>
      </div>
    </div>
  )
}
