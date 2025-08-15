"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  variant?: "fade" | "slide" | "scale" | "typewriter"
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  variant = "fade",
}: AnimatedTextProps) {
  const words = text.split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const getWordVariants = () => {
    switch (variant) {
      case "slide":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration } },
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration } },
        }
      case "typewriter":
        return {
          hidden: { opacity: 0, width: 0 },
          visible: { opacity: 1, width: "auto", transition: { duration } },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } },
        }
    }
  }

  const wordVariants = getWordVariants()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
