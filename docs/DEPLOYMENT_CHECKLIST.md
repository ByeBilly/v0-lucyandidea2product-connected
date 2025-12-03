# Deployment Checklist - visionarydirector.com

## Pre-Deployment Security Verification

### ✅ Authentication Layer
- [x] Supabase middleware configured
- [x] Session cache with 30-min TTL
- [x] Route permissions (public/admin)
- [x] Permission guards on all server actions

### ✅ Rate Limiting System
- [x] Redis-based rate limiter created
- [x] Rate limits added to all Lucy actions:
  - [x] sendMessage (20/min)
  - [x] lucyGenerateImage (10/min)
  - [x] lucyGenerateVideo (3/min)
  - [x] lucyGenerateAudio (10/min)
- [x] Graceful degradation if Redis unavailable

### ⚠️ Environment Variables Required

#### Supabase (Authentication & Database)
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://yhrcxltvchqzbuqrqjgt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_KEY_HERE]
\`\`\`
**Status**: ✅ Added to Vercel

#### Upstash Redis (Rate Limiting)
\`\`\`env
KV_REST_API_URL=[YOUR_UPSTASH_REDIS_URL]
KV_REST_API_TOKEN=[YOUR_UPSTASH_REDIS_TOKEN]
\`\`\`
**Status**: ⚠️ NEEDS TO BE ADDED

**How to get Redis credentials:**
1. Go to https://console.upstash.com/
2. Create account or log in
3. Click "Create Database"
4. Choose "Global" for worldwide low latency
5. Copy the "REST API" credentials:
   - UPSTASH_REDIS_REST_URL → Set as `KV_REST_API_URL`
   - UPSTASH_REDIS_REST_TOKEN → Set as `KV_REST_API_TOKEN`
6. Add both to Vercel environment variables
7. Redeploy

**Note**: Rate limiting will work in "graceful degradation" mode without Redis (allows all requests with warning logs), but should be configured for production.

#### AI API Keys (Lucy Features)
\`\`\`env
GEMINI_API_KEY=[YOUR_GEMINI_KEY]
OPENAI_API_KEY=[YOUR_OPENAI_KEY]
ANTHROPIC_API_KEY=[YOUR_ANTHROPIC_KEY]
\`\`\`
**Status**: ⚠️ Verify these are set

### 🔧 Build Fixes Applied
- [x] Fixed TypeScript error in profile/plans/page.tsx (ternary operator)
- [x] Fixed React Icons type error in admin/dashboard/page.tsx (React.createElement)
- [x] Upgraded Zod to v4.1.13 (AI SDK compatibility)
- [x] Set packageManager to "bun@1.3.2" in package.json

### 📊 Monitoring Setup
- [ ] Add log aggregation (Vercel Analytics)
- [ ] Set up alert for rate limit violations
- [ ] Monitor API costs per user
- [ ] Track authentication failures

### 🚀 Post-Deployment Testing

#### Test Waitlist
1. Visit https://visionarydirector.com/waitlist
2. Submit email
3. Verify entry in Supabase `waitlist` table
4. Check position number displays

#### Test Lucy (Requires Auth)
1. Visit https://visionarydirector.com/en/lucy
2. Log in via https://visionarydirector.com/login
3. Send chat message (rate limit: 20/min)
4. Generate image (rate limit: 10/min)
5. Verify rate limits trigger after threshold

#### Test Rate Limiting
\`\`\`bash
# Use this script to test rate limits
for i in {1..25}; do
  curl -X POST https://visionarydirector.com/api/lucy/chat \
    -H "Authorization: Bearer <token>" \
    -d '{"text": "Test '$i'"}'
done
# Should see rate limit error after 20 requests
\`\`\`

### 🔐 Security Recommendations

#### Immediate (Before Public Launch)
1. **Add Redis for rate limiting** - Critical for API cost control
2. **Enable Unibee credit system** - Replace hardcoded 100 credits
3. **Set up API cost alerts** - Monitor spending per user
4. **Review admin permissions** - Ensure only system_admin can access /admin/*

#### Post-Launch (Within 1 Week)
1. **Implement BYO-API** - Let users bring their own API keys
2. **Add spending limits** - Daily/monthly caps per user
3. **Enable audit logging** - Track all generation requests
4. **Set up backup auth** - Email + password fallback

#### Long-term (Within 1 Month)
1. **Add IP-based rate limiting** - DDoS protection
2. **Implement content filtering** - Prevent abuse
3. **Enable 2FA** - Optional for high-value accounts
4. **Set up automated backups** - Database snapshots

### 📝 Known Issues & Workarounds

#### Missing Export Warnings
**Issue**: v0 deployment checker shows warnings about missing exports  
**Status**: False positives - builds succeed despite warnings  
**Action**: Ignore these warnings, they don't affect production

#### Redis Not Configured
**Issue**: Rate limiting currently in graceful degradation mode  
**Status**: System allows all requests with warning logs  
**Action**: Add Upstash Redis credentials (see above)

#### Hardcoded Credits
**Issue**: Users get 100 credits regardless of subscription  
**Status**: Temporary - awaiting Unibee integration  
**Action**: Integrate Unibee billing in Phase 2

### ✅ Deployment Ready Status

**Current State**: ✅ READY TO DEPLOY (with graceful degradation)

**What works now:**
- Authentication & session management
- Waitlist with Supabase
- Lucy chat with permission guards
- Rate limiting (graceful mode)
- All generation features (image/video/audio)

**What needs configuration:**
- Upstash Redis (for full rate limiting)
- AI API keys verification
- Unibee credit system

**Recommendation**: Deploy now, add Redis within 24 hours before announcing publicly.

---

**Last Updated**: 2025-12-03  
**Deployment Engineer**: v0 AI Assistant  
**Platform**: Vercel + Supabase + Upstash
