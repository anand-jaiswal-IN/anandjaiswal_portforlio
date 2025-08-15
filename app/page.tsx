import { HeroSection } from "@/components/sections/hero"
import { SkillsPreview } from "@/components/sections/skills-preview"
import { FeaturedProjects } from "@/components/sections/featured-projects"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsPreview />
      <FeaturedProjects />
    </div>
  )
}
