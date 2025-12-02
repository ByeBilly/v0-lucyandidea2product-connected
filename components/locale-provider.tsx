"use client"
import { NextIntlClientProvider } from "next-intl"
import useSWR from "swr"
import type { ReactNode } from "react"

interface LocaleProviderProps {
  children: ReactNode
  messages: any
  locale?: string
  timeZone?: string
  now?: Date
}

export default function LocaleProvider({ children, messages, locale, timeZone, now }: LocaleProviderProps) {
  const swr = useSWR("locale")
  const currentLocale = locale ?? swr.data ?? "en"

  try {
    return (
      <NextIntlClientProvider locale={currentLocale} messages={messages} timeZone={timeZone} now={now}>
        {children}
      </NextIntlClientProvider>
    )
  } catch (error) {
    console.error("[v0] LocaleProvider error:", error)
    // Fallback: render children without intl wrapper
    return <>{children}</>
  }
}
