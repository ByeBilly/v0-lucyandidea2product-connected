# Environment & Deployment Documentation

**Document Version:** 1.0
**Last Updated:** December 4, 2025 12:01 AEST

## Environment Variables

### Production (REQUIRED)

\`\`\`env
# Supabase (Database + Auth)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  (anon public key)
POSTGRES_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.co:6543/postgres

# Next.js
NEXT_PUBLIC_URL=https://visionarydirector.com
NODE_ENV=production
\`\`\`

### Optional (Enhanced Features)

\`\`\`env
# WaveSpeed SDK (90+ AI models)
WAVESPEED_API_KEY=ws_...

# Upstash Redis (Rate Limiting)
KV_REST_API_URL=https://xxxxx.upstash.io
KV_REST_API_TOKEN=xxxxx

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_ACCOUNT_ID=acct_...

# Unibee (Alternative Billing)
UNIBEE_API_KEY=...
UNIBEE_API_BASE_URL=https://api.unibee.top
UNIBEE_PRODUCT_ID=...

# Legacy (Deprecated)
GEMINI_API_KEY=AIza...  # Lucy v1, replaced by AI Gateway

# Suno Referral (Affiliate Link)
LUCY_SUNO_REFERRAL_URL=https://suno.com/invite/@bilingualbeats

# Development
LUCY_DEV_MODE=true  # Enables demo mode banner
LOG_LEVEL=debug     # Logging verbosity
\`\`\`

### Vercel-Managed (Auto-Injected)

\`\`\`env
VERCEL=1
VERCEL_URL=...
VERCEL_ENV=production|preview|development
VERCEL_GIT_COMMIT_SHA=...
VERCEL_GIT_COMMIT_REF=main
\`\`\`

## Build Configuration

### Package Manager

**Manager:** Bun 1.3.2
**Lock File:** bun.lockb
**Configuration:** `package.json` → `"packageManager": "bun@1.3.2"`

**Why Bun?**
- 3-5x faster installs than npm
- Built-in TypeScript execution
- Native ESM support
- Compatible with Node.js ecosystem

### Build Scripts

\`\`\`json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "db:setup": "npx tsx lib/db/setup.ts",
    "db:seed": "npx tsx lib/db/seed.ts",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
\`\`\`

### Build Process

\`\`\`
1. Vercel detects push to main branch
   ↓
2. Clone repository (ByeBilly/v0-lucyandidea2product-connected)
   ↓
3. Install dependencies with bun
   ↓
4. Run `bun run build`
   ↓
5. Next.js build:
   - Compile TypeScript → JavaScript
   - Bundle React components
   - Generate static pages
   - Optimize images
   - Create API routes
   ↓
6. Upload to Vercel Edge Network
   ↓
7. Deploy to visionarydirector.com
   ↓
8. Run post-deploy checks
   ↓
9. Update DNS (if needed)
   ↓
10. ✅ Deployment complete
\`\`\`

**Typical Build Time:** 2-4 minutes

## Deployment Configuration

### Vercel Project Settings

**Project Name:** v0-lucyandidea2product-connected
**Team:** william-turners-projects-70bfb52a
**Region:** Washington, D.C., USA (iad1)
**Framework:** Next.js 15.4.0

### Branch Deployment Strategy

\`\`\`
Repository: ByeBilly/v0-lucyandidea2product-connected

main branch
├─→ Production (visionarydirector.com)
│
develop branch (if exists)
├─→ Preview (v0-lucyandidea2product-connected-dev.vercel.app)
│
feature/* branches
└─→ Ephemeral Previews (v0-lucyandidea2product-git-<branch>.vercel.app)
\`\`\`

**Current State:**
- **Production Branch:** main
- **Auto-Deploy:** Enabled
- **Preview Branches:** All branches create previews

### Domain Configuration

**Primary Domain:** visionarydirector.com
**DNS Provider:** (External)
**SSL:** Vercel Auto-SSL (Let's Encrypt)

**DNS Records:**
\`\`\`
Type    Name    Value
A       @       76.76.21.21  (Vercel)
CNAME   www     cname.vercel-dns.com
\`\`\`

## Build Warnings & Resolutions

### Known False Positives

**Warning:** "Missing exports" from lib/types/* modules

**Cause:**
- v0 deployment checker is strict about idea2product imported files
- TypeScript compiles successfully
- Files exist and exports are correct
- Warning doesn't affect runtime

**Resolution:**
- Ignore warnings from lib/types/
- Focus on actual TypeScript compilation errors
- Monitor for real build failures

### Recent Build Fixes

**Issue 1:** TypeScript error in profile/plans/page.tsx
\`\`\`
Type 'undefined' is not assignable to type 'Element | null'
\`\`\`
**Fix:** Replaced `&&` with ternary operator returning explicit `null`

**Issue 2:** React Icons type error in admin/dashboard/page.tsx
\`\`\`
'FaUserCog' cannot be used as a JSX component
\`\`\`
**Fix:** Render icons directly as JSX instead of passing as props

**Issue 3:** Permission config validation failure
\`\`\`
Unexpected metadata object in auth.permission.json
\`\`\`
**Fix:** Removed metadata object, kept only permissions array

### Build Error Debugging

**If build fails:**

1. **Check Vercel Logs:**
   - Deployments tab → Click failed deployment
   - Scroll to bottom for actual error
   - Ignore "missing exports" warnings

2. **Test Locally:**
   \`\`\`bash
   bun run build
   \`\`\`

3. **Common Issues:**
   - TypeScript errors (check `tsconfig.json`)
   - Missing environment variables
   - Import path errors
   - Zod version mismatches (needs v4 for AI SDK)

## Deployment Verification

### Health Checks

**After Each Deployment:**

1. **Homepage Loads:**
   - https://visionarydirector.com
   - Quantum Dashboard renders
   - No console errors

2. **Lucy Works:**
   - https://visionarydirector.com/en/lucy
   - Chat interface loads
   - Can send message (rate limit permitting)

3. **Waitlist Works:**
   - https://visionarydirector.com/waitlist
   - Form submits
   - Position number shown

4. **Admin Access:**
   - https://visionarydirector.com/admin/dashboard
   - (Requires auth)
   - Waitlist entries visible

### Rollback Procedure

**If deployment breaks production:**

\`\`\`
1. Go to Vercel dashboard
2. Deployments tab
3. Find last working deployment
4. Click three dots → "Promote to Production"
5. Confirm promotion
6. Previous version restored immediately
\`\`\`

## Environment Sync Status

### Current State (Dec 4, 2025)

**✅ Configured:**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- POSTGRES_URL (via Supabase integration)

**⚠️ Not Configured (Optional Features Disabled):**
- WAVESPEED_API_KEY → Lucy tools return placeholder
- KV_REST_API_URL/TOKEN → Rate limiting gracefully degrades
- STRIPE_SECRET_KEY → Payments non-functional
- GEMINI_API_KEY → Deprecated, not needed

**✅ Working Without:**
- Lucy chat (via AI Gateway - no keys needed)
- Waitlist collection
- User authentication
- Homepage showcase

**🚨 Requires Keys for:**
- Image/video/audio generation (needs WaveSpeed)
- Rate limiting (needs Upstash Redis)
- Payments (needs Stripe)

### Adding Environment Variables

**Via Vercel Dashboard:**
1. Settings → Environment Variables
2. Key: `WAVESPEED_API_KEY`
3. Value: `ws_...`
4. Environments: Production, Preview, Development
5. Save
6. Auto-redeploy triggered

**Via Vercel CLI:**
\`\`\`bash
vercel env add WAVESPEED_API_KEY production
# Paste value when prompted
vercel --prod  # Trigger deployment
\`\`\`

## GitHub Repository Sync

### Current Repository

**URL:** https://github.com/ByeBilly/v0-lucyandidea2product-connected
**Owner:** ByeBilly
**Branch:** main
**Visibility:** Private

### Commit Workflow

\`\`\`
1. v0 generates code
   ↓
2. v0 commits to GitHub (auto)
   ↓
3. Vercel detects commit
   ↓
4. Triggers deployment
   ↓
5. Build runs
   ↓
6. If success → deploy to production
   If fail → keep previous version live
\`\`\`

### Recent Commits

\`\`\`
6351664  feat: add quantum dashboard and BYO-API calculator
86cdd06  feat: switch waitlist API to Supabase client
2f09af4  fix: resolve TypeScript errors in admin dashboard
d35054d  feat: switch Lucy to Vercel AI Gateway
...
\`\`\`

## Monitoring & Logs

### Log Locations

**Build Logs:**
- Vercel Dashboard → Deployments → Click deployment

**Runtime Logs:**
- Vercel Dashboard → Project → Logs tab
- Real-time streaming
- Filter by: Functions, Static, Edge

**Database Logs:**
- Supabase Dashboard → Logs tab
- Query performance
- Connection errors

### Common Log Patterns

**Success:**
\`\`\`
[v0] LucyChatInterface mounted with userId: xxx
[v0] Rate limit check: userId=xxx, action=chat, allowed=true
[v0] Lucy sendMessage success: chatId=xxx
\`\`\`

**Rate Limit:**
\`\`\`
[v0] Rate limit check: userId=xxx, action=imageGen, allowed=false, remaining=0/10
\`\`\`

**Error:**
\`\`\`
[v0] Lucy sendMessage error: Failed to generate text
[v0] Middleware error: ...
\`\`\`

## Deployment Checklist

**Before Pushing to main:**

- [ ] Code compiles locally (`bun run build`)
- [ ] TypeScript errors resolved
- [ ] Environment variables documented
- [ ] Breaking changes noted in commit message
- [ ] Database migrations (if any) tested

**After Deployment:**

- [ ] Homepage loads without errors
- [ ] Lucy chat functional
- [ ] Waitlist signup works
- [ ] No console errors in production
- [ ] SSL certificate valid

## Current Deployment Status

**Last Successful Deploy:**
- Commit: 6351664
- Time: December 4, 2025 ~11:30 AEST (estimated)
- Duration: ~2 minutes
- Status: ✅ LIVE

**Production URL:** https://visionarydirector.com
**Preview URLs:** Auto-generated per branch

**Issues:**
- None currently
- False positive warnings about missing exports (ignore)

**Next Actions:**
- Add WAVESPEED_API_KEY to enable generation
- Add KV Redis for rate limiting
- Monitor user signups via waitlist
