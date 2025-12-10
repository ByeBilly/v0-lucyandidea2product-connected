"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { BUILD_TIME } from "@/lib/build-time"

const buildTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
})

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

      const response = await fetch("/api/join-waitlist", {
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
        <section className="min-h-screen flex items-start justify-center px-6 pt-20 pb-24">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            {/* Main Headline removed per request */}
            <div className="space-y-6">
              {/* Animated Letter Logo */}
              <div className="flex flex-col items-center mt-0 mb-8">
                <video
                  src="/words/hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-4xl"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 -mt-10 md:-mt-12 relative z-20">
              {/* Ask me button with video graphic */}
              <Button
                onClick={() => {
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                size="lg"
                className="h-auto p-1 bg-white/5 hover:bg-white/10 border-white/40 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-auto"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-[20rem] md:max-w-[24rem] lg:max-w-[26rem] rounded-lg"
                >
                  <source src="/buttons/askmebutton.mp4" type="video/mp4" />
                </video>
                <span className="sr-only">Ask me what I can do</span>
              </Button>

              {/* Join the waitlist button with video graphic */}
              <Button
                onClick={() => {
                  document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                size="lg"
                className="h-auto p-1 bg-white/5 hover:bg-white/10 border-white/40 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-auto"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-[20rem] md:max-w-[24rem] lg:max-w-[26rem] rounded-lg"
                >
                  <source src="/buttons/joinwlbutton.mp4" type="video/mp4" />
                </video>
                <span className="sr-only">Join the waitlist</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid removed per request */}
        <section className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16" />
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
              <div>Last Build: {buildTimeFormatter.format(new Date(BUILD_TIME))}</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
