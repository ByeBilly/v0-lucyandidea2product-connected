import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-xl text-muted-foreground">Everything you need to know about visionarydirector.com</p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/en/help#getting-started">
              <Button variant="outline" className="w-full bg-transparent">
                Read Guide
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-primary mb-2" />
            <CardTitle>FAQs</CardTitle>
            <CardDescription>Common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/en/help#faq">
              <Button variant="outline" className="w-full bg-transparent">
                View FAQs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>We're here to help</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/en/waitlist">
              <Button variant="outline" className="w-full bg-transparent">
                Get in Touch
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">What's the difference between Lucy and mform?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Lucy</strong> is our managed AI platform where we handle all the infrastructure, API keys, and
                optimization. You simply use credits to generate content. It's perfect for businesses and users who want
                a hassle-free experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>mform</strong> is our "bring your own API keys" platform that gives you complete control. You
                connect your own API keys from providers like Google (Gemini), OpenAI, Anthropic, etc. and pay them
                directly. It's ideal for developers and power users who want transparency and cost control.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">How do I get started with mform?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                1. <strong>Get API keys</strong> from your preferred providers (Google AI Studio for Gemini, OpenAI
                platform, etc.)
                <br />
                2. <strong>Add your keys</strong> in mform's API Key Manager
                <br />
                3. <strong>Start creating</strong> - generate images, videos, audio, and more
                <br />
                <br />
                Your API keys are encrypted and stored securely. We never see or use them.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">What AI providers do you support?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                Currently we support:
                <br />• <strong>Google Gemini</strong> - Image, video, and text generation
                <br />• <strong>OpenAI</strong> - GPT models and DALL-E
                <br />• <strong>Anthropic</strong> - Claude models
                <br />• <strong>Replicate</strong> - Various open-source models
                <br />• <strong>ElevenLabs</strong> - Voice and audio generation
                <br />• <strong>Custom APIs</strong> - Add any compatible API endpoint
                <br />
                <br />
                We're constantly adding new providers based on user demand.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">Is my data secure?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely. We take security seriously:
                <br />• All API keys are encrypted at rest and in transit
                <br />• We use industry-standard authentication (Supabase Auth)
                <br />• Your generated content is private by default
                <br />• Optional: Share creations publicly in our gallery
                <br />• We never train AI models on your data
                <br />• Regular security audits and compliance checks
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">When will the platform launch?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                We're currently in active development and finalizing the platform. Join our waitlist to get early access
                and be notified as soon as we launch. Waitlist members will receive:
                <br />• Priority access to the platform
                <br />• Exclusive launch pricing
                <br />• Free credits for Lucy
                <br />• Early adopter badge
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">What types of content can I generate?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                Our platform supports multi-modal AI generation:
                <br />• <strong>Images</strong> - From text prompts, reference images, or sketches
                <br />• <strong>Videos</strong> - Short clips, animations, and visual effects
                <br />• <strong>Audio</strong> - Voice synthesis, music, sound effects
                <br />• <strong>Text</strong> - Content writing, code, creative writing
                <br />
                <br />
                More modalities coming soon based on AI advancement and user feedback.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">Do you offer team/enterprise plans?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                Yes! We're building team collaboration features including:
                <br />• Shared workspaces and asset libraries
                <br />• Role-based access control
                <br />• Usage analytics and reporting
                <br />• Dedicated support
                <br />• Custom integrations and API access
                <br />
                <br />
                Contact us through the waitlist form and mention your team needs for priority access.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Getting Started Guide */}
      <div id="getting-started" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Getting Started Guide</h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Choose Your Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Decide between <strong>Lucy</strong> (managed) or <strong>mform</strong> (bring your own keys) based on
                your needs.
              </p>
              <Link href="/en/features">
                <Button variant="outline">Compare Features</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Set Up Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create an account and complete your profile. For mform users, add your API keys securely in the
                settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Start Creating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use the intuitive interface to generate your first creation. Try different prompts, models, and settings
                to find what works best.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 4: Manage Your Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All your generations are automatically saved in your asset library. Search, filter, download, and
                organize your creations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-12">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6">Join our waitlist and we'll reach out with more information</p>
        <Link href="/en/waitlist">
          <Button size="lg">Join Waitlist</Button>
        </Link>
      </div>
    </div>
  )
}
