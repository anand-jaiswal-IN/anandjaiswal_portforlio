"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface SkillBarProps {
  name: string
  level: number
  delay?: number
  color?: string
}

export function SkillBar({ name, level, delay = 0, color = "primary" }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground-primary font-medium">{name}</span>
        <span className="text-foreground-muted text-sm">{level}%</span>
      </div>
      
      <div className="relative h-3 bg-background-secondary/50 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`
          }}
        >
          {/* Shine effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              delay: delay + 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  )
}
