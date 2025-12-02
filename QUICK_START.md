# Quick Start Guide

## Get Your Platform Running in 5 Minutes

### Step 1: Add WaveSpeed API Key
1. Get API key from https://wavespeed.ai
2. Go to https://vercel.com/dashboard
3. Select your project → Settings → Environment Variables
4. Add: `WAVESPEED_API_KEY` = `your_key_here`
5. Redeploy (automatic)

### Step 2: Create Database Tables
1. Go to https://supabase.com/dashboard
2. Select your project → SQL Editor
3. Run this script:

\`\`\`sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Step 3: Test Everything
- Homepage: https://visionarydirector.com
- Waitlist: https://visionarydirector.com/waitlist
- Lucy: https://visionarydirector.com/lucy
- mform: https://visionarydirector.com/mform
- Admin: https://visionarydirector.com/admin/waitlist

### Step 4: Invite Your First Users
Share waitlist link on:
- Twitter
- LinkedIn
- Product Hunt (coming soon list)
- Reddit (r/artificial, r/SideProject)
- Your personal network

---

## What Each Platform Does

### Lucy (West Wing - Boutique AI)
Your creative AI assistant using Vercel AI Gateway:
- Conversational interface
- Image, video, audio generation via WaveSpeed
- Uses YOUR API keys
- Premium, managed experience

### mform (North/East Wings - DIY Platform)
Multi-AI creation tool where users bring their own keys:
- Support for 5+ AI providers
- User-controlled API keys
- Asset library with management
- Full transparency and control

### WaveSpeed (Southern Wing - Pre-built Services)
90+ AI models ready to use:
- Flux image generation
- Wan 2.1 video creation
- Audio generation
- Homepage demo showcase

---

## Need Help?

Check:
- Full documentation: `LAUNCH_READY.md`
- API setup: `API_KEYS_SETUP.md`
- Deployment: `DEPLOYMENT.md`

You're ready to launch! 🎉
