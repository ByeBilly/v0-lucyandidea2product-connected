import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, Globe, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About | visionarydirector.com",
  description: "Learn about our mission to democratize AI creation tools and our partnership with WaveSpeed AI.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">Democratizing AI Creation</h1>
        <p className="text-xl text-muted-foreground text-balance">Making powerful AI tools accessible to everyone</p>
      </div>

      <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
        <h2>Our Mission</h2>
        <p>
          At visionarydirector.com, we believe AI creation tools should be accessible, transparent, and user-controlled.
          We're building a platform where creators can harness the power of cutting-edge AI without vendor lock-in or
          hidden costs.
        </p>

        <h2>Two Platforms, One Vision</h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Lucy</h3>
            <p className="text-muted-foreground">
              Our managed platform with premium models and seamless experience. Perfect for creators who want instant
              access without configuration.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">mform</h3>
            <p className="text-muted-foreground">
              Revolutionary "bring your own keys" model. Full control over costs, providers, and data. The future of AI
              democratization.
            </p>
          </div>
        </div>

        <h2>Powered by WaveSpeed AI</h2>
        <p>
          We're proud to partner with{" "}
          <a
            href="https://wavespeed.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            WaveSpeed AI
          </a>
          , the creators of idea2product. Their comprehensive SDK gives us access to 90+ cutting-edge AI models from
          providers like Flux, Wan, Kling, and more.
        </p>
        <p>
          This partnership lets us offer you the latest AI technology while supporting the builders who made this
          platform possible.
        </p>

        <h2>Our Values</h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-1">Fast & Reliable</h4>
              <p className="text-sm text-muted-foreground">Production-grade infrastructure with 99.9% uptime goal</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-1">User-Controlled</h4>
              <p className="text-sm text-muted-foreground">Your keys, your data, your choice of providers</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-1">Transparent Pricing</h4>
              <p className="text-sm text-muted-foreground">No hidden fees, pay only for what you use</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-1">Community First</h4>
              <p className="text-sm text-muted-foreground">Built by creators, for creators</p>
            </div>
          </div>
        </div>

        <h2>Join the Waitlist</h2>
        <p>
          We're currently in development and preparing for launch. Join our waitlist to be among the first to experience
          the future of AI creation.
        </p>
      </div>

      <div className="text-center">
        <Link href="/en/waitlist">
          <Button size="lg">
            Join Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
