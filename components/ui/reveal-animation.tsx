"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface RevealAnimationProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
}

export function RevealAnimation({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
}: RevealAnimationProps) {
  const { ref, isInView } = useScrollAnimation()

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 }
      case "down":
        return { y: -distance, x: 0 }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      default:
        return { y: distance, x: 0 }
    }
  }

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  }

  const animate = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : getInitialPosition().x,
    y: isInView ? 0 : getInitialPosition().y,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function StaggeredReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = "up",
}: StaggeredRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <RevealAnimation key={index} direction={direction} delay={index * staggerDelay}>
          {child}
        </RevealAnimation>
      ))}
    </div>
  )
}
