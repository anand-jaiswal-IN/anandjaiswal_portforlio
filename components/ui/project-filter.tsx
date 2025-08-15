"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProjectFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "relative px-6 py-3 rounded-full font-medium transition-all duration-300",
            "hover:scale-105 hover:shadow-lg",
            activeCategory === category
              ? "bg-primary text-white shadow-lg"
              : "glass hover:bg-foreground-primary/10"
          )}
        >
          <span className="relative z-10">{category}</span>
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
