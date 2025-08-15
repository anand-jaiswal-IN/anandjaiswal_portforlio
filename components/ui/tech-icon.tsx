"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TechIconProps {
  name: string
  icon?: string
  delay?: number
  size?: "sm" | "md" | "lg"
}

export function TechIcon({ name, icon, delay = 0, size = "md" }: TechIconProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base"
  }

  // Generate a simple icon from the name if no icon is provided
  const displayIcon = icon || name.substring(0, 2).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        delay, 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className={cn(
        "relative rounded-2xl neomorphism flex items-center justify-center",
        "group-hover:shadow-2xl transition-all duration-300",
        "bg-gradient-to-br from-background-primary to-background-secondary",
        sizeClasses[size]
      )}>
        {/* Icon or Text */}
        <div className="font-bold text-primary group-hover:text-accent transition-colors duration-300">
          {displayIcon}
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-2 py-1 bg-foreground-primary text-background-primary text-xs rounded whitespace-nowrap">
            {name}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
