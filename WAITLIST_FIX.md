# Waitlist Signup Fix - Complete Guide

## Summary of Changes

The waitlist signup wasn't working due to **missing environment variables**. I've fixed the following:

### 1. ✅ Improved Error Handling (`lib/supabase/admin.ts`)
- Added fallback support for both `NEXT_PRIVATE_SUPABASE_SERVICE_KEY` and `SUPABASE_SERVICE_ROLE_KEY`
- Added clear error message if credentials are missing
- Better logging for debugging

### 2. ✅ Enhanced API Logging (`app/api/waitlist/route.ts`)
- More detailed console logs at each step
- Better error messages returned to client
- Includes error details in response for easier debugging

### 3. ✅ Better Frontend Error Display (`app/[locale]/(marketing)/waitlist/page.tsx`)
- Shows detailed error messages from server
- Distinguishes between network errors and server errors
- Better console logging for debugging

### 4. ✅ Created Documentation
- `ENV_SETUP_GUIDE.md` - Comprehensive environment setup instructions
- This file - Fix summary and testing guide

## How to Fix the Issue

### Option 1: Quick Fix (Local Development)

Create a `.env.local` file in your project root:

```bash
# Required for waitlist to work
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PRIVATE_SUPABASE_SERVICE_KEY=your-service-role-key
```

Get these values from your Supabase dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy the URL and keys

### Option 2: Production Fix (Vercel)

Add environment variables in Vercel:
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add the three variables above
5. Redeploy

## Database Setup

Make sure the waitlist table exists in your Supabase database:

1. Go to Supabase Dashboard → SQL Editor
2. Run the script from `scripts/create-waitlist-table.sql`:

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

## Testing the Fix

### Test Locally

1. **Start the dev server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Open the waitlist page:**
   ```
   http://localhost:3000/en/waitlist
   ```

3. **Open browser console** (F12) to see detailed logs

4. **Submit the form** with a test email

5. **Check the logs:**
   - Browser console should show: `[Waitlist] Submitting form:`, `[Waitlist] Response status: 200`
   - Server console should show: `[Waitlist] Signup attempt:`, `[Waitlist] Successfully inserted:`

6. **Verify in Supabase:**
   - Go to Supabase Dashboard → Table Editor
   - Check the `waitlist` table
   - Your test email should appear

### Expected Behavior

**Success:**
- Form submits without errors
- Success toast appears
- Redirects to success screen showing position in line
- Email appears in Supabase `waitlist` table

**If Environment Variables Missing:**
- Error toast: "Missing Supabase credentials..."
- Console shows clear error message
- Check that `.env.local` exists and has correct values

**If Table Doesn't Exist:**
- Error toast with database error
- Console shows "relation 'waitlist' does not exist"
- Run the SQL script in Supabase

## Troubleshooting

### Error: "Missing Supabase credentials"
**Cause:** Environment variables not set
**Fix:** Create `.env.local` with the required variables

### Error: "relation 'waitlist' does not exist"
**Cause:** Database table hasn't been created
**Fix:** Run `scripts/create-waitlist-table.sql` in Supabase SQL Editor

### Error: "Failed to join waitlist"
**Cause:** Various (check console for details)
**Fix:** 
- Check browser console for `[Waitlist]` logs
- Check server console for detailed error
- Verify Supabase project is active (not paused)
- Verify service role key has correct permissions

### Still Not Working?
1. Restart dev server after adding environment variables
2. Clear browser cache and reload
3. Check Supabase project status (might be paused)
4. Verify environment variable names match exactly (case-sensitive)
5. Check the detailed logs in console for specific error messages

## Files Changed

1. `lib/supabase/admin.ts` - Better error handling for missing credentials
2. `app/api/waitlist/route.ts` - Enhanced logging and error messages
3. `app/[locale]/(marketing)/waitlist/page.tsx` - Better error display
4. `ENV_SETUP_GUIDE.md` - New comprehensive setup guide
5. `WAITLIST_FIX.md` - This file

## Next Steps

After setting up environment variables:
1. Test the waitlist signup locally
2. Verify data appears in Supabase
3. Deploy to Vercel with environment variables configured
4. Test on production
5. Monitor logs for any issues



