import { NextRequest, NextResponse } from "next/server"
import createIntlMiddleware from "next-intl/middleware"
import { updateSessionAndAuth } from "./lib/supabase/middleware"

// Define supported locales and default locale
const locales = ["en", "zh-CN"]
const defaultLocale = "en"

export async function middleware(request: NextRequest) {
  try {
    // First, handle next-intl internationalization middleware
    const handleIntl = createIntlMiddleware({
      locales,
      defaultLocale,
      localePrefix: "as-needed",
      localeDetection: false,
    })
    const response = handleIntl(request)

    // Clone the request, as the request body may have been consumed
    const requestForAuth = new NextRequest(request, {
      headers: request.headers,
    })

    // Execute authentication and permission check middleware
    const authResponse = await updateSessionAndAuth(requestForAuth)

    // If the authentication middleware returns a redirect or error response, return it directly
    if (authResponse.status !== 200 || authResponse.headers.get("location")) {
      return authResponse
    }

    // Merge response headers (preserve cookies set by internationalization middleware, etc.)
    authResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-length") {
        response.headers.set(key, value)
      }
    })

    return response
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)",
  ],
}
