"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { BUILD_TIME } from "@/lib/build-time"
import LetterStrip from "@/components/LetterStrip"

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

            {/* Main Headline removed per request */}
            <div className="space-y-6">
              {/* Animated Letter Logo */}
              <div className="flex flex-col items-center mt-16 mb-8">
                <LetterStrip
                  files={["V.mp4", "I.mp4", "S.mp4", "I.mp4", "O.mp4", "N.mp4", "A.mp4", "R.mp4", "Y.mp4"]}
                  height={120}
                  gap={8}
                />
                <LetterStrip
                  files={["D.mp4", "I.mp4", "R.mp4", "E.mp4", "C.mp4", "T.mp4", "O.mp4", "R1.mp4"]}
                  height={120}
                  gap={8}
                />
              </div>

              {/* Full-width Join the Waitlist video */}
              <div className="w-full flex justify-center mt-8 mb-4 px-0">
                <video
                  src="/words/JOIN%20THE%20WAITLIST.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto max-w-none"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
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
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
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
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg"
                >
                  <source src="/buttons/joinwlbutton.mp4" type="video/mp4" />
                </video>
                <span className="sr-only">Join the waitlist</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-16 text-center">
              {/* Cost savings */}
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-bold text-white">Up to 42%</div>
                <div className="text-slate-300 text-lg">Lower AI generation costs</div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  Compared to traditional single‑provider platforms. Visionary Director doesn&apos;t lock you into
                  one model or price—you can route requests to the most efficient provider when you want, or keep
                  any workflow on a single model.
                </p>
              </div>

              {/* Human-in-the-loop control */}
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-bold text-white">100%</div>
                <div className="text-slate-300 text-lg">You remain in control</div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  Your Visionary Director will always request your approval before taking action,
                  so nothing important changes without your explicit sign‑off.
                </p>
              </div>

              {/* Multi‑model freedom */}
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-bold text-white">90+</div>
                <div className="text-slate-300 text-lg">Models, zero lock‑in</div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  Mix and match providers as you grow. Connect your own keys and call any AI API from
                  Visionary Director—no backend setup, no custom code.
                </p>
              </div>
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
