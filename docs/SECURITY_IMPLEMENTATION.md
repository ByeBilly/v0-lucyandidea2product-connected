# Security Implementation - Lucy Platform

## Overview
This document outlines the comprehensive security measures implemented to protect visionarydirector.com from API abuse, unauthorized access, and resource exhaustion.

## 1. Authentication Layer

### Middleware Stack
- **Supabase SSR Auth**: Token-based authentication with automatic refresh
- **Session Cache**: 30-minute TTL with MD5-based cookie validation
- **Public Routes**: Whitelist system for unauthenticated access
- **Admin Routes**: Role-based access control (RBAC) requiring `system_admin` role

### Implementation
\`\`\`typescript
// middleware.ts - Multi-layer protection
1. next-intl (i18n)
2. updateSessionAndAuth (Supabase)
3. Route permission validation
\`\`\`

## 2. Rate Limiting System

### Redis-Based Distributed Rate Limiting
**Technology**: Upstash Redis with sliding window algorithm

### Limits per 60 seconds:
| Action | Limit | Reason |
|--------|-------|--------|
| Chat Messages | 20 | Allow natural conversation flow |
| Image Generation | 10 | Balance creativity with cost |
| Video Generation | 3 | Expensive operation, prevent spam |
| Audio Generation | 10 | Moderate cost operation |
| Asset Queries | 30 | Lightweight, generous limit |

### Implementation
\`\`\`typescript
// lib/rate-limiting/redis-limiter.ts
- Sliding window algorithm (time-based)
- Per-user tracking
- Graceful degradation if Redis unavailable
- Analytics enabled for monitoring
\`\`\`

### Integration Points
All Lucy server actions now check rate limits:
\`\`\`typescript
const rateLimit = await checkRateLimit(userContext.id, "chat")
if (!rateLimit.allowed) {
  return {
    error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter}s`,
    rateLimitExceeded: true,
    retryAfter: rateLimit.retryAfter
  }
}
\`\`\`

## 3. Permission-Based Access Control

### Server Action Guards
Every Lucy action wrapped with `dataActionWithPermission`:
\`\`\`typescript
export const sendMessage = dataActionWithPermission(
  "lucySendMessage",  // Permission key
  async (input, userContext) => { /* ... */ }
)
\`\`\`

### Permission Requirements (lucy.permission.json)
- **authStatus**: `authenticated` (mandatory for all actions)
- **activeStatus**: `inactive` (no 2FA required currently)
- **rejectAction**: `throw` (returns error on permission denied)

### Enforced Actions
- lucySendMessage
- lucyGenerateImage
- lucyGenerateVideo
- lucyAnimateImage
- lucyGenerateAudio
- lucyGetChatHistory
- lucyGetAssets
- lucyDeleteAsset

## 4. Credit System (TODO: Unibee Integration)

### Current State
- Hardcoded 100 credits per user
- TODO: Integrate with Unibee billing system

### Future Implementation
1. **Pre-Check**: Verify sufficient credits before generation
2. **Atomic Deduction**: Deduct credits on success
3. **Refund**: Return credits on failure
4. **Quota Tracking**: Per-user spending limits (daily/monthly)

### Pricing Model
\`\`\`typescript
PRICING = {
  generate_image: 10,
  generate_video: 50,
  animate_image: 50,
  generate_audio: 5,
}
\`\`\`

## 5. API Key Security

### Current Setup
- System-wide API keys in environment variables
- `GEMINI_API_KEY`, `OPENAI_API_KEY`, etc.

### BYO-API Architecture (Future)
Users bring their own API keys for:
- Full cost control
- No platform markup
- Direct billing to user's accounts

### Security Measures
- Keys encrypted at rest (database)
- Keys never exposed to client
- Server-side validation only
- Key rotation capability

## 6. Monitoring & Audit

### What's Logged
\`\`\`typescript
console.log("[v0] Rate limit check: userId=${userId}, action=${action}, allowed=${success}, remaining=${remaining}/${limit}")
\`\`\`

### Metrics to Track
- Per-user API costs
- Rate limit hits
- Failed auth attempts
- Unusual generation patterns

### Alert Triggers
- User exceeds daily spend limit
- Suspicious burst requests
- Multiple rate limit violations
- API key exposure attempts

## 7. Environment Configuration

### Required Environment Variables
\`\`\`env
# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Upstash Redis (Rate Limiting)
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=xxx

# AI APIs (System-wide for now)
GEMINI_API_KEY=xxx
OPENAI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
\`\`\`

### Production Checklist
- [ ] Redis rate limiting configured
- [ ] Supabase auth connected
- [ ] API keys secured
- [ ] Monitoring dashboard setup
- [ ] Alert thresholds configured
- [ ] Backup rate limit strategy (local fallback)

## 8. Graceful Degradation

### Redis Unavailable
If Redis connection fails, system:
1. Logs warning
2. Allows all requests (fail open)
3. Returns mock rate limit: `999/999 remaining`

### Rationale
- Availability > Strict security in early stage
- Prevents complete service outage
- Allows monitoring of Redis issues

### Future: Fail Closed
Once stable, switch to fail-closed:
\`\`\`typescript
if (!limiters) {
  throw new Error("Rate limiting required")
}
\`\`\`

## 9. Attack Vectors Addressed

| Threat | Mitigation |
|--------|-----------|
| **API Quota Exhaustion** | Rate limiting per user per action |
| **Credit Abuse** | Pre-check + atomic deduction (TODO) |
| **Unauthorized Access** | Authentication + RBAC permissions |
| **Concurrent Request Spam** | Sliding window rate limits |
| **Token Theft** | Session refresh + secure cookies |
| **Admin Impersonation** | Role validation in middleware |
| **Public API Exposure** | Server actions only, no client keys |

## 10. Next Steps

### Phase 1: Immediate (Current Implementation)
- ✅ Authentication middleware
- ✅ Permission-based action guards
- ✅ Redis rate limiting
- ✅ Graceful degradation

### Phase 2: Unibee Integration (Next 2 Weeks)
- [ ] Credit pre-check before generation
- [ ] Atomic credit deduction
- [ ] User subscription tiers
- [ ] Spending limit enforcement
- [ ] Credit refund on failure

### Phase 3: BYO-API (Beta Launch)
- [ ] User API key management UI
- [ ] Encrypted key storage
- [ ] Key validation flow
- [ ] Direct API routing
- [ ] Cost transparency dashboard

### Phase 4: Advanced Security (Post-Launch)
- [ ] Input validation & sanitization
- [ ] Output content filtering
- [ ] Abuse pattern detection
- [ ] IP-based rate limiting (DDoS protection)
- [ ] Webhook signature verification
- [ ] Audit log retention policy

## 11. Cursor Integration Notes

This security implementation is designed to work seamlessly with Cursor AI development:

### Testing Rate Limits
\`\`\`bash
# Test rate limit endpoint
curl -X POST https://visionarydirector.com/api/lucy/chat \
  -H "Authorization: Bearer <token>" \
  -d '{"text": "Hello Lucy"}'
\`\`\`

### Debugging Rate Limits
\`\`\`typescript
// Add to Lucy actions for debugging
console.log("[v0] Rate limit status:", rateLimit)
\`\`\`

### Admin Reset Function
\`\`\`typescript
// Call from admin dashboard
await resetRateLimit(userId, "chat") // Reset specific action
await resetRateLimit(userId) // Reset all actions
\`\`\`

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-03  
**Security Contact**: admin@visionarydirector.com
