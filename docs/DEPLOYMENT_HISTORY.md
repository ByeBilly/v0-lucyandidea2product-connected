# Deployment History & Build Log

## Purpose
This file tracks all deployment attempts, fixes, and system changes. It is append-only - never delete entries so we have a complete audit trail.

---

## Latest Deployment Status

**Current Live Site:** OLD homepage still showing (AI Generator with navigation)
**Expected:** New cinematic black background marketing page with inline waitlist form
**Code Status:** New code committed to repository but not deployed successfully

---

## Deployment Log

### 2025-12-04 - Waitlist Storage Hardening & Model Selection Upgrade

**Goal:** Ensure the landing-page waitlist truly persists to Supabase in all environments and document the new Claude-ready chat controls.

**Changes Made:**
- Added `.env.local` bootstrap plus documentation for `NEXT_PRIVATE_SUPABASE_SERVICE_KEY` / `SUPABASE_SERVICE_ROLE_KEY`.
- Refactored `app/api/waitlist/route.ts` to normalize input, short-circuit duplicates, and always prefer the service role key (falls back to anon only if necessary).
- Extended Lucy’s server action to read `process.env.LUCY_DEFAULT_MODEL`, enabling Anthropic Claude (or any other AI Gateway model) via configuration instead of code edits.
- Regenerated `lib/build-time.ts` using the refreshed CommonJS script and rendered the timestamp with a shared `Intl.DateTimeFormat` to eliminate hydration drift.
- Expanded `API_KEYS_SETUP.md`, `BUILD_TIMESTAMP.md`, and `CURRENT_BUILD_STATUS.md` with precise Supabase + Claude instructions.

**Validation:**
1. `Invoke-RestMethod -Uri http://localhost:3002/api/waitlist -Method Post -Body '{"email":"test@example.com","name":"Test User"}' -ContentType 'application/json'` → success + position numbers.
2. `mcp_supabase_execute_sql("select email,name,status from public.waitlist order by created_at desc limit 5")` → confirmed pending records.
3. Manual reload of landing page (bun dev, port 3002) shows clean hydration and waitlist submission to Supabase.

**Outstanding Items:**
- Permission merge watcher is still failing (`app/actions/auth/auth.permission.json`); needs separate repair.
- Production deploy still pending until cinematic homepage replaces the legacy public site.

**Files Modified (non-exhaustive):**
- `app/api/waitlist/route.ts`
- `app/actions/lucy/send-message.ts`
- `app/[locale]/page.tsx`
- `scripts/generate-build-time.js`, `lib/build-time.ts`
- `API_KEYS_SETUP.md`, `docs/BUILD_TIMESTAMP.md`, `docs/CURRENT_BUILD_STATUS.md`

---

### 2025-12-03 - Cinematic Homepage Deployment Attempt

**Goal:** Replace generic homepage with cinematic marketing page at `/`, move original to `/builder`

**Changes Made:**
- Created new `app/[locale]/page.tsx` with cinematic black background design
- Moved original homepage content to `app/[locale]/builder/page.tsx`
- Inline waitlist form with name + email fields saving to Supabase
- Zero navigation bar on marketing page for pure conversion focus
- Build timestamp automation added

**Build Errors Encountered:**
1. ✅ FIXED: React Icons TypeScript error (FaUserCog) - replaced with Lucide icons
2. ✅ FIXED: Permission configuration validation failure - added missing `permissionScope` fields
3. ⚠️ IN PROGRESS: Deployment not reaching production despite code changes

**Root Cause Analysis:**
- Code is in repository but live site shows old version
- Indicates build failure or cache issue
- v0 showing false positive "missing exports" warnings for idea2product files

**Next Steps:**
- Verify admin dashboard build succeeds with Lucide icons
- Clear any build cache preventing deployment
- Force fresh deployment once build passes

**Files Changed:**
- `app/[locale]/page.tsx` - New cinematic marketing page
- `app/[locale]/builder/page.tsx` - Original content preserved
- `app/[locale]/admin/dashboard/page.tsx` - Fixed icon imports
- `app/actions/auth/auth.permission.json` - Added permissionScope fields
- `docs/DEPLOYMENT_HISTORY.md` - This file (NEW)

### 2025-12-03 - Prebuild Script & Permission Config Fix

