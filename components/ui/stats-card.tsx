"use client"

import { motion } from "framer-motion"
import { IconType } from "react-icons"
import { FloatingCard } from "./floating-card"

interface StatsCardProps {
  icon: IconType
  value: string | number
  label: string
  description?: string
  delay?: number
  color?: string
}

export function StatsCard({
  icon: Icon,
  value,
  label,
  description,
  delay = 0,
  color = "text-primary",
}: StatsCardProps) {
  return (
    <FloatingCard
      delay={delay}
      intensity="low"
      style="glass"
      className="text-center group hover:scale-105 transition-all duration-300"
    >
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
      >
        <Icon className={`w-8 h-8 ${color}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-primary mb-2"
      >
        {value}
      </motion.div>

      <h3 className="text-lg font-semibold text-foreground-primary mb-2">{label}</h3>

      {description && (
        <p className="text-foreground-muted text-sm leading-relaxed">{description}</p>
      )}
    </FloatingCard>
  )
}
