"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { HiServer, HiLightningBolt, HiArrowRight, HiChip } from "react-icons/hi"
import { GradientText } from "@/components/ui/gradient-text"

type CodingProfileStat = {
  platform: "LeetCode" | "CodeChef" | "Codeforces" | "HackerRank"
  username: string
  profileUrl: string
  score: string
  rating: string
  badges: string
  status: "ok" | "error"
}

type CodingProfilesResponse = {
  generatedAt: string
  profiles: CodingProfileStat[]
}

const mainExpertise = {
  problemSolving: {
    icon: HiLightningBolt,
    title: "Problem Solving (DSA)",
    description: "Consistent algorithmic problem solving across leading coding platforms.",
    level: 92,
    highlights: [
      "LeetCode: solved count and contest rating",
      "CodeChef: rating and stars",
      "Codeforces: peak rating and rank",
      "HackerRank: badges and domain stars",
    ],
    color: "text-amber-500",
    ring: "from-amber-400/40 via-amber-500/10 to-transparent",
    delay: 0,
    links: [
      { label: "LeetCode", href: "https://leetcode.com/u/anandjaiswal_in/" },
      { label: "CodeChef", href: "https://www.codechef.com/users/anandjaiswal68" },
      { label: "Codeforces", href: "https://codeforces.com/profile/anandjaiswal_in" },
      {
        label: "HackerRank",
        href: "https://www.hackerrank.com/profile/anandjaiswal_in",
      },
    ],
    codolioProfileLink: "https://codolio.com/profile/anandjaiswal_in",
  },
  fullStack: {
    icon: HiServer,
    title: "Software Development (Full Stack)",
    description: "Building robust end-to-end products from UI to backend and deployment.",
    level: 90,
    skills: [
      { label: "Frontend", value: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", value: ["Node.js", "Express", "Python", "FastAPI", "Django"] },
      { label: "Data & DevOps", value: ["PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD"] },
      {
        label: "Practices",
        value: ["API design", "testing", "scalability", "performance optimization"],
      },
    ],
    color: "text-red-500",
    ring: "from-red-400/40 via-red-500/10 to-transparent",
    delay: 0.1,
  },
  aiEngineering: {
    icon: HiChip,
    title: "AI Engineering",
    description: "Designing and shipping practical AI features with modern GenAI workflows.",
    level: 88,
    skills: [
      {
        label: "Core LLM skills",
        value: [
          "Prompt engineering",
          "RAG (retrieval-augmented generation)",
          "AI agents",
          "LLM evaluation",
          "Tool / function calling",
          "Agentic workflows",
        ],
      },
      {
        label: "Frameworks & libraries",
        value: ["LangChain", "LangGraph", "LlamaIndex", "Hugging Face Transformers"],
      },
      {
        label: "Vector databases & retrieval",
        value: [
          "Pinecone",
          "Weaviate",
          "Chroma",
          "Semantic search",
          "Embedding models",
          "Hybrid search",
        ],
      },
      {
        label: "Evals & observability",
        value: [
          "LLM-as-judge",
          "RAGAS",
          "Langfuse",
          "Prompt regression testing",
          "Hallucination detection",
          "Tracing & logging",
        ],
      },
    ],
    color: "text-teal-500",
    ring: "from-teal-400/40 via-teal-500/10 to-transparent",
    delay: 0.2,
  },
}

export function SkillsPreview() {
  const { problemSolving, fullStack, aiEngineering } = mainExpertise
  const [profilesData, setProfilesData] = useState<CodingProfilesResponse | null>(null)
  const [loadingProfiles, setLoadingProfiles] = useState(true)

  useEffect(() => {
    let active = true

    async function loadProfiles() {
      try {
        const response = await fetch("/api/coding-profiles")
        if (!response.ok) {
          throw new Error("Failed to load coding profile data")
        }

        const data = (await response.json()) as CodingProfilesResponse
        if (active) {
          setProfilesData(data)
        }
      } catch {
        if (active) {
          setProfilesData(null)
        }
      } finally {
        if (active) {
          setLoadingProfiles(false)
        }
      }
    }

    loadProfiles()

    return () => {
      active = false
    }
  }, [])

  const codingStats = useMemo(() => {
    if (profilesData?.profiles?.length) {
      return profilesData.profiles
    }

    return problemSolving.links.map(link => ({
      platform: link.label as CodingProfileStat["platform"],
      username: "",
      profileUrl: link.href,
      score: "Loading...",
      rating: "Loading...",
      badges: "Loading...",
      status: "error" as const,
    }))
  }, [profilesData, problemSolving.links])

  return (
    <section className="py-20 px-4 bg-background-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
            Core Strength Matrix
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <GradientText gradient="primary">Skills & Expertise</GradientText>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Three core strengths that define my problem-solving approach, engineering depth, and AI
            capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: problemSolving.delay }}
            viewport={{ once: true }}
            className={`lg:col-span-7 rounded-3xl glass-strong border border-primary/20 p-6 md:p-8 relative overflow-hidden group`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${problemSolving.ring} opacity-70 pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <problemSolving.icon className={`w-6 h-6 ${problemSolving.color}`} />
                </div>
                <div className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
                  Flagship Skill
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground-primary mb-3">
                {problemSolving.title}
              </h3>
              <p className="text-foreground-muted mb-6">{problemSolving.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs uppercase tracking-[0.12em] px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-foreground-secondary">
                  Live Platform Sync
                </span>
                <span className="text-xs text-foreground-muted">
                  {loadingProfiles
                    ? "Fetching latest scores..."
                    : `Last update: ${profilesData?.generatedAt ? new Date(profilesData.generatedAt).toLocaleString() : "Unavailable"}`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {codingStats.map(stat => (
                  <a
                    key={stat.platform}
                    href={stat.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-border/60 bg-background-primary/50 px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:bg-background-primary/70"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-foreground-muted mb-1">
                      {stat.platform}
                    </p>
                    <p className="text-sm md:text-base font-semibold text-foreground-primary">
                      {stat.score}
                    </p>
                    <p className="text-xs text-foreground-muted mt-1">{stat.rating}</p>
                    <p className="text-xs text-foreground-muted mt-1">{stat.badges}</p>
                    {stat.status === "error" && !loadingProfiles ? (
                      <p className="text-[11px] text-warning mt-2">Temporarily unavailable</p>
                    ) : null}
                  </a>
                ))}
              </div>

              {!loadingProfiles && !profilesData ? (
                <div className="mb-6 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-foreground-secondary">
                  Live API fetch failed. Refresh to retry.
                </div>
              ) : null}

              <div className="w-full sm:w-auto">
                <Link href={problemSolving.codolioProfileLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full font-semibold border-primary shadow-xs shadow-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group cursor-pointer"
                  >
                    View Codolio Profile
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.article>

          {[fullStack, aiEngineering].map(skill => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: skill.delay }}
              viewport={{ once: true }}
              className={`lg:col-span-5 rounded-3xl glass border border-border/60 p-6 relative overflow-hidden group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.ring} opacity-60 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground-primary mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed mb-5">
                  {skill.description}
                </p>

                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-foreground-muted mb-2">
                    <span>Expertise Depth</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-background-primary/60 border border-border/40 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                <ul className="space-y-2">
                  {skill.skills.map(point => (
                    <li
                      key={point.label}
                      className="text-sm text-foreground-secondary leading-relaxed"
                    >
                      <span className="text-primary mr-2">•</span>
                      {point.label}:
                      <br />
                      {point.value.map(item => (
                        <span
                          key={item}
                          className="text-primary font-medium border border-accent rounded-2xl px-1 m-1 whitespace-nowrap inline-block"
                        >
                          {item}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
