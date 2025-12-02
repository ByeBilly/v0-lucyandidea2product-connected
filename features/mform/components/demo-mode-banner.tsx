"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function MformDemoModeBanner() {
  return (
    <Alert className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
        Demo mode: Add your own API keys to start generating content.{" "}
        <Link href="/en/waitlist" className="underline font-medium">
          Join waitlist
        </Link>{" "}
        for guided setup when we launch.
      </AlertDescription>
    </Alert>
  )
}
