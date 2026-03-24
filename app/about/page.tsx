"use client"

import { motion } from "framer-motion"
import { HiDownload, HiMail } from "react-icons/hi"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"
import { Timeline } from "@/components/ui/timeline"
// import { SkillsDetailed } from "@/components/sections/skills-detailed"
import Image from "next/image"
import Link from "next/link"

const education = [
  {
    title: "Bachelor of Technology in Electronics and Communication Enginnering",
    organization: "Bundelkhand Institute of Engineering and Technology",
    location: "Jhansi, Uttar Pradesh, India",
    period: "2023 - 2027",
    description:
      "Currently pursuing a B.Tech degree with a focus on Electronics and Communication Engineering. Gained strong foundation in programming, data structures, algorithms, and web development.",
    achievements: [
      "Graduated with 8.5/10 CGPA",
      "Led the Web Development Club for 2 years",
      "Won 2 hackathons during college",
      "Participated in various coding competitions, workshops and college events",
    ],
  },
  {
    title: "Higher Secondary Education",
    organization: "Little Flower Children School, CBSE Board",
    location: "Mau, Uttar Pradesh, India",
    period: "2020 - 2022",
    description:
      "Completed 12th grade with focus on Mathematics, Physics, and Chemistry. Achieved 89% marks and was among the top 10% of students.",
    achievements: [
      "89% marks in 12th grade",
      "Active member of the Science Club",
      "Participated in inter-school science exhibitions",
    ],
  },
]

const experience = [
  {
    title: "Full Stack Developer Intern",
    organization: "DevXAlpha - A leading web agency specializing in custom software solutions for clients worldwide",
    location: "Remote",
    period: "June 2025 - July 2025",
    current: false,
    description:
      "Leading development of enterprise web applications using React, Next.js, and Node.js. Managing a team of 4 developers and collaborating with cross-functional teams to deliver high-quality software solutions.",
    achievements: [
      "Increased application performance by 40%",
      "Created the carriers page for the company website using Next.js and Tailwind CSS",
      "Worked with 2 developers",
      "Deployed 3 major projects to production with zero downtime",
    ],
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
                  Hello! I&apos;m Anand Jaiswal, a passionate full-stack developer with over 2 years
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
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <HiDownload className="w-4 h-4" />
                    Download Resume
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 glass rounded-full font-semibold hover:bg-foreground-primary/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <HiMail className="w-4 h-4" />
                    Get In Touch
                  </motion.button>
                </Link>
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
        {/* <div id="skills">
          <SkillsDetailed />
        </div> */}
      </div>
    </div>
  )
}
