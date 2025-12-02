import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { UserContext } from "@/lib/types/auth/user-context.bean"
import { AuthStatus, ActiveStatus } from "@/lib/types/permission/permission-config.dto"
import type { SupabaseClient } from "@supabase/supabase-js"

const UN_USER_CONTEXT = {
  id: null,
  roles: [],
  authStatus: AuthStatus.ANONYMOUS,
  activeStatus: ActiveStatus.INACTIVE,
}

const ROUTE_PERMISSIONS = {
  public: [
    "/",
    "/login",
    "/not-found",
    "/unauthorized",
    "/privacy",
    "/terms",
    "/auto-login",
    "/confirm",
    "/forgot-password",
    "/register",
    "/subscribe-plan",
    "/lucy",
  ],
  admin: ["/admin", "/admin/*"],
}

/**
 * Create Supabase client and update session
 * @param request NextRequest object
 * @returns Object containing Supabase client and NextResponse
 */
export async function createSupabaseMiddlewareClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not configured")
    return {
      supabase: null,
      response: NextResponse.next({
        request: {
          headers: request.headers,
        },
      }),
    }
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  return { supabase, response }
}

export async function getSessionUser(supabase: SupabaseClient | null): Promise<UserContext> {
  if (!supabase) {
    return UN_USER_CONTEXT
  }

  // Get current session information
  const {
    data: { session: currentSession },
  } = await supabase.auth.getSession()

  if (!currentSession) {
    return UN_USER_CONTEXT
  }
  const userContext = {
    id: currentSession.user.id,
    roles: currentSession.user.role?.split(",") || [],
    authStatus: AuthStatus.AUTHENTICATED,
    activeStatus: ActiveStatus.INACTIVE,
  }

  // Check if session refresh is needed
  // Refresh session if it doesn't exist or if the refresh token expires within 10 minutes
  const needsRefresh =
    currentSession.refresh_token &&
    currentSession.expires_at &&
    new Date(currentSession.expires_at * 1000).getTime() - Date.now() < 10 * 60 * 1000

  if (needsRefresh) {
    const refreshResult = await supabase.auth.refreshSession()
    if (refreshResult.error) {
      console.log("Failed to refresh session:", refreshResult.error)
      return userContext
    }
  }
  return userContext
}

export function isBasicRoute(path: string, routes: string[]) {
  for (const route of routes) {
    if (route.endsWith("*")) {
      const realRoute = route.slice(0, -1)
      if (path.startsWith(realRoute)) {
        return true
      }
    } else {
      if (path === route) {
        return true
      }
    }
  }
  return false
}

/**
 * Update session and handle authentication
 * @param request NextRequest object
 * @returns NextResponse object
 */
export async function updateSessionAndAuth(request: NextRequest) {
  const { supabase, response } = await createSupabaseMiddlewareClient(request)
  const path = request.nextUrl.pathname
  const method = request.method

  if (!supabase) {
    return response
  }

  if (method === "GET") {
    if (isBasicRoute(path, ROUTE_PERMISSIONS.public)) {
      return response
    }
    const userContext = await getSessionUser(supabase)

    if (isBasicRoute(path, ROUTE_PERMISSIONS.admin)) {
      if (userContext.roles.includes("system_admin")) {
        return response
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    if (userContext.authStatus !== AuthStatus.AUTHENTICATED) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  return response
}
