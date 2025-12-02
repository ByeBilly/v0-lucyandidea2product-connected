"use client"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Rocket, Shield, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { HomepageShowcase } from "@/components/homepage-showcase"

export default function HomePage() {
  const t = useTranslations("HomePage")
  const router = useRouter()

  const startButtonHandler = () => {
    router.push("/waitlist")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">{t("heroTitlePart1")}</span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  {t("heroTitlePart2")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {t("heroDescriptionLine1")}
                <br />
                <span className="text-slate-400">{t("heroDescriptionLine2")}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={startButtonHandler}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Zap className="mr-2 h-5 w-5" />
                {t("startButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 bg-transparent"
              >
                <Link href="/lucy">
                  <Star className="mr-2 h-5 w-5" />
                  Explore Lucy
                </Link>
              </Button>
            </div>
          </div>

          {/* Uncomment below when WaveSpeed API is configured */}
          {/* <div className="animate-fade-in">
            <AIGenerator />
          </div> */}

          <div className="max-w-3xl mx-auto">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-white">Early Access Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-slate-300 text-lg">
                  We're putting the finishing touches on our AI-powered platform. Join the waitlist to be among the
                  first to experience:
                </p>
                <ul className="text-left text-slate-400 space-y-2 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Multi-provider AI access (OpenAI, Anthropic, Gemini, Replicate)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Bring your own API keys for full control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Lucy - our creative AI assistant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>mforms - customizable AI creation tools</span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Link href="/waitlist">
                    Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("featuresTitle")}</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t("featuresDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{t("feature1Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{t("feature1Description")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{t("feature2Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{t("feature2Description")}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{t("feature3Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{t("feature3Description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Creations showcase gallery */}
      <HomepageShowcase />

      {/* Stats Section */}
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
    </div>
  )
}
