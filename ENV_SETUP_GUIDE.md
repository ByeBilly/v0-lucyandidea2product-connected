# Environment Variables Setup Guide

## Problem: Waitlist Signup Not Working

The waitlist signup is failing because the required Supabase environment variables are not configured.

## Solution: Configure Environment Variables

### For Local Development

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
# Get these from https://supabase.com/dashboard -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PRIVATE_SUPABASE_SERVICE_KEY=your-service-role-key-here

# Alternative naming (for compatibility)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database Connection (Optional - for Drizzle ORM)
POSTGRES_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Development redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### For Production (Vercel)

Add the same variables in your Vercel project settings:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate values
5. Redeploy your application

## Getting Your Supabase Credentials

### Step 1: Get API Keys

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Project Settings** (gear icon)
4. Click **API** tab
5. Copy the following:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `NEXT_PRIVATE_SUPABASE_SERVICE_KEY`

### Step 2: Get Database Connection String (Optional)

1. In Supabase Dashboard, go to **Project Settings**
2. Click **Database** tab
3. Find **Connection string** section
4. Select **URI** format
5. Copy the connection string
6. Replace `[PASSWORD]` with your actual database password
7. Use for `POSTGRES_URL`

## Verify Setup

After adding the environment variables:

1. Restart your development server if running locally
2. Visit `/waitlist` page
3. Try submitting the form
4. Check the console for any error messages

## Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure all required environment variables are set
- Verify the variable names match exactly (case-sensitive)
- Restart your development server after adding variables

### Error: "Failed to join waitlist"
- Check that the `waitlist` table exists in your Supabase database
- Run the SQL script: `scripts/create-waitlist-table.sql`
- Verify your service role key has the correct permissions

### Still not working?
- Check browser console for detailed error messages
- Check server logs for backend errors
- Verify your Supabase project is active and not paused



