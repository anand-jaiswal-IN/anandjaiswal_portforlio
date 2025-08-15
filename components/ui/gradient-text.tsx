"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: "primary" | "secondary" | "rainbow" | "sunset"
}

export function GradientText({ children, className, gradient = "primary" }: GradientTextProps) {
  const gradients = {
    primary: "bg-gradient-to-r from-primary via-accent to-primary-hover",
    secondary:
      "bg-gradient-to-r from-foreground-secondary via-foreground-primary to-foreground-secondary",
    rainbow: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    sunset: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
  }

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent animate-gradient",
        gradients[gradient],
        className
      )}
    >
      {children}
    </span>
  )
}
