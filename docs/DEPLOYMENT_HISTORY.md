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
