import { HeroSection } from "@/components/sections/hero"
import { SkillsPreview } from "@/components/sections/skills-preview"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Welcome to my portfolio website. Explore my skills and featured projects.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsPreview />
      <FeaturedProjects />
    </div>
  )
}
