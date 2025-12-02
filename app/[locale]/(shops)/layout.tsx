import type React from "react"
import Navbar from "@/components/navbar"

/**
 * Shops Layout
 * Shared layout for all "shop" pages (Lucy and future creative studios)
 */
export default function ShopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
