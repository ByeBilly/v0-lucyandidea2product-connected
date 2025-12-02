"use client"

import { useState, useEffect } from "react"
import { TaskResultCard } from "@/components/task/task-result-card"
import type { TaskResultDto } from "@/lib/types/task/task-result.dto"
import { getTaskResults } from "@/app/actions/task/get-task-results"
import { TaskResultStatus } from "@/lib/types/task/enum.bean"
import Link from "next/link"
import { ArrowRight, ImageIcon, Video, Music, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomepageShowcase() {
  const [featuredCreations, setFeaturedCreations] = useState<TaskResultDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadFeatured() {
      try {
        const { data } = await getTaskResults({
          page: 1,
          pageSize: 8,
          filter: {
            status: TaskResultStatus.COMPLETED,
          },
        })
        setFeaturedCreations(data)
      } catch (error) {
        console.error("Failed to load featured creations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeatured()
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powered by WaveSpeed AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Access 90+ cutting-edge AI models through our partnership with WaveSpeed. From Flux image generation to Wan
            video creation, experience the latest in AI technology.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Flux, Imagen4, HiDream</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Wan 2.1, Kling, Vidu</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>MMAudio, DIA-TTS</span>
            </div>
          </div>
        </div>

        {/* Example Creations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ShowcaseCard
            title="AI Image Generation"
            description="Created with Flux Dev Ultra Fast"
            type="image"
            provider="WaveSpeed"
          />
          <ShowcaseCard
            title="AI Video Creation"
            description="Generated with Wan 2.1"
            type="video"
            provider="WaveSpeed"
          />
          <ShowcaseCard
            title="AI Audio Synthesis"
            description="Powered by MMAudio v2"
            type="audio"
            provider="WaveSpeed"
          />
        </div>

        {/* Featured Creations */}
        {!isLoading && featuredCreations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Community Creations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredCreations.slice(0, 8).map((creation) => (
                <TaskResultCard key={creation.id} item={creation} />
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading featured creations...</p>
          </div>
        )}

        <div className="text-center">
          <Link href="/en/gallery">
            <Button variant="outline" size="lg">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ShowcaseCard({
  title,
  description,
  type,
  provider,
}: {
  title: string
  description: string
  type: "image" | "video" | "audio"
  provider: string
}) {
  const Icon = type === "image" ? ImageIcon : type === "video" ? Video : Music

  return (
    <div className="group relative rounded-lg border bg-card p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Powered by {provider}</span>
        <Sparkles className="h-3 w-3" />
      </div>
    </div>
  )
}
