# Lucy Execution System - Technical Documentation

**Document Version:** 1.0
**Last Updated:** December 4, 2025 12:01 AEST

## Overview

Lucy's execution system handles AI-powered conversations, creative generation, and tool calling through the Vercel AI Gateway. This document details current rate limiting, provider selection, and BYO-API handling.

## Rate Limiting System

### Implementation

**File:** `lib/rate-limiting/redis-limiter.ts`
**Provider:** Upstash Redis
**Algorithm:** Sliding window (time-based)

### Current Limits (Per User, Per 60 Seconds)

\`\`\`typescript
const rateLimiters = {
  chat: {
    limit: 20,
    window: "60 s",
    prefix: "ratelimit:lucy:chat"
  },
  imageGen: {
    limit: 10,
    window: "60 s",
    prefix: "ratelimit:lucy:image"
  },
  videoGen: {
    limit: 3,
    window: "60 s",
    prefix: "ratelimit:lucy:video"
  },
  audioGen: {
    limit: 10,
    window: "60 s",
    prefix: "ratelimit:lucy:audio"
  },
  assetQuery: {
    limit: 30,
    window: "60 s",
    prefix: "ratelimit:lucy:assets"
  }
}
\`\`\`

### Design Philosophy

**Generous for Conversation:**
- 20 messages/minute allows natural back-and-forth
- Humans typically send 5-10 messages/minute
- Prevents spam without hindering real users

**Conservative for Expensive Operations:**
- Video generation (3/min) prevents cost explosion
- Image generation (10/min) balances creativity with cost
- Audio generation (10/min) for rapid iteration

### Graceful Degradation

**If Redis Unavailable:**
\`\`\`typescript
if (!limiters) {
  console.log("[v0] Rate limiting unavailable - allowing request")
  return {
    allowed: true,
    limit: 999,
    remaining: 999,
    reset: Date.now() + 60000,
  }
}
\`\`\`

**Philosophy:** Availability > Security
- Platform stays functional even if Redis fails
- Prevents complete service outage
- Logs warnings for monitoring

### Rate Limit Response

**Structure:**
\`\`\`typescript
interface RateLimitResult {
  allowed: boolean       // Can user proceed?
  limit: number          // Total requests allowed
  remaining: number      // Requests left in window
  reset: number          // Unix timestamp of window reset
  retryAfter?: number    // Seconds until user can retry
}
\`\`\`

**Example Response:**
\`\`\`json
{
  "allowed": false,
  "limit": 20,
  "remaining": 0,
  "reset": 1701789600000,
  "retryAfter": 45
}
\`\`\`

**Error Handling:**
\`\`\`typescript
if (!rateLimit.allowed) {
  return {
    success: false,
    error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.`,
    rateLimitExceeded: true,
    retryAfter: rateLimit.retryAfter,
  }
}
\`\`\`

## Provider Selection Logic

### Current Implementation

**File:** `app/actions/lucy/send-message.ts`
**Current State:** HARDCODED

\`\`\`typescript
// Line 76
const model = "openai/gpt-4o" // TODO: Make this configurable per user
const response = await chatWithLucy(chatHistory, currentCredits, model)
\`\`\`

**Available Providers (via AI Gateway):**
- OpenAI: gpt-4o, gpt-4-turbo, gpt-3.5-turbo
- Anthropic: claude-3-5-sonnet-20241022, claude-3-opus
- Google: gemini-2.0-flash-exp, gemini-pro
- xAI: grok-beta
- Meta: llama-3.1-405b (via Fireworks)

### AI Gateway Architecture

**How It Works:**
1. Code calls: `model: "openai/gpt-4o"`
2. Vercel AI Gateway intercepts request
3. Gateway handles authentication, routing, fallbacks
4. Response returned as if called directly

**Benefits:**
- No API keys needed in code
- Automatic fallbacks if provider fails
- Usage analytics
- Cost tracking
- Model switching without code changes

### Planned Provider Selection

**User-Configurable Model Selection:**
\`\`\`typescript
// Future implementation
interface UserPreferences {
  defaultModel: string          // "openai/gpt-4o"
  imageModel: string            // "stability-ai/sdxl"
  videoModel: string            // "runway-gen3"
  audioModel: string            // "elevenlabs/tts"
  allowFallback: boolean        // Try alternative if primary fails
}
\`\`\`

**UI Location:** Profile → Settings → AI Models

**Reasoning:**
- Advanced users want control
- Cost optimization (cheaper models for simple tasks)
- Quality preference (Claude for writing, GPT for code)

## BYO-API Handling in Lucy

### Current State: NOT SUPPORTED

Lucy does **NOT** use BYO-API keys. Users pay with platform credits.

**Rationale:**
1. **Simplicity:** Target audience is non-technical
2. **Zero Setup:** Works immediately without API keys
3. **Credit System:** Predictable costs, no surprise bills
4. **Platform Revenue:** Markup on API calls funds development

### Credits System

**Pricing (Current):**
\`\`\`typescript
export const PRICING = {
  generate_image: 10,    // 10 credits per image
  generate_video: 50,    // 50 credits per video
  animate_image: 50,     // 50 credits per animation
  generate_audio: 5,     // 5 credits per audio clip
} as const
\`\`\`

**Credit Purchase:**
- Via Stripe checkout
- Packages: 100, 500, 1000, 5000 credits
- Never expires
- No subscription required

### Comparison: Lucy vs mform

| Feature | Lucy | mform |
|---------|------|-------|
| API Keys | Platform managed | User BYO-API |
| Cost | Credits (markup) | Direct (wholesale) |
| Setup | Zero | Manual |
| Target User | Beginners | Power users |
| Rate Limits | Yes (Redis) | No (user's limits) |
| Model Choice | Configurable (future) | User's API determines |

### Hybrid Approach (Planned)

**"Power User Mode" in Lucy:**
\`\`\`typescript
interface LucyMode {
  mode: 'platform' | 'byo-api'
  platformCredits?: number
  byoApiKeys?: {
    openai?: string
    anthropic?: string
    // ... other providers
  }
}
\`\`\`

**Benefits:**
- Beginners use platform credits
- Power users bring own keys for cost savings
- Seamless switching
- Best of both worlds

**Implementation Status:** PLANNED (not built)

## Message Flow

### End-to-End Request

\`\`\`
1. User types message in chat
   ↓
2. lucy-chat-interface.tsx → sendUserMessage()
   ↓
3. app/actions/lucy/send-message.ts
   ↓
4. Check rate limit (Redis)
   ✓ allowed → continue
   ✗ denied → return error
   ↓
5. Save user message to DB (lucy_messages)
   ↓
6. Load chat history from DB
   ↓
7. Call features/lucy/services/ai-service.ts → chatWithLucy()
   ↓
8. Vercel AI Gateway → OpenAI API
   ↓
9. Stream response back
   ↓
10. Parse tool calls (generate_image, generate_video, etc.)
   ↓
11. Save assistant message to DB
   ↓
12. Return to client
   ↓
13. UI updates via SWR revalidation
\`\`\`

### Tool Execution Flow

**When Lucy calls a tool:**

\`\`\`typescript
// Lucy decides to generate an image
const toolCall = {
  toolCallId: "call_abc123",
  toolName: "generate_image",
  args: {
    prompt: "A serene mountain landscape at sunset",
    aspectRatio: "16:9"
  }
}

// Platform executes tool
const result = await executeGenerationTool(toolCall)

// Result stored in assets table
// User notified: "I've created your image! Check your gallery."
\`\`\`

**Current Tool Execution:**
- Placeholder (throws error)
- TODO: Wire to WaveSpeed SDK
- WaveSpeed has 90+ models including Flux, SDXL, etc.

## Performance Characteristics

### Latency Breakdown

**Typical Request (chat only):**
- Rate limit check: ~10ms (Redis)
- DB save user message: ~50ms (Supabase)
- AI Gateway call: ~1000ms (GPT-4o)
- DB save assistant message: ~50ms
- **Total: ~1.1s**

**With Image Generation:**
- Chat: ~1.1s
- Image generation: ~5-10s (depends on provider)
- **Total: ~6-11s**

### Optimization Opportunities

1. **Parallel Operations:**
   - Save user message while calling AI (not sequential)
   - Current: Sequential for simplicity
   - Potential saving: ~50ms

2. **Streaming:**
   - Currently uses `generateText()` (waits for full response)
   - Could use `streamText()` for real-time typing
   - User sees response immediately

3. **Caching:**
   - Chat history cached with SWR
   - Could cache common prompts
   - Redis cache for frequent queries

## Error Handling

### Rate Limit Errors

\`\`\`typescript
{
  success: false,
  error: "Rate limit exceeded. Try again in 45 seconds.",
  rateLimitExceeded: true,
  retryAfter: 45
}
\`\`\`

**UI Behavior:**
- Show toast notification
- Display countdown timer
- Disable send button until reset

### AI Gateway Errors

**Handled by Gateway:**
- 503: Provider unavailable → auto-retry
- 429: Provider rate limited → queue request
- 401: Invalid API key → fallback model
- 500: Internal error → graceful degradation

**Logged but Not Surfaced to User:**
- Provider selection decisions
- Fallback activations
- Retry attempts

### Database Errors

\`\`\`typescript
try {
  await LucyMessagesEdit.create({ ... })
} catch (error) {
  console.error("[v0] Failed to save message:", error)
  return {
    success: false,
    error: "Failed to save message. Please try again."
  }
}
\`\`\`

## Current Status Assessment

### Working Correctly ✅

- Rate limiting functional with graceful degradation
- AI Gateway integration stable
- Message persistence reliable
- Tool schema definitions correct

### Needs Improvement ⚠️

- Provider selection hardcoded (needs UI)
- No user-level rate limit customization
- Rate limits may be too restrictive for video generation
- Tool execution not wired to actual generation

### Potential Issues 🔍

**Rate Limiting:**
- **Too Generous?** 20 chat messages/min may allow spam
- **Too Restrictive?** 3 videos/min may frustrate legitimate users
- **No Tiered Limits:** Premium users get same limits as free

**Provider Selection:**
- **Hardcoded Model:** Can't test Claude vs GPT easily
- **No Cost Awareness:** User doesn't see which model costs more
- **No Fallback UI:** User not notified if primary model fails

**BYO-API:**
- **Not Supported:** Power users can't bring own keys
- **Credit Dependency:** Must buy credits, no pay-as-you-go

## Recommendations

See `docs/system/SYSTEM_REVIEW.md` for detailed improvement recommendations.

## Audit Conclusion

**Date:** December 4, 2025 12:01 AEST
**Status:** STABLE BUT NEEDS ENHANCEMENT

Lucy's execution system is architecturally sound with intelligent rate limiting that balances availability and abuse prevention. The hardcoded provider selection should be made configurable soon, and rate limits should be reviewed based on production usage data.

**No regressions detected.** System is operating as designed.
