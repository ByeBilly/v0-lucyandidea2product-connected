# VisionaryDirector.com - System Architecture Overview

**Document Version:** 1.0
**Last Updated:** December 4, 2025 12:01 AEST
**Status:** Current Production State

## Executive Summary

VisionaryDirector.com is a dual-consciousness AI creation platform implementing a "Westfield Shoppingtown" multi-tenant architecture. The system features two distinct AI personalities (Lucy and mform) that collaborate through a quantum synchronization layer, combined with BYO-API democratization to break vendor lock-in.

## Current Routing Structure

### Internationalization (i18n)
- **Supported Locales:** en, zh-CN
- **Default Locale:** en
- **Implementation:** next-intl middleware with `localePrefix: "as-needed"`
- **Middleware:** `/middleware.ts` handles auth + i18n in sequence

### Route Groups

\`\`\`
app/[locale]/
├── (marketing)/           # Public pages - no auth required
│   ├── page.tsx           # Homepage with Quantum Dashboard
│   ├── waitlist/          # Email collection + position tracking
│   ├── gallery/           # Public creations showcase
│   ├── features/          # Platform comparison
│   ├── help/              # Support center
│   └── about/             # Company info
│
├── (shops)/               # AI Service Pages - "West Wing"
│   ├── lucy/              # Lucy empathic AI assistant
│   │   └── page.tsx       # Main chat interface
│   └── layout.tsx         # Shops layout wrapper
│
├── (dashboard)/           # Protected pages - requires auth
│   ├── mform/             # mform technical AI - "North/East Wing"
│   ├── profile/           # User settings
│   │   ├── info/
│   │   ├── security/
│   │   ├── settings/
│   │   ├── plans/
│   │   ├── orders/
│   │   └── transactions/
│   └── layout.tsx
│
├── (auth)/                # Authentication flows
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── confirm/
│   └── auto-login/
│
├── (billing)/             # Payment flows
│   └── subscribe-plan/
│       ├── page.tsx
│       └── confirm/
│
├── (draft)/               # Legal pages
│   ├── terms/
│   └── privacy/
│
└── admin/                 # Admin dashboard
    ├── dashboard/
    ├── users/
    ├── waitlist/          # Waitlist management
    ├── roles/
    ├── permissions/
    ├── subscription-plan/
    ├── premium-packages/
    └── billable-metrics/
\`\`\`

### API Routes

\`\`\`
app/api/
└── waitlist/
    └── route.ts           # POST: add to waitlist, GET: fetch entries
\`\`\`

## Current Component Structure

### Feature Modules (Domain-Driven)

\`\`\`
features/
├── lucy/                  # Lucy AI Assistant (West Wing)
│   ├── components/
│   │   ├── lucy-chat-interface.tsx      # Main chat UI
│   │   ├── chat-message.tsx             # Message rendering
│   │   └── demo-mode-banner.tsx         # Dev mode indicator
│   ├── services/
│   │   ├── ai-service.ts                # Vercel AI Gateway integration
│   │   └── gemini-service.ts            # Legacy Gemini (deprecated)
│   ├── hooks/
│   │   └── use-lucy-chat.ts             # Chat state management
│   ├── types.ts
│   └── constants.ts
│
└── mform/                 # mform Technical AI (North/East Wing)
    ├── components/
    │   ├── mform-interface.tsx          # Main interface
    │   ├── lucy-chat-interface.tsx      # mform's Lucy variant
    │   ├── api-key-manager.tsx          # BYO-API key management
    │   ├── asset-library.tsx            # Generated assets gallery
    │   ├── asset-card.tsx               # Individual asset display
    │   └── demo-mode-banner.tsx         # Demo mode indicator
    ├── services/
    │   └── gemini-service.ts            # Generation service
    ├── hooks/
    │   └── use-lucy-chat.ts             # Chat state management
    ├── types.ts
    └── constants.ts                     # API provider configs
\`\`\`

### Shared Components

\`\`\`
components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ... (30+ components)
├── navbar.tsx             # Global navigation
├── quantum-dashboard.tsx  # Dual-consciousness visualization
├── byo-api-calculator.tsx # Cost comparison tool
└── homepage-showcase.tsx  # Featured creations gallery
\`\`\`

## Current API Integration Layout

### Authentication & Database
- **Provider:** Supabase
- **Method:** SSR with `@supabase/ssr`
- **Client Types:**
  - Server: `lib/supabase/server.ts` (cookies-based)
  - Admin: `lib/supabase/admin.ts` (service role)
  - Client: `lib/supabase/client.ts` (browser)
- **Middleware:** Token refresh in `lib/supabase/middleware.ts`

### AI Services

#### Lucy (West Wing)
- **Primary:** Vercel AI Gateway (`features/lucy/services/ai-service.ts`)
  - Model: `openai/gpt-4o` (configurable)
  - No API key required from users
  - Platform-managed credits
- **Deprecated:** Direct Gemini API (`features/lucy/services/gemini-service.ts`)

#### mform (North/East Wing) 
- **Method:** BYO-API (Bring Your Own API keys)
- **Storage:** localStorage in browser (`features/mform/components/api-key-manager.tsx`)
- **Supported Providers:**
  - OpenAI (GPT-4, DALL-E, TTS)
  - Anthropic (Claude)
  - Stability AI (SDXL, SD3)
  - Replicate (LoRA, video)
  - ElevenLabs (voice)
  - Suno (music - external referral)
  - Custom APIs (user-defined)

### WaveSpeed SDK (Southern Wing)
- **Location:** `sdk/` and `app/actions/tool/ws-api-call.ts`
- **Purpose:** 90+ pre-built AI models for platform services
- **Key:** `WAVESPEED_API_KEY` (platform-managed)
- **Status:** Integrated but not yet exposed to users

### Billing
- **Providers:** 
  - Stripe (primary) - `lib/billing/stripe-*`
  - Unibee (alternative) - `lib/unibee/client.ts`
- **Models:** Subscription plans, one-time packages, usage-based

### Storage
- **Database:** PostgreSQL via Supabase (connection pooling)
- **ORM:** Drizzle (`lib/db/drizzle.ts`)
- **Caching:** Cache service with memory/Redis modes (`lib/cache/cache.service.ts`)

## M-Forms System (Current State)

### What is mform?
mform is the "technical consciousness" AI that handles complex execution tasks while Lucy manages empathy and creativity. It's part of the dual-consciousness architecture.

### BYO-API Key System (INTACT ✅)

**Storage Location:**
- Client-side: localStorage with key `"mform_api_keys"`
- Format: JSON object mapping provider IDs to API keys
- Security: Keys never leave user's browser

**Encryption Status:**
- ⚠️ **CURRENTLY UNENCRYPTED** in localStorage
- Keys stored as plaintext JSON
- Vulnerable to XSS attacks
- **RECOMMENDATION:** Implement browser-side encryption with Web Crypto API

**API Key Flow:**
1. User enters API key in `api-key-manager.tsx`
2. Key stored to localStorage immediately
3. UI shows masked key with toggle visibility
4. On generation request, key read from localStorage
5. Key sent to mform generation service
6. Service calls external AI provider directly

**Supported Providers (as of Dec 2025):**
\`\`\`typescript
const API_PROVIDERS = {
  openai: {
    name: "OpenAI",
    capabilities: ["chat", "image", "audio"],
    getApiKeyUrl: "https://platform.openai.com/api-keys"
  },
  anthropic: { ... },
  stability: { ... },
  replicate: { ... },
  elevenlabs: { ... }
}
\`\`\`

**Custom API Support:**
- Users can add any API with custom name, key, baseURL
- Stored alongside built-in providers
- Enables integration with ANY AI service

### mform vs Lucy Comparison

| Feature | Lucy (West Wing) | mform (North/East Wing) |
|---------|-----------------|------------------------|
| API Keys | Platform-managed | User BYO-API |
| Personality | Empathic, creative | Technical, precise |
| Cost Model | Credits (markup) | Wholesale (direct) |
| Rate Limiting | Yes (Redis) | No (user's limits) |
| Best For | Beginners, quick tasks | Power users, cost control |

## Lucy System (Current State)

### Core Purpose
Lucy is the "empathic consciousness" - handles user interaction, creative direction, emotional support, and coordinates with mform for technical execution.

### AI Service Architecture

**Current Implementation (Dec 2025):**
- Service: `features/lucy/services/ai-service.ts`
- Provider: Vercel AI Gateway
- Default Model: `openai/gpt-4o`
- Alternative Models: Claude, Gemini, Llama (all via AI Gateway)

**System Prompt:**
\`\`\`typescript
getLucySystemPrompt(currentCredits: number)
\`\`\`
- Personality: "Anti-Stress Creative Companion"
- Manifesto: Zero jargon, radical patience, celebration
- Financial transparency: Shows credits, asks before spending
- Tool access: generate_image, generate_video, generate_audio

**Function Calling (Tools):**
\`\`\`typescript
{
  generate_image: { cost: 10 credits },
  generate_video: { cost: 50 credits },
  generate_audio: { cost: 5 credits }
}
\`\`\`

**Rate Limiting:**
- Implementation: `lib/rate-limiting/redis-limiter.ts`
- Chat: 20 messages / 60 seconds
- Image: 10 generations / 60 seconds  
- Video: 3 generations / 60 seconds
- Audio: 10 generations / 60 seconds
- Graceful degradation: If Redis unavailable, allows all requests

**Provider Selection:**
- Hardcoded to `openai/gpt-4o` in `send-message.ts`
- TODO: Make user-configurable per conversation
- Gateway handles: AWS Bedrock, Google Vertex, OpenAI, Fireworks, Anthropic, xAI

### BYO-API in Lucy Context
- Lucy does NOT use BYO-API
- Platform provides API access via Vercel AI Gateway
- Users pay with credits (platform markup model)
- Reasoning: Simplicity for non-technical users

### Chat State Management

**Hook:** `features/lucy/hooks/use-lucy-chat.ts`
**Storage:** 
- Database: lucy_chats, lucy_messages tables
- Local state: SWR for caching
- Persistence: All chats saved to Supabase

**Message Flow:**
1. User types message → `sendUserMessage()`
2. Save to DB via `app/actions/lucy/send-message.ts`
3. Check rate limit → Call AI Gateway
4. Stream response via `generateText()` or `streamText()`
5. Parse tool calls (generation requests)
6. Execute tools via WaveSpeed (planned) or placeholder
7. Save assistant message to DB
8. Update UI with SWR revalidation

## System Integration Points

### Authentication Flow
1. User submits login → `app/actions/auth/sign-in.ts`
2. Supabase auth via `@supabase/ssr`
3. Set session cookies
4. Middleware refreshes tokens on each request
5. Permission guard checks via `lib/permission/guards/action.ts`

### Permission System
- Config: JSON files in `app/actions/*/permission.json`
- Schema: `lib/types/permission/permission-config.bean.ts`
- Guards: `dataActionWithPermission()` wrapper
- Scopes: public, user, admin, owner
- Status: active, inactive, pending

### Deployment Architecture
- **Platform:** Vercel
- **Branch:** `main` (auto-deploys to visionarydirector.com)
- **Build:** Bun 1.3.2 with Next.js 15.4.0
- **Runtime:** Edge for API routes, Node for server components
- **CDN:** Vercel Edge Network (global)

## Key Environment Variables

### Required (Production)
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
POSTGRES_URL=postgresql://...
\`\`\`

### Optional (Enhanced Features)
\`\`\`env
WAVESPEED_API_KEY=          # 90+ AI models
KV_REST_API_URL=            # Upstash Redis for rate limiting
KV_REST_API_TOKEN=
STRIPE_SECRET_KEY=          # Payments
GEMINI_API_KEY=             # Legacy Lucy (deprecated)
\`\`\`

## Technical Debt & Known Issues

1. **mform API Keys Unencrypted:** localStorage keys in plaintext
2. **WaveSpeed Integration Incomplete:** SDK present but not wired to Lucy tools
3. **Lucy Model Selection:** Hardcoded, needs UI for user choice
4. **Rate Limiting Dependency:** Redis required for production limits
5. **Permission Config Validation:** Strict schema causes build warnings for legacy files

## Next Steps (Pending Approval)

See `docs/system/SYSTEM_REVIEW.md` for detailed recommendations.
