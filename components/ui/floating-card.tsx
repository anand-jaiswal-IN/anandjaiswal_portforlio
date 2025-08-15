"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  intensity?: "low" | "medium" | "high"
  style?: "glass" | "neomorphism" | "minimal"
}

export function FloatingCard({ 
  children, 
  className,
  delay = 0,
  duration = 3,
  intensity = "medium",
  style = "glass"
}: FloatingCardProps) {
  const intensityMap = {
    low: { y: [-5, 5] },
    medium: { y: [-10, 10] },
    high: { y: [-15, 15] }
  }

  const styleClasses = {
    glass: "glass",
    neomorphism: "neomorphism",
    minimal: "bg-background-secondary/50 border border-border"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ 
        delay,
        duration: 0.6,
        ease: "easeOut"
      }}
      className={cn(
        "relative p-6 rounded-2xl transition-all duration-300",
        "hover:shadow-2xl hover:scale-105",
        styleClasses[style],
        className
      )}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      animate={{
        y: intensityMap[intensity].y,
        transition: {
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
    >
      {children}
    </motion.div>
  )
}