**Changes Made:**
1. **Prebuild Script Modernization**
   - Converted `scripts/generate-build-time.js` from CommonJS to ES modules
   - Now generates `lib/build-time.ts` instead of `.env.production` file
   - Avoids Vercel build environment file system restrictions
   - Homepage imports BUILD_TIME directly from generated module

2. **Lucy Permission Configuration**
   - Added missing `permissionScope` field to all entries in `app/actions/lucy/lucy.permission.json`
   - Page permissions: `permissionScope: "page"`
   - Action permissions: `permissionScope: "action"`  
   - Component permissions: `permissionScope: "component"`
   - Matches validation schema requirements

3. **Homepage Build Time Import**
   - Changed from `process.env.NEXT_PUBLIC_BUILD_TIME` to `import { BUILD_TIME } from "@/lib/build-time"`
   - More reliable, eliminates environment variable dependency
   - Auto-updates on every build via prebuild script

**Expected Resolution:**
- Prebuild script executes successfully in Vercel's Node environment
- Permission config validation passes merge-permissions script
- TypeScript build completes without errors
- New cinematic homepage deploys to production

**Files Modified:**
- `scripts/generate-build-time.js` - ES module conversion
- `lib/build-time.ts` - Generated build timestamp module
- `app/actions/lucy/lucy.permission.json` - Added permissionScope fields
- `app/[locale]/page.tsx` - Import BUILD_TIME instead of env var

---

## Known Issues & Workarounds

### False Positive Warnings
The deployment checker reports missing exports from idea2product codebase files. These are FALSE POSITIVES and can be ignored:
- lib/types/auth/user-context.bean
- lib/types/permission/*
- lib/db/crud/*
- lib/cache/cache.service
- etc.

These files exist and have correct exports. The warnings don't affect actual builds.

### Build Cache Issues
Vercel occasionally uses stale cache when package manager changes. Message: "Skipping build cache since Package Manager changed from 'bun' to 'pnpm'"

**Workaround:** Force fresh build by clearing cache or manual redeploy

---

## Environment Variables

**Currently Configured:**
- `NEXT_PUBLIC_SUPABASE_URL` - ✅ Set
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - ✅ Set
- `NEXT_PUBLIC_BUILD_TIME` - ⚠️ Should auto-generate via prebuild script

**Missing (Optional):**
- `UPSTASH_REDIS_REST_URL` - For rate limiting (graceful degradation without it)
- `UPSTASH_REDIS_REST_TOKEN` - For rate limiting
- `WAVESPEED_API_KEY` - For mform multi-API access

---

## Architecture Decisions

### Homepage Routing Strategy
- `/` → Pure marketing/waitlist capture (NO nav bar)
- `/builder` → Original idea2product AI generator (WITH nav bar)
- `/lucy` → Lucy AI chat (WITH nav bar)
- `/mform` → mform interface (WITH nav bar)

**Rationale:** Single-purpose marketing funnel at root, preserve full platform functionality at subpaths

### Waitlist Integration
- Form submits to `/api/waitlist` (existing endpoint)
- Saves to Supabase `waitlist` table with name + email
- Returns position number for social proof
- Duplicate emails handled gracefully

---

## Notes for Future Engineers

1. **Don't Delete This File** - It's an append-only audit trail
2. **Add Entries Below** - Document every deployment attempt, fix, or issue
3. **Timestamp Everything** - Use ISO format or clear date headers
4. **Include Root Cause** - Explain WHY things broke, not just WHAT was fixed
5. **Link to Code** - Reference specific files/lines when relevant

---

## User Notes Section
*Reserved for project owner to add observations, business context, or additional documentation*

[Add your notes here - this section will never be overwritten]

---

## False Positive Analysis - December 3, 2025

**Issue:** v0 deployment checker reports 40+ "missing exports" warnings

**Investigation Results:**
All reported exports actually exist in the codebase:
- `UserContext` exported from lib/types/auth/user-context.bean.ts:8 ✓
- `PermissionConfigDto` exported from lib/types/permission/permission-config.dto.ts:48 ✓
- `TaskStatus` exported from lib/types/task/enum.bean.ts:1 ✓
- All other lib/ and db/crud/ files verified with GrepRepo ✓

**Root Cause:** v0's static analysis cannot traverse the imported idea2product template's complex architecture

**Impact:** These are cosmetic warnings only - they do NOT prevent deployment

**Action:** Ignore these warnings, focus on actual TypeScript build errors in Vercel logs

---
