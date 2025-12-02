"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, Rocket, Zap } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Successfully joined the waitlist!")
      } else {
        toast.error(data.error || "Failed to join waitlist")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader className="text-center pb-8 pt-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4">You're on the list!</CardTitle>
            <CardDescription className="text-lg text-slate-300">
              We'll notify you as soon as VisionaryDirector launches.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-12">
            <div className="text-center space-y-4">
              <p className="text-slate-400">
                Get ready to experience the future of AI-powered creativity. We can't wait to show you what we've built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Link href="/en">Back to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Marketing content */}
        <div className="space-y-8 text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
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
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-white">Join the Waitlist</CardTitle>
            <CardDescription className="text-slate-400">
              Be the first to know when we launch. No spam, we promise.
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
  )
}
