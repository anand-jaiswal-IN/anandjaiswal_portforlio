"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    threshold: options.threshold || 0.1,
    once: options.triggerOnce !== false,
    margin: options.rootMargin || "0px 0px -100px 0px"
  })

  return { ref, isInView }
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', updateOffset)
    return () => window.removeEventListener('scroll', updateOffset)
  }, [speed])

  return offset
}
