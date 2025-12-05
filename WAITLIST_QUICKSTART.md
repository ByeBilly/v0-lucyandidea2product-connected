# Waitlist Signup - Quick Start Guide

## Problem
Your waitlist signup isn't working because **environment variables are missing**.

## Quick Fix (3 Steps)

### Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project  
3. Click **Settings** → **API**
4. Copy these three values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (long string starting with `eyJ...`)

### Step 2: Create `.env.local` File

Create a file named `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PRIVATE_SUPABASE_SERVICE_KEY=your-service-role-key-here
```

Replace the values with what you copied in Step 1.

### Step 3: Create Database Table

1. Go to Supabase Dashboard → **SQL Editor**
2. Copy and run this SQL:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
```

## Test It

```bash
# Check environment variables
npm run check-env

# Start dev server
npm run dev
```

Visit http://localhost:3000/en/waitlist and try signing up!

## For Production (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add the same three variables from Step 2
5. Click **Save** (auto-redeploys)

## Need Help?

- ✅ **Detailed Setup:** See `ENV_SETUP_GUIDE.md`
- ✅ **Full Documentation:** See `WAITLIST_FIX.md`
- ✅ **Check Environment:** Run `npm run check-env`

## What Was Fixed?

1. ✅ Better error messages when credentials are missing
2. ✅ Improved logging for debugging
3. ✅ Support for alternative environment variable names
4. ✅ Comprehensive documentation
5. ✅ Environment check script

That's it! Your waitlist should work now. 🎉

