import type React from "react"
import LocaleProvider from "../../components/locale-provider"
import { SWRProvider } from "@/components/swr-provider"

interface LocaleLayoutProps {
  children: React.ReactNode
  params?: Promise<{ locale?: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || "en"

  let messages = {}
  let timeZone = undefined
  let now = undefined
  let user = null

  try {
    const { getMessages, getTimeZone, getNow } = await import("next-intl/server")
    messages = await getMessages()
    timeZone = await getTimeZone()
    now = await getNow()
  } catch (error) {
    console.error("[v0] Error loading next-intl server functions:", error)
    // Load default messages as fallback
    try {
      messages = (await import(`../../i18n/${locale}.json`)).default
    } catch (e) {
      console.error("[v0] Error loading fallback messages:", e)
    }
  }

  try {
    const { getCurrentUserProfile } = await import("@/app/actions/auth/get-user-info")
    user = await getCurrentUserProfile()
  } catch (error) {
    console.error("[v0] Error fetching user profile in layout:", error)
  }

  return (
    <SWRProvider
      fallback={{
        "current-user": user,
        locale: locale,
      }}
    >
      <LocaleProvider messages={messages} locale={locale} timeZone={timeZone} now={now}>
        {children}
      </LocaleProvider>
    </SWRProvider>
  )
}
