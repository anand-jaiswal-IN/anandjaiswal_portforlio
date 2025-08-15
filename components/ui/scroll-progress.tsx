"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/hooks/use-scroll-animation"

export function ScrollProgress() {
  const scrollProgress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress }}
      transition={{ duration: 0.1 }}
    />
  )
}
