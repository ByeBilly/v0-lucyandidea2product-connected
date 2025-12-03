# Automated Build Timestamp System

## Overview
The homepage automatically displays the last deployment time, updated with every build.

## How It Works

### 1. Build-Time Generation
- **Script**: `scripts/generate-build-time.js`
- **Trigger**: Runs automatically before every build via `prebuild` npm script
- **Output**: Writes `NEXT_PUBLIC_BUILD_TIME` to `.env.production`

### 2. Homepage Display
- **File**: `app/[locale]/page.tsx`
- **Location**: Footer section at bottom of page
- **Format**: "Last Build: Dec 3, 2025, 10:30 AM PST"

### 3. Automation Flow
\`\`\`
Deployment Triggered
    ↓
npm run build
    ↓
prebuild script runs
    ↓
generate-build-time.js creates timestamp
    ↓
NEXT_PUBLIC_BUILD_TIME set in environment
    ↓
Next.js build embeds timestamp
    ↓
Homepage renders with current build time
\`\`\`

## Environment Variable

**Name**: `NEXT_PUBLIC_BUILD_TIME`
- **Type**: ISO 8601 timestamp string
- **Example**: `2025-12-03T18:30:45.123Z`
- **Scope**: Public (client-side accessible)
- **Generated**: Automatically at build time
- **Format on Page**: Locale-formatted human-readable timestamp

## Files Modified

1. **app/[locale]/page.tsx**
   - Added `buildTime` constant reading from `process.env.NEXT_PUBLIC_BUILD_TIME`
   - Added timestamp display in footer section
   - Falls back to current time if env var not set (development mode)

2. **scripts/generate-build-time.js**
   - Creates/updates `.env.production` with current timestamp
   - Preserves other environment variables
   - Runs before every production build

3. **package.json**
   - Added `prebuild` script hook
   - Automatically executes timestamp generation

## Vercel Deployment

The system works automatically on Vercel:
1. Code pushed to GitHub
2. Vercel detects changes
3. Build process starts
4. `prebuild` hook runs → timestamp generated
5. Next.js builds with embedded timestamp
6. Homepage displays new deployment time

## Local Development

In development mode (`npm run dev`):
- No prebuild script runs
- Timestamp falls back to page load time
- Build timestamp only appears in production builds

## Testing

To test locally:
\`\`\`bash
npm run build
npm start
# Visit http://localhost:3000 and check footer
\`\`\`

## Benefits

- **Transparency**: Users see when platform was last updated
- **Trust**: Shows active development and maintenance
- **Zero Maintenance**: Fully automated, no manual updates needed
- **Accurate**: Reflects actual deployment time, not code commit time
