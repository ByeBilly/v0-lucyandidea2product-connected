# Deployment Guide for visionarydirector.com

## Platform Architecture

visionarydirector.com is a multi-platform AI creation hub powered by:
- **WaveSpeed AI** - 90+ AI models (Flux, Wan, Kling, Vidu, MMAudio, etc.)
- **Vercel AI Gateway** - Centralized AI provider access (OpenAI, Anthropic, etc.)
- **Supabase** - PostgreSQL database + Authentication
- **Next.js 15** - App Router with internationalization

## Two Platforms

### Lucy (Managed Service)
- Uses YOUR API keys (configured in environment variables)
- Premium managed experience
- Users pay subscription fees
- No API key management for users

### mform (User-Controlled)
- Users bring their own API keys
- Full transparency and control
- Pay-as-you-go directly to providers
- Revolutionary democratization model

## Required Environment Variables

### Core Platform
\`\`\`bash
# Database (Supabase)
POSTGRES_URL="postgresql://..."           # Supabase connection string
NEXT_PUBLIC_SUPABASE_URL="https://..."    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."       # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY="..."           # Supabase service role key

# For development redirect
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL="http://localhost:3000"
\`\`\`

### Lucy Platform (Your API Keys)
\`\`\`bash
# WaveSpeed AI (Primary - 90+ models)
WAVESPEED_API_KEY="ws_..."               # Get from wavespeed.ai

# Vercel AI Gateway (Optional - for text generation)
# These are automatically configured through Vercel AI Gateway
# No individual API keys needed - uses gateway routing
\`\`\`

### Optional Integrations
\`\`\`bash
# If you want direct provider access in mform:
NEXT_PUBLIC_GEMINI_API_KEY=""            # Google Gemini
NEXT_PUBLIC_OPENAI_API_KEY=""            # OpenAI
NEXT_PUBLIC_ANTHROPIC_API_KEY=""         # Anthropic
NEXT_PUBLIC_REPLICATE_API_KEY=""         # Replicate
NEXT_PUBLIC_ELEVENLABS_API_KEY=""        # ElevenLabs
\`\`\`

## Setup Instructions

### 1. Database Setup (Required)

Run these SQL scripts in order in Supabase SQL Editor:

\`\`\`bash
# From the scripts folder:
1. create-waitlist-table.sql       # Waitlist functionality
2. (Other migration scripts as needed)
\`\`\`

### 2. Get WaveSpeed API Key

1. Visit https://wavespeed.ai
2. Create an account
3. Generate API key
4. Add to Vercel environment variables: `WAVESPEED_API_KEY`

### 3. Configure Supabase

1. Create project at supabase.com
2. Get connection string from Settings > Database
3. Get API keys from Settings > API
4. Add all Supabase variables to Vercel

### 4. Deploy to Vercel

\`\`\`bash
# Connect your repository to Vercel
vercel

# Or deploy directly
vercel --prod
\`\`\`

### 5. Domain Configuration

1. Add visionarydirector.com to Vercel project
2. Update DNS records as instructed
3. Wait for SSL certificate

## Current Status

### ✅ Completed
- Homepage with waitlist
- Features comparison page
- Help center & FAQ
- Gallery system (ready for content)
- Lucy platform UI (needs API key)
- mform platform UI with multi-API support
- Database schema
- Authentication system
- WaveSpeed SDK integration

### 🔧 Needs Configuration
- WAVESPEED_API_KEY for Lucy to work
- Database URL for persistence
- Supabase auth for user login

### 🚀 Ready to Build
- Email notifications for waitlist
- Admin dashboard for waitlist management
- Actual generation in Lucy (once API key added)
- User API key storage in mform
- Payment integration (Stripe already scaffolded)

## Testing

### Without API Keys
The platform loads and is fully navigable. Demo banners inform users of development status.

### With WaveSpeed API Key
Lucy can generate:
- Images (Flux Dev Ultra Fast)
- Videos (Wan 2.1, Kling, Vidu)
- Audio (MMAudio, DIA-TTS)
- 90+ other models

### With Database
- Waitlist signups work
- User authentication works
- Generation history persists
- Gallery populates with real content

## Attribution

This platform is built on **idea2product** by the WaveSpeed AI team, which provides:
- Complete SaaS template
- WaveSpeed SDK with 90+ AI models
- Authentication & billing infrastructure
- Admin dashboard
- Task management system

We honor this foundation by prominently featuring WaveSpeed AI and directing users to their service.

## Support

For deployment issues:
- Check Vercel build logs
- Verify all environment variables are set
- Ensure database migrations have run
- Contact support@visionarydirector.com
