"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiHeart, HiArrowUp } from "react-icons/hi"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { GradientText } from "./ui/gradient-text"
import { ResponsiveContainer } from "./ui/responsive-container"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/anandjaiswal", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/anandjaiswal", label: "LinkedIn" },
  { icon: FaEnvelope, href: "mailto:hello@anandjaiswal.dev", label: "Email" },
]

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background-secondary/30 border-t border-border">
      <ResponsiveContainer size="xl" padding="lg" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <GradientText gradient="primary">
                  Anand Jaiswal
                </GradientText>
              </h3>
              <p className="text-foreground-muted mb-6 max-w-md leading-relaxed">
                Full-stack developer passionate about creating exceptional digital experiences. 
                Let's build something amazing together.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-foreground-primary">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground-muted hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-foreground-primary">
                Get In Touch
              </h4>
              <div className="space-y-2 text-foreground-muted">
                <p>hello@anandjaiswal.dev</p>
                <p>Delhi, India</p>
                <p>Available for freelance work</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border"
        >
          <div className="flex items-center gap-2 text-foreground-muted text-sm mb-4 md:mb-0">
            <span>© 2024 Anand Jaiswal. Made with</span>
            <HiHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and lots of coffee</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors duration-300 text-sm group"
          >
            Back to top
            <HiArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </ResponsiveContainer>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}
