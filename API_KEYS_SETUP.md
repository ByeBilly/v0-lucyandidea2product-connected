# API Keys Setup Guide

## Quick Start - Get Lucy Working NOW

You only need **ONE** API key to get started:

### WaveSpeed AI (Recommended - All-in-One)
\`\`\`bash
WAVESPEED_API_KEY="ws_..."
\`\`\`

Get your key at: https://wavespeed.ai

**This gives you:**
- ✅ 90+ AI models
- ✅ Image generation (Flux, Imagen4, HiDream)
- ✅ Video generation (Wan, Kling, Vidu, HunyuanVideo)
- ✅ Audio generation (MMAudio, DIA-TTS)
- ✅ 3D generation, upscaling, and more

## Platform Comparison

### Lucy Platform
**Uses YOUR keys** - You pay for API usage directly to WaveSpeed
**Users pay YOU** - Subscription fees for managed experience
**You configure**: WAVESPEED_API_KEY in environment variables

### mform Platform
**Uses USER keys** - Each user provides their own API keys
**Users pay providers** - Direct relationship with AI providers
**They configure**: Keys in their account settings UI

## WaveSpeed Models Available

### Image Generation
- Flux Dev / Flux Dev Ultra Fast
- Flux Pro Redux
- Imagen4
- HiDream I1 / E1
- SDXL
- Ghibli style
- Real-ESRGAN (upscaling)

### Video Generation
- Wan 2.1 (T2V, I2V, V2V) - 480p/720p
- Kling v1.6 / v2.0
- Vidu 2.0 (I2V, Reference-to-Video)
- HunyuanVideo (T2V, I2V)
- Minimax Video 01
- LTX Video v0.97
- Sky Reels v1
- Veo2 (T2V, I2V)

### Audio Generation
- MMAudio v2
- DIA-TTS

### 3D Generation
- Hunyuan3D v2 Multi-View

### Special Features
- LoRA training (Flux, SDXL, Wan)
- Video upscaling
- Frame interpolation
- Style transfer

## Optional: Vercel AI Gateway

Vercel AI Gateway is configured by default for text generation (chatbots):

\`\`\`typescript
import { generateText } from 'ai'

const { text } = await generateText({
  model: "openai/gpt-4o",  // or anthropic/claude-sonnet-4.5
  prompt: "Hello!"
})
\`\`\`

No API keys needed - Vercel handles routing to:
- OpenAI (GPT-4, GPT-4o, GPT-3.5)
- Anthropic (Claude 3.5 Sonnet, Opus, Haiku)
- Google Vertex AI
- AWS Bedrock
- xAI Grok

## Adding Keys to Vercel

### Via Vercel Dashboard
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `WAVESPEED_API_KEY` with your key
4. Redeploy

### Via Vercel CLI
\`\`\`bash
vercel env add WAVESPEED_API_KEY production
# Paste your key when prompted
vercel --prod
\`\`\`

## Cost Estimates

### WaveSpeed Pricing
Check current pricing at https://wavespeed.ai/pricing

Typical costs (as of 2024):
- Image generation: $0.01-0.05 per image
- Video generation: $0.10-0.50 per video
- Audio generation: $0.05-0.20 per minute

### Your Pricing Strategy
**Lucy**: Mark up WaveSpeed costs 2-3x for managed service
**mform**: Free to use, users pay providers directly

## Testing Without API Keys

The platform works without keys for testing:
- Homepage loads
- Waitlist accepts signups
- Lucy/mform UIs display
- Demo banners explain status

Add WAVESPEED_API_KEY to enable actual generation.

## Support & Credits

**WaveSpeed AI**: https://wavespeed.ai
**Idea2Product Template**: Built by WaveSpeed team
**Our Gratitude**: We honor their work by prominently featuring WaveSpeed and directing business their way
