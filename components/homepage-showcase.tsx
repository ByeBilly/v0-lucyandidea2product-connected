"use client"

import { useState, useEffect } from "react"
import { TaskResultCard } from "@/components/task/task-result-card"
import type { TaskResultDto } from "@/lib/types/task/task-result.dto"
import { getTaskResults } from "@/app/actions/task/get-task-results"
import { TaskResultStatus } from "@/lib/types/task/enum.bean"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading featured creations...</p>
      </div>
    )
  }

  if (featuredCreations.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Creations
            </h2>
            <p className="text-gray-400">See what our community is creating with mform</p>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredCreations.map((creation) => (
            <TaskResultCard key={creation.id} item={creation} />
          ))}
        </div>
      </div>
    </section>
  )
}
