import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Key, Zap, Shield, Palette, Code, Users, ArrowRight, CheckCircle2 } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Two Platforms, Infinite Possibilities</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the experience that fits your needs: managed AI with Lucy, or full control with mform
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Lucy Card */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Lucy</CardTitle>
            </div>
            <CardDescription className="text-base">
              Premium managed AI experience - We handle everything
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>No API keys needed - we provide the infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Optimized prompts and models for best results</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Premium support and guaranteed uptime</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Simple credit-based pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Perfect for businesses and teams</span>
              </li>
            </ul>
            <Link href="/en/lucy">
              <Button className="w-full" size="lg">
                Explore Lucy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* mform Card */}
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">mform</CardTitle>
            </div>
            <CardDescription className="text-base">
              Bring your own API keys - Full control and transparency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Use your own API keys from any provider</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Direct cost control - pay providers directly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Full customization and flexibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Multi-provider support (Gemini, OpenAI, Anthropic, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Perfect for developers and power users</span>
              </li>
            </ul>
            <Link href="/en/mform">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                Explore mform
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Every Creator</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate images, videos, and audio in seconds with optimized infrastructure
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your API keys and data are encrypted and never shared with third parties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Palette className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Multi-Modal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create images, videos, audio, and text with a unified interface</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Developer Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                API access, webhooks, and integrations for building custom workflows
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-pink-500 mb-2" />
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Share projects, manage permissions, and collaborate seamlessly</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-indigo-500 mb-2" />
              <CardTitle>Asset Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Organize, search, and manage all your generated content in one place
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the waitlist for early access and be among the first to experience the future of AI creation
        </p>
        <Link href="/en/waitlist">
          <Button size="lg" className="text-lg px-8">
            Join the Waitlist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
