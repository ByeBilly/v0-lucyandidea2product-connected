"use server"

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Initialize Redis client (uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars)
let redis: Redis | null = null
let rateLimiters: Record<string, Ratelimit> | null = null

function initializeRedis() {
  if (!redis) {
    const url = process.env.KV_REST_API_URL
    const token = process.env.KV_REST_API_TOKEN

    if (!url || !token) {
      console.warn("[v0] Redis env vars not configured - rate limiting disabled")
      return null
    }

    redis = new Redis({ url, token })
  }
  return redis
}

function getRateLimiters() {
  if (!rateLimiters) {
    const r = initializeRedis()
    if (!r) return null

    // Define rate limiters for different Lucy actions
    rateLimiters = {
      // Chat: 20 messages per 60 seconds (generous for conversation flow)
      chat: new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(20, "60 s"),
        analytics: true,
        prefix: "ratelimit:lucy:chat",
      }),

      // Image generation: 10 per 60 seconds (prevents spam, allows burst)
      imageGen: new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(10, "60 s"),
        analytics: true,
        prefix: "ratelimit:lucy:image",
      }),

      // Video generation: 3 per 60 seconds (expensive operation)
      videoGen: new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(3, "60 s"),
        analytics: true,
        prefix: "ratelimit:lucy:video",
      }),

      // Audio generation: 10 per 60 seconds
      audioGen: new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(10, "60 s"),
        analytics: true,
        prefix: "ratelimit:lucy:audio",
      }),

      // Asset queries: 30 per 60 seconds (lightweight, can be generous)
      assetQuery: new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(30, "60 s"),
        analytics: true,
        prefix: "ratelimit:lucy:assets",
      }),
    }
  }

  return rateLimiters
}

export type RateLimitAction = "chat" | "imageGen" | "videoGen" | "audioGen" | "assetQuery"

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  reset: number
  retryAfter?: number
}

/**
 * Check rate limit for a specific user and action
 * @param userId - User ID
 * @param action - Action type
 * @returns Rate limit result
 */
export async function checkRateLimit(userId: string, action: RateLimitAction): Promise<RateLimitResult> {
  const limiters = getRateLimiters()

  // If Redis not configured, allow all requests (graceful degradation)
  if (!limiters) {
    console.log("[v0] Rate limiting unavailable - allowing request")
    return {
      allowed: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }

  const limiter = limiters[action]
  if (!limiter) {
    console.warn(`[v0] No rate limiter found for action: ${action}`)
    return {
      allowed: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(userId)

    const result: RateLimitResult = {
      allowed: success,
      limit,
      remaining,
      reset,
    }

    // If rate limit exceeded, calculate retry-after
    if (!success) {
      result.retryAfter = Math.ceil((reset - Date.now()) / 1000)
    }

    console.log(
      `[v0] Rate limit check: userId=${userId}, action=${action}, allowed=${success}, remaining=${remaining}/${limit}`,
    )

    return result
  } catch (error) {
    console.error("[v0] Rate limit check error:", error)
    // On error, allow request (fail open for availability)
    return {
      allowed: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }
}

/**
 * Reset rate limit for a user (admin function)
 */
export async function resetRateLimit(userId: string, action?: RateLimitAction): Promise<boolean> {
  const r = initializeRedis()
  if (!r) return false

  try {
    if (action) {
      // Reset specific action
      await r.del(`ratelimit:lucy:${action}:${userId}`)
    } else {
      // Reset all actions
      const actions: RateLimitAction[] = ["chat", "imageGen", "videoGen", "audioGen", "assetQuery"]
      await Promise.all(actions.map((a) => r.del(`ratelimit:lucy:${a}:${userId}`)))
    }
    return true
  } catch (error) {
    console.error("[v0] Rate limit reset error:", error)
    return false
  }
}
