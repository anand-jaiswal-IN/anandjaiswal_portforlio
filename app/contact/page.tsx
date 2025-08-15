"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiPaperAirplane } from "react-icons/hi"
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedText } from "@/components/ui/animated-text"
import { FloatingCard } from "@/components/ui/floating-card"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { LoadingAnimation } from "@/components/ui/loading-animation"

const contactInfo = [
  {
    icon: HiMail,
    title: "Email",
    value: "hello@anandjaiswal.dev",
    href: "mailto:hello@anandjaiswal.dev",
    color: "text-blue-500"
  },
  {
    icon: HiPhone,
    title: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "text-green-500"
  },
  {
    icon: HiLocationMarker,
    title: "Location",
    value: "Delhi, India",
    href: "https://maps.google.com/?q=Delhi,India",
    color: "text-red-500"
  },
  {
    icon: HiClock,
    title: "Response Time",
    value: "Within 24 hours",
    color: "text-purple-500"
  }
]

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/anandjaiswal", label: "GitHub", color: "hover:text-gray-900" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/anandjaiswal", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: FaTwitter, href: "https://twitter.com/anandjaiswal", label: "Twitter", color: "hover:text-blue-400" },
  { icon: FaInstagram, href: "https://instagram.com/anandjaiswal", label: "Instagram", color: "hover:text-pink-500" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <ResponsiveContainer size="xl" padding="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="primary">
              Get In Touch
            </GradientText>
          </h1>
          
          <AnimatedText
            text="Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing together!"
            className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed"
            delay={0.3}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <GradientText gradient="secondary">
                Let's Connect
              </GradientText>
            </h2>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <FloatingCard
                  key={info.title}
                  delay={index * 0.1}
                  intensity="low"
                  style="glass"
                  className="p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground-primary mb-1">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-foreground-muted hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground-muted">{info.value}</p>
                      )}
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground-primary">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 glass rounded-full transition-all duration-300 ${link.color}`}
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <FloatingCard
              delay={0.8}
              intensity="low"
              style="glass"
              className="p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground-primary">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground-primary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingAnimation variant="spinner" size="sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-xl"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl"
                  >
                    ❌ Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </FloatingCard>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <GradientText gradient="rainbow">
              Frequently Asked Questions
            </GradientText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What's your typical response time?",
                answer: "I usually respond within 24 hours, often much sooner during business hours."
              },
              {
                question: "Do you work on weekends?",
                answer: "I'm flexible with timing and can accommodate urgent projects when needed."
              },
              {
                question: "What types of projects do you take on?",
                answer: "I work on web applications, mobile apps, APIs, and full-stack solutions of all sizes."
              },
              {
                question: "Do you offer ongoing support?",
                answer: "Yes! I provide maintenance and support packages for all projects I develop."
              }
            ].map((faq, index) => (
              <FloatingCard
                key={index}
                delay={index * 0.1}
                intensity="low"
                style="neomorphism"
                className="p-6"
              >
                <h3 className="font-semibold text-foreground-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-foreground-muted text-sm">
                  {faq.answer}
                </p>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </ResponsiveContainer>
    </div>
  )
}
