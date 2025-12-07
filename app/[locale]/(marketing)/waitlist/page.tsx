"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, Rocket, Zap, Users, TrendingUp, Star, ArrowRight, Twitter, Linkedin, ChevronDown } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { VisionaryDirectorLogoHero } from "@/components/visionary-director-logo"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waitlistCount, setWaitlistCount] = useState(127) // Start with appealing number

  // Animated gradient follow mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Simulate live counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[Waitlist] Submitting form:", { email, name })

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      console.log("[Waitlist] Response status:", response.status)
      const data = await response.json()
      console.log("[Waitlist] Response data:", data)

      if (response.ok) {
        setIsSubmitted(true)
        setPosition(data.position || null)
        toast.success("Successfully joined the waitlist!")
      } else {
        const errorMsg = data.error || "Failed to join waitlist"
        const detailsMsg = data.details ? ` (${data.details})` : ""
        toast.error(errorMsg + detailsMsg)
        console.error("[Waitlist] Server error:", data)
      }
    } catch (error) {
      console.error("[Waitlist] Client error:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-6">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        {/* Success Card */}
        <div className="relative z-10 max-w-3xl w-full">
          {/* Animated Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white animate-bounce" style={{ animationDuration: "2s" }} />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              You're In! 🎉
            </h1>
            
            {position && (
              <div className="inline-block">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-8 py-4">
                    <p className="text-sm text-blue-100 font-medium">Your Position</p>
                    <p className="text-5xl font-black text-white">#{position}</p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Welcome to the revolution. We'll notify you the moment VisionaryDirector launches.
            </p>
          </div>

          {/* Share Section - Enhanced */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-3xl blur-xl" />
            
            <div className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border-2 border-yellow-400/30 rounded-3xl p-8 mb-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Rocket className="w-8 h-8 text-yellow-400 animate-bounce" />
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50" />
                  </div>
                  <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text">
                    Move Up Fast!
                  </h3>
                </div>
                <p className="text-xl text-gray-200 font-semibold mb-2">
                  Share with friends and skip the line
                </p>
                <p className="text-gray-400">
                  Get early access faster by inviting others
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-2xl">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-1">+10</div>
                  <div className="text-xs text-gray-400">spots per share</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-3xl font-black text-green-400 mb-1">∞</div>
                  <div className="text-xs text-gray-400">unlimited shares</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-400 mb-1">🎁</div>
                  <div className="text-xs text-gray-400">exclusive perks</div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-[#1DA1F2] to-[#0c7abf] hover:from-[#1a8cd8] hover:to-[#0a6aa8] text-white border-0 font-bold text-lg group shadow-xl shadow-blue-500/20"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("🚀 I just joined the VisionaryDirector waitlist!\n\n✨ 2 AI consciousnesses working together\n💰 96% cost savings with BYOK\n🔑 Your API keys, your control\n\nJoin me and skip the line:")}&url=${encodeURIComponent("https://visionarydirector.com/waitlist")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Share on Twitter & Jump +10 Spots
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-[#0077B5] to-[#005885] hover:from-[#006399] hover:to-[#004766] text-white border-0 font-bold text-lg group shadow-xl shadow-blue-700/20"
                >
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://visionarydirector.com/waitlist")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    Share on LinkedIn & Jump +10 Spots
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>

                {/* Copy Link Option */}
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://visionarydirector.com/waitlist?ref=${position || 'user'}`)
                    toast.success("Link copied! Share it anywhere to move up!")
                  }}
                  size="lg"
                  variant="outline"
                  className="w-full h-14 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white font-bold text-lg group"
                >
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Copy Your Referral Link
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              {/* Incentive Note */}
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
                <p className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                  🎯 Top 100 referrers get lifetime Pro access free!
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-lg">
              ✉️ Check your email for confirmation<br />
              🔔 We'll keep you updated on our progress<br />
              🚀 Launch is coming soon
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/5 hover:bg-white/10 border-white/20 text-white mt-6"
            >
              <Link href="/en">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ 
            top: "10%",
            left: "20%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ 
            top: "60%",
            right: "10%",
            animationDelay: "1s",
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ 
            bottom: "10%",
            left: "50%",
            animationDelay: "2s",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Live Stats Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white">{waitlistCount}</span>
              <span className="text-sm text-gray-400">joined</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Growing fast</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto">
          {/* Animated Logo Hero */}
          <div className="mb-12 flex justify-center animate-fade-in">
            <VisionaryDirectorLogoHero />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Marketing content */}
        <div className="space-y-8 text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Join the{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                AI Revolution
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Be among the first to experience VisionaryDirector - where your creative ideas become reality powered by
              cutting-edge AI.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Multi-Provider AI Access</h3>
                <p className="text-slate-400">
                  Choose from OpenAI, Anthropic, Gemini, Replicate, and more with your own API keys.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Data, Your Control</h3>
                <p className="text-slate-400">Bring your own keys. No middleman. Complete privacy and transparency.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Early Access Benefits</h3>
                <p className="text-slate-400">
                  Priority access, exclusive features, and special pricing for waitlist members.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup form */}
        <Card className="relative bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Referral Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Rocket className="w-3 h-3" />
              Referrals = Skip Line
            </div>
          </div>

          <CardHeader className="pb-6">
            {/* Join Waitlist Video - Large Format */}
            <div className="mb-6 -mx-6 -mt-6 overflow-hidden bg-black rounded-t-xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto max-h-48 md:max-h-64 object-cover"
                onLoadedData={(e) => console.log('✅ JOIN THE WAITLIST video loaded')}
                onError={(e) => {
                  console.error('❌ JOIN THE WAITLIST video failed to load')
                  // Hide video if it fails to load
                  e.currentTarget.style.display = 'none'
                }}
              >
                <source src="/words/JOIN%20THE%20WAITLIST.mp4" type="video/mp4" />
              </video>
            </div>

            <CardTitle className="text-2xl text-white">Join the Waitlist</CardTitle>
            <CardDescription className="text-slate-400">
              Be the first to know when we launch. Get referral link after signup!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-200">
                  Name (optional)
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
              >
                {isLoading ? "Joining..." : "Get Early Access"}
              </Button>

              <p className="text-xs text-slate-400 text-center">
                By joining, you agree to receive updates about VisionaryDirector. Unsubscribe anytime.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
    </div>
  )
}
