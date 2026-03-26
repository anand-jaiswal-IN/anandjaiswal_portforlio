"use client"

import { FormEvent, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GradientText } from "@/components/ui/gradient-text"
import { FloatingCard } from "@/components/ui/floating-card"

type FormState = {
  title: string
  excerpt: string
  author: string
  tags: string
  image: string
  content: string
  featured: boolean
}

const initialForm: FormState = {
  title: "",
  excerpt: "",
  author: "Anand Jaiswal",
  tags: "",
  image: "",
  content: "",
  featured: false,
}

export default function AdminBlogPage() {
  const [formData, setFormData] = useState<FormState>(initialForm)
  const [loginKey, setLoginKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session", { method: "GET" })
        if (!response.ok) {
          setIsAuthenticated(false)
          return
        }

        const data = (await response.json()) as { authenticated?: boolean }
        setIsAuthenticated(Boolean(data.authenticated))
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    void checkSession()
  }, [])

  const handleAuthenticate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminKey: loginKey }),
      })

      const data = (await response.json()) as { message?: string }
      if (!response.ok) {
        throw new Error(data.message ?? "Invalid admin key.")
      }

      setIsAuthenticated(true)
      setStatus("idle")
      setMessage("")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Invalid admin key.")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" })
    setIsAuthenticated(false)
    setLoginKey("")
    setStatus("idle")
    setMessage("")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")

    if (!isAuthenticated) {
      setStatus("error")
      setMessage("Admin key verification is required.")
      return
    }

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          author: formData.author,
          tags: formData.tags,
          image: formData.image,
          content: formData.content,
          featured: formData.featured,
        }),
      })

      const data = (await response.json()) as { message?: string; post?: { slug: string } }

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to publish blog post.")
      }

      setStatus("success")
      setMessage(`Blog published successfully at /blog/${data.post?.slug ?? ""}`)
      setFormData(prev => ({ ...initialForm, author: prev.author }))
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Unable to publish blog post.")
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText gradient="primary">Blog Admin</GradientText>
          </h1>
          <p className="text-foreground-muted text-lg">
            Write in markdown and publish blog posts that appear instantly on the public blog page.
          </p>
        </motion.div>

        <FloatingCard delay={0.1} intensity="low" style="glass" className="p-8">
          {isCheckingAuth ? (
            <p className="text-foreground-muted">Checking admin session...</p>
          ) : !isAuthenticated ? (
            <form onSubmit={handleAuthenticate} className="space-y-5">
              <div>
                <label htmlFor="login-key" className="block text-sm font-medium mb-2">
                  Admin Key *
                </label>
                <input
                  id="login-key"
                  type="password"
                  required
                  value={loginKey}
                  onChange={event => setLoginKey(event.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter admin key from .env"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Verifying..." : "Unlock Admin"}
              </button>

              {status === "error" && <p className="text-sm text-red-500">{message}</p>}
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
              <p className="text-sm text-foreground-primary">Admin session verified.</p>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                Logout
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                id="title"
                required
                value={formData.title}
                onChange={event => setFormData(prev => ({ ...prev, title: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="A strong, descriptive title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={event => setFormData(prev => ({ ...prev, excerpt: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Short summary shown on cards"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Author *
                </label>
                <input
                  id="author"
                  required
                  value={formData.author}
                  onChange={event => setFormData(prev => ({ ...prev, author: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="featured" className="block text-sm font-medium mb-2">
                  Featured
                </label>
                <label className="w-full px-4 py-3 rounded-xl glass border border-border flex items-center gap-3 cursor-pointer">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={event =>
                      setFormData(prev => ({ ...prev, featured: event.target.checked }))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-foreground-muted">Mark this post as featured</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags
              </label>
              <input
                id="tags"
                value={formData.tags}
                onChange={event => setFormData(prev => ({ ...prev, tags: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Next.js, TypeScript, Deployment"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                Cover Image URL
              </label>
              <input
                id="image"
                value={formData.image}
                onChange={event => setFormData(prev => ({ ...prev, image: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                id="content"
                required
                rows={12}
                value={formData.content}
                onChange={event => setFormData(prev => ({ ...prev, content: event.target.value }))}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Write markdown content (## headings, - lists, ``` code blocks)."
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Publishing..." : "Publish Blog"}
            </button>

            {status === "success" && <p className="text-sm text-green-500">{message}</p>}
            {status === "error" && <p className="text-sm text-red-500">{message}</p>}
          </form>
          )}
        </FloatingCard>
      </div>
    </div>
  )
}
