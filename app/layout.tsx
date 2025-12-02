import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Toaster } from "sonner"
import { FontLoader } from "@/components/font-loader"

export const metadata: Metadata = {
  title: "Visionary Director",
  description: "Create anything with AI - bring your own API keys",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  maximumScale: 1,
}

const manrope = Manrope({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className} overflow-y-scroll`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <FontLoader className={manrope.className} />
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  )
}
