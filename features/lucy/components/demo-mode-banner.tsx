"use client"

import { Sparkles, Zap } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DemoModeBanner() {
  return (
    <Alert className="border-purple-500/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      <AlertDescription className="text-sm text-purple-900 dark:text-purple-200">
        <span className="font-semibold">Lucy is your Creative AI Companion</span> - Powered by{" "}
        <Zap className="inline h-3 w-3" /> Vercel AI Gateway for conversation, with image/video/audio generation coming
        soon via{" "}
        <a
          href="https://wavespeed.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
        >
          WaveSpeed AI
        </a>
        .
      </AlertDescription>
    </Alert>
  )
}
