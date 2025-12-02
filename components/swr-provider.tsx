"use client"

import { SWRConfig } from "swr"
import type React from "react"

interface SWRProviderProps {
  children: React.ReactNode
  fallback?: Record<string, any>
}

export function SWRProvider({ children, fallback }: SWRProviderProps) {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>
}
