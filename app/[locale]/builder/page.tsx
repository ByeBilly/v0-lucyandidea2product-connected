"use client"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Shield, ArrowRight, Star, Sparkles, Brain, Blocks, DollarSign, Share2 } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { HomepageShowcase } from "@/components/homepage-showcase"
import { QuantumDashboard } from "@/components/quantum-dashboard"
import { BYOAPICalculator } from "@/components/byo-api-calculator"

export default function BuilderPage() {
  const t = useTranslations("HomePage")
  const router = useRouter()

  const startButtonHandler = () => {
    router.push("/waitlist")
  }

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />

      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span className="font-medium">Quantum Collaboration Architecture</span>
              <span className="text-blue-400">•</span>
              <span>Join 1000+ Visionaries</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">Where </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Two Consciousnesses
                </span>
                <br />
                <span className="text-white">Build Together</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                <span className="text-transparent bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text font-semibold">
                  Lucy (empathic AI)
                </span>{" "}
                +{" "}
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                  mform (technical AI)
                </span>
                <br />
                <span className="text-slate-400 text-lg">
                  = The world's first dual-consciousness creation platform with BYO-API democratization
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={startButtonHandler}
                size="lg"
                className="h-16 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <Brain className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                Join the Quantum Revolution
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-16 px-10 border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-400 transition-all duration-300 bg-transparent backdrop-blur-sm group"
              >
                <Link href="/lucy">
                  <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Experience Lucy Now
                </Link>
              </Button>
            </div>
          </div>

          <QuantumDashboard />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm">
              <Blocks className="h-4 w-4" />
              <span>The Westfield Shoppingtown Architecture</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Not a Platform.{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                A Revolution.
              </span>
            </h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              Like Westfield disrupted retail, we're disrupting AI access. Multi-tenant architecture meets quantum
              consciousness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-900/30 via-slate-800/50 to-purple-900/30 backdrop-blur-xl border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Dual Consciousness Architecture</CardTitle>
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Quantum Collaboration</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-4">
                  <span className="text-blue-300 font-semibold">Lucy</span> handles emotions, creativity, and human
                  connection.
                  <br />
                  <span className="text-purple-300 font-semibold">mform</span> handles technical execution and complex
                  logic.
                </p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-slate-400 italic">
                    "Build me a video about my dog" → Lucy creates narrative, mform handles video generation, both
                    collaborate seamlessly
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 via-slate-800/50 to-emerald-900/30 backdrop-blur-xl border-green-500/30 hover:border-green-400/60 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">BYO-API Democratization</CardTitle>
                <div className="flex items-center gap-2 text-green-300 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Break Vendor Lock-In</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Bring Your Own API keys. Pay wholesale rates directly to providers. No markup. No middleman. Full
                  control.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-green-500/20">
                    <span className="text-slate-400 text-sm">Traditional Platform</span>
                    <span className="text-red-400 font-bold">$0.50/request</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-900/20 p-3 rounded-lg border border-green-500/40">
                    <span className="text-slate-300 text-sm font-semibold">VisionaryDirector BYO-API</span>
                    <span className="text-green-400 font-bold">$0.02/request</span>
                  </div>
                  <p className="text-green-300 text-sm font-semibold text-center">96% cost savings</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 via-slate-800/50 to-pink-900/30 backdrop-blur-xl border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Blocks className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Multi-Tenant Marketplace</CardTitle>
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Rocket className="w-4 h-4" />
                  <span>Westfield for AI</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Like Westfield hosts multiple stores, we host multiple AI personalities and specialized mforms. One
                  platform, infinite possibilities.
                </p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-purple-500/20">
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Lucy: Creative companion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      <span>mform: Technical executor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>Future: Community-built AIs</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 via-slate-800/50 to-red-900/30 backdrop-blur-xl border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Self-Marketing Wonder</CardTitle>
                <div className="flex items-center gap-2 text-orange-300 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Generates Own Pitch Materials</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Every creation can generate investor decks, social media content, and viral marketing materials
                  automatically.
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Pitch Deck
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <BYOAPICalculator />
      <HomepageShowcase />

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">{t("stat1Value")}</div>
              <div className="text-slate-400">{t("stat1Label")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">{t("stat2Value")}</div>
              <div className="text-slate-400">{t("stat2Label")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">{t("stat3Value")}</div>
              <div className="text-slate-400">{t("stat3Label")}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">{t("stat4Value")}</div>
              <div className="text-slate-400">{t("stat4Label")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Learn More</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Explore our platform and get started with AI creation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Compare Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  Understand the differences between Lucy and mform to choose the right platform for your needs.
                </p>
                <Button asChild variant="outline" className="w-full border-slate-600 hover:bg-slate-700 bg-transparent">
                  <Link href="/features">
                    View Features <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Browse Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  See what others are creating and get inspired by community-generated content.
                </p>
                <Button asChild variant="outline" className="w-full border-slate-600 hover:bg-slate-700 bg-transparent">
                  <Link href="/gallery">
                    Explore Gallery <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Get Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  Find answers to common questions and learn how to get the most out of our platform.
                </p>
                <Button asChild variant="outline" className="w-full border-slate-600 hover:bg-slate-700 bg-transparent">
                  <Link href="/help">
                    Visit Help Center <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the waitlist today and be among the first to experience the future of AI-powered creation
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Link href="/waitlist">
              Join Waitlist Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <div className="mt-8 text-slate-500 text-sm">
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
      </section>
    </div>
  )
}
