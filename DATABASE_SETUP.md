# Database Setup - Connect Supabase to Vercel

## Problem
The waitlist table exists in Supabase, but Vercel can't connect to it because `POSTGRES_URL` isn't configured.

## Solution: Add Environment Variable

### Step 1: Get Supabase Connection String

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **Database** tab
5. Find **Connection string** section
6. Select **URI** format
7. Copy the connection string (looks like):
   \`\`\`
   postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   \`\`\`
8. Replace `[PASSWORD]` with your actual database password

### Step 2: Add to Vercel via v0 Sidebar

1. In v0 chat, look at the **left sidebar**
2. Click **Vars** (environment variables section)
3. Click **Add Variable**
4. Add:
   - **Key:** `POSTGRES_URL`
   - **Value:** Your connection string from Step 1
   - **Environment:** Check all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy

The deployment will happen automatically when you save the environment variable.

### Step 4: Test

1. Visit https://visionarydirector.com/waitlist
2. Fill out the form
3. Submit
4. You should see: "You're #X in line!"

## Verify Success

**Check Supabase:**
- Go to Supabase Dashboard
- Table Editor → waitlist table
- Your email should appear with a timestamp

**Check Vercel Logs:**
- Vercel Dashboard → Deployments → Latest → Functions
- Look for: `[v0] POSTGRES_URL configured: true`

## Troubleshooting

**Still failing?**
1. Check the connection string format is correct
2. Ensure password is URL-encoded (no special chars unescaped)
3. Try using Supabase "Transaction" pooler instead of "Session"
4. Check Vercel function logs for specific error messages
