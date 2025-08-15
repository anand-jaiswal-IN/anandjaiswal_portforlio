"use client"

import { motion } from "framer-motion"
import { HiArrowDown, HiDownload } from "react-icons/hi"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { AnimatedText } from "@/components/ui/animated-text"
import { GradientText } from "@/components/ui/gradient-text"
import { FloatingCard } from "@/components/ui/floating-card"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ParallaxSection } from "@/components/ui/parallax-section"

export function HeroSection() {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/anandjaiswal", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/anandjaiswal", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:hello@anandjaiswal.dev", label: "Email" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxSection speed={0.3}>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </ParallaxSection>
        <ParallaxSection speed={0.5} direction="down">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </ParallaxSection>
        <ParallaxSection speed={0.2}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </ParallaxSection>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <AnimatedText
              text="Hi, I'm"
              className="text-lg md:text-xl text-foreground-secondary mb-4"
              delay={0.2}
            />
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <GradientText gradient="primary">
                Anand Jaiswal
              </GradientText>
            </h1>

            <AnimatedText
              text="Full Stack Developer & Creative Technologist"
              className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary mb-8"
              delay={0.8}
              variant="slide"
            />

            <AnimatedText
              text="I craft digital experiences that blend cutting-edge technology with beautiful design, creating solutions that not only work flawlessly but inspire and delight users."
              className="text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed"
              delay={1.2}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <MagneticButton
              className="flex items-center gap-2 justify-center group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <HiArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              className="bg-transparent glass border-2 border-primary/20 text-foreground-primary hover:bg-primary hover:text-white flex items-center gap-2 justify-center group"
              strength={0.2}
            >
              <HiDownload className="w-4 h-4" />
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex justify-center gap-4 mb-16"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
                title={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground-muted"
        >
          <span className="text-sm">Scroll to explore</span>
          <HiArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
