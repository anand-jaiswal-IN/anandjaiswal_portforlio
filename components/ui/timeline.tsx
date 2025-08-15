"use client"

import { motion } from "framer-motion"
import { HiCalendar, HiLocationMarker } from "react-icons/hi"
import { cn } from "@/lib/utils"

interface TimelineItem {
  title: string
  organization: string
  location?: string
  period: string
  description: string
  achievements?: string[]
  current?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex items-start gap-6 md:gap-8"
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
                className={cn(
                  "w-8 h-8 rounded-full border-4 border-background-primary flex items-center justify-center",
                  item.current 
                    ? "bg-primary shadow-lg animate-pulse-glow" 
                    : "bg-gradient-to-br from-primary to-accent"
                )}
              >
                {item.current && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground-primary group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-lg text-primary font-semibold">
                    {item.organization}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-foreground-muted">
                    <div className="flex items-center gap-1">
                      <HiCalendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <HiLocationMarker className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.current && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground-muted leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-primary mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="text-sm text-foreground-muted flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
