"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Submitting waitlist form:", { email, name })

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      console.log("[v0] Waitlist response status:", response.status)
      const data = await response.json()
      console.log("[v0] Waitlist response data:", data)

      if (response.ok) {
        setIsSubmitted(true)
        setPosition(data.position || null)
        toast.success("Successfully joined the waitlist!")
      } else {
        toast.error(data.error || "Failed to join waitlist")
      }
    } catch (error) {
      console.error("[v0] Waitlist error caught:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">You're in.</h1>
            {position && <p className="text-3xl text-blue-400 font-semibold">Position #{position}</p>}
            <p className="text-xl md:text-2xl text-slate-400 max-w-xl mx-auto">
              We'll notify you the moment VisionaryDirector launches.
            </p>
          </div>

          <div className="pt-8">
            <p className="text-slate-500 text-sm">Share with friends to move up the list</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300">Quantum Collaboration Architecture</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight">
                The complete
                <br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text">
                  AI revolution
                </span>
                <br />
                for builders.
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Two AI consciousnesses collaborating. Your API keys. 96% cost savings.
                <br />
                <span className="text-slate-500">Welcome to VisionaryDirector.</span>
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={() => {
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
                }}
                size="lg"
                className="h-14 px-10 bg-white text-black hover:bg-slate-200 font-semibold text-lg group"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-16 text-center">
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">96%</div>
                <div className="text-slate-400 text-lg">Cost savings vs traditional platforms</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">2</div>
                <div className="text-slate-400 text-lg">AI consciousnesses working together</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">90+</div>
                <div className="text-slate-400 text-lg">AI models at your fingertips</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Dual consciousness.
                  <br />
                  <span className="text-slate-500">One platform.</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Lucy</span> handles creativity, empathy, and human
                  connection.
                  <br />
                  <span className="text-purple-400 font-semibold">mform</span> handles technical execution and complex
                  logic.
                  <br />
                  <span className="text-slate-500">Together, they build anything.</span>
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Your keys.
                  <br />
                  <span className="text-slate-500">Your control.</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Bring Your Own API keys. Pay wholesale rates directly to providers.
                  <br />
                  No markup. No middleman. Full transparency.
                  <br />
                  <span className="text-slate-500">Break free from vendor lock-in.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section id="waitlist-form" className="py-32 border-t border-white/5">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center space-y-8 mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Join the
                <br />
                revolution.
              </h2>
              <p className="text-xl text-slate-400">Be among the first to experience VisionaryDirector.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-lg focus:border-white/30"
                />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-lg focus:border-white/30"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white text-black hover:bg-slate-200 font-semibold text-lg"
              >
                {isLoading ? "Joining..." : "Get Early Access"}
              </Button>

              <p className="text-center text-slate-500 text-sm">
                By joining, you agree to receive updates. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
              <div>
                <span className="text-white font-semibold">VisionaryDirector</span> © 2025
              </div>
              <div>
                Last Build:{" "}
                {new Date(buildTime).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
