"use client"

import * as React from "react"
import { HiMoon, HiSun, HiDesktopComputer } from "react-icons/hi"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full glass animate-pulse" />
  }

  const themes = [
    { name: "light", icon: HiSun, label: "Light" },
    { name: "dark", icon: HiMoon, label: "Dark" },
    { name: "system", icon: HiDesktopComputer, label: "System" },
  ]

  return (
    <div className="relative">
      <div className="flex items-center gap-1 p-1 rounded-full glass">
        {themes.map(({ name, icon: Icon, label }) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={cn(
              "relative p-2 rounded-full transition-all duration-300",
              "hover:bg-foreground-primary/10",
              theme === name && "bg-primary text-white shadow-lg"
            )}
            title={label}
          >
            <Icon className="w-4 h-4" />
            {theme === name && (
              <div className="absolute inset-0 rounded-full bg-primary animate-pulse-glow opacity-30" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
