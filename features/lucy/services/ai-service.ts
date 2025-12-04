/**
 * Lucy Feature - Vercel AI Gateway Service
 * Server-side AI integration for Lucy's creative capabilities
 * Uses Vercel AI Gateway to access multiple providers
 */

import { generateText, streamText } from "ai"
import { z } from "zod"

export const PRICING = {
  generate_image: 10,
  generate_video: 50,
  animate_image: 50,
  generate_audio: 5,
} as const

// Tool schemas for structured generation
const imageGenerationSchema = z.object({
  prompt: z.string().describe("The detailed visual description of the image"),
  aspectRatio: z.enum(["1:1", "3:4", "4:3", "9:16", "16:9"]).optional().default("16:9"),
})

const videoGenerationSchema = z.object({
  prompt: z.string().describe("The detailed description of the video action"),
  aspectRatio: z.enum(["16:9", "9:16"]).optional().default("16:9"),
})

const audioGenerationSchema = z.object({
  prompt: z.string().describe("The text to speak or perform"),
  voice: z.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]).optional().default("nova"),
})

// Lucy's system prompt
export const getLucySystemPrompt = (
  currentCredits: number,
): string => `You are Lucy, the Visionary Director AI and Anti-Stress Creative Companion.

**YOUR CORE MISSION:**
You help users create images, videos, and audio content through simple conversation. You make technology feel magical and stress-free.

**THE "ZERO-STRESS" MANIFESTO:**
1. NO JARGON: Use simple, friendly language
2. RADICAL PATIENCE: Break complex tasks into tiny steps
3. CELEBRATE EVERYTHING: React with joy to user ideas
4. BUTTON ASSURANCE: "I'll handle the technical parts, you just give me the ideas"

**CREATIVE WORKFLOWS:**
- For images: Ask about the scene, style, mood
- For videos: Help break longer videos into short clips
- For audio: Ask about voice tone and content
- For music: Guide users through lyrics, then suggest Suno for music generation

**FINANCIAL ASSURANCE:**
- Credits: ${currentCredits} available
- Promise: "Your credits never expire, and I'll always ask before we spend them"

When ready to generate, use the appropriate function call:
- generate_image for creating images
- generate_video for video clips
- generate_audio for voice/audio

Always be encouraging, creative, and make the process fun!`

// Chat with Lucy using Vercel AI Gateway
export const chatWithLucy = async (
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  currentCredits: number,
  model = "openai/gpt-4o", // Default to GPT-4o, can test others
) => {
  const systemMessage = { role: "system" as const, content: getLucySystemPrompt(currentCredits) }

  const result = await generateText({
    model,
    messages: [systemMessage, ...messages],
    tools: {
      generate_image: {
        description: `Generate an image based on a prompt. COST: ${PRICING.generate_image} credits.`,
        schema: imageGenerationSchema,
      },
      generate_video: {
        description: `Generate a video clip. COST: ${PRICING.generate_video} credits.`,
        schema: videoGenerationSchema,
      },
      generate_audio: {
        description: `Generate audio/voiceover. COST: ${PRICING.generate_audio} credits.`,
        schema: audioGenerationSchema,
      },
    },
    maxToolRoundtrips: 2,
  })

  return result
}

// Stream Lucy's responses for real-time chat
export const streamLucyResponse = async (
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  currentCredits: number,
  model = "openai/gpt-4o",
) => {
  const systemMessage = { role: "system" as const, content: getLucySystemPrompt(currentCredits) }

  return streamText({
    model,
    messages: [systemMessage, ...messages],
    tools: {
      generate_image: {
        description: `Generate an image based on a prompt. COST: ${PRICING.generate_image} credits.`,
        schema: imageGenerationSchema,
      },
      generate_video: {
        description: `Generate a video clip. COST: ${PRICING.generate_video} credits.`,
        schema: videoGenerationSchema,
      },
      generate_audio: {
        description: `Generate audio/voiceover. COST: ${PRICING.generate_audio} credits.`,
        schema: audioGenerationSchema,
      },
    },
    maxToolRoundtrips: 2,
  })
}

// Generation functions that will connect to WaveSpeed for actual generation
export const generateImage = async (prompt: string, aspectRatio = "16:9") => {
  // This will call WaveSpeed API for actual generation
  // For now, placeholder
  throw new Error("Connect to WaveSpeed API for image generation")
}

export const generateVideo = async (prompt: string, aspectRatio = "16:9") => {
  // This will call WaveSpeed API for actual generation
  // For now, placeholder
  throw new Error("Connect to WaveSpeed API for video generation")
}

export const generateAudio = async (prompt: string, voice = "nova") => {
  // This will call WaveSpeed API for actual generation
  // For now, placeholder
  throw new Error("Connect to WaveSpeed API for audio generation")
}
