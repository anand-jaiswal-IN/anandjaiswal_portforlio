"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi"
import { cn } from "@/lib/utils"

interface ViewAllButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ViewAllButton({ 
  href, 
  children, 
  className, 
  delay = 0.6 
}: ViewAllButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className={cn("text-center mt-12", className)}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 glass rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl"
        >
          <span>{children}</span>
          <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
