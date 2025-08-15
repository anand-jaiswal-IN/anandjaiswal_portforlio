"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ 
  children, 
  className, 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-primary text-white rounded-full font-semibold",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "overflow-hidden group min-h-[56px] flex items-center justify-center",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ transformOrigin: "center" }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ 
          x: position.x * 0.5, 
          y: position.y * 0.5 
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-100 transition-transform duration-200"
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.button>
  )
}
