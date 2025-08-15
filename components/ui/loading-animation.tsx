"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingAnimationProps {
  variant?: "dots" | "spinner" | "pulse" | "wave"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingAnimation({ 
  variant = "dots", 
  size = "md", 
  className 
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn("bg-primary rounded-full", sizeClasses[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "spinner") {
    return (
      <motion.div
        className={cn(
          "border-4 border-foreground-muted/20 border-t-primary rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    )
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn(
          "bg-primary rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )
  }

  if (variant === "wave") {
    return (
      <div className={cn("flex items-end gap-1", className)}>
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-2 bg-primary rounded-full"
            animate={{
              height: ["20px", "40px", "20px"]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  return null
}
