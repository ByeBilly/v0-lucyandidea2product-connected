/**
 * mform Feature - Make Form Constants
 * Configuration for user-provided API key creative forms
 */

import type { ApiProviderConfig } from "./types"

export const MFORM_NAME = "mform"
export const MFORM_TAGLINE = "Make Something Amazing"
export const MFORM_DESCRIPTION = "Your creative AI assistant - bring your ideas to life with your own API keys"

export const API_PROVIDERS: Record<string, ApiProviderConfig> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    description: "Chat, images, video, and audio generation",
    apiKeyPlaceholder: "AIza...",
    getApiKeyUrl: "https://aistudio.google.com/apikey",
    capabilities: ["chat", "image", "video", "audio"],
    models: {
      chat: ["gemini-2.0-flash-exp", "gemini-1.5-pro"],
      image: ["gemini-3-pro-image-preview"],
      video: ["veo-3.1-fast-generate-preview"],
      audio: ["gemini-2.5-flash-preview-tts"],
    },
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4 chat and DALL-E image generation",
    apiKeyPlaceholder: "sk-...",
    getApiKeyUrl: "https://platform.openai.com/api-keys",
    capabilities: ["chat", "image"],
    models: {
      chat: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
      image: ["dall-e-3", "dall-e-2"],
    },
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Advanced reasoning and creative writing",
    apiKeyPlaceholder: "sk-ant-...",
    getApiKeyUrl: "https://console.anthropic.com/settings/keys",
    capabilities: ["chat"],
    models: {
      chat: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-sonnet-20240229"],
    },
  },
  replicate: {
    id: "replicate",
    name: "Replicate",
    description: "Flux, Stable Diffusion, music, and video models",
    apiKeyPlaceholder: "r8_...",
    getApiKeyUrl: "https://replicate.com/account/api-tokens",
    capabilities: ["image", "video", "audio"],
    models: {
      image: ["flux-schnell", "flux-dev", "sdxl"],
      video: ["stable-video-diffusion"],
      audio: ["musicgen", "riffusion"],
    },
  },
  elevenlabs: {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "High-quality voice synthesis and cloning",
    apiKeyPlaceholder: "el_...",
    getApiKeyUrl: "https://elevenlabs.io/app/settings/api-keys",
    capabilities: ["audio"],
    models: {
      audio: ["eleven_multilingual_v2", "eleven_turbo_v2"],
    },
  },
}

// Pricing in credits
export const PRICING = {
  generate_image: 10,
  generate_video: 50,
  animate_image: 50,
  generate_audio: 5,
} as const

// Voice options for audio generation
export const VOICE_OPTIONS = [
  { value: "Puck", label: "Puck (Neutral/Fun)" },
  { value: "Charon", label: "Charon (Deep)" },
  { value: "Kore", label: "Kore (Soft)" },
  { value: "Fenrir", label: "Fenrir (Intense)" },
] as const

// Aspect ratio options
export const ASPECT_RATIOS = {
  image: ["1:1", "3:4", "4:3", "9:16", "16:9"],
  video: ["16:9", "9:16"],
} as const

// Default initial credits for new users
export const DEFAULT_INITIAL_CREDITS = 500

// Suno referral URL
export const SUNO_REFERRAL_URL = process.env.LUCY_SUNO_REFERRAL_URL || "https://suno.com/invite/@bilingualbeats"

// Storage paths
export const STORAGE_PATHS = {
  images: "lucy/images",
  videos: "lucy/videos",
  audio: "lucy/audio",
} as const

// Generation limits
export const GENERATION_LIMITS = {
  maxImagesPerSession: 50,
  maxVideosPerSession: 20,
  maxAudioPerSession: 30,
  maxFileSize: 100 * 1024 * 1024, // 100MB
} as const

// Model configurations
export const MODELS = {
  chat: "gemini-2.5-flash",
  image: "gemini-3-pro-image-preview",
  video: "veo-3.1-fast-generate-preview",
  audio: "gemini-2.5-flash-preview-tts",
} as const

// Error messages
export const ERROR_MESSAGES = {
  noApiKey: "Please enter your Gemini API key in settings",
  insufficientCredits: "Insufficient credits for this operation",
  generationFailed: "Generation failed. Please try again.",
  uploadFailed: "Failed to upload file",
  invalidFile: "Invalid file type or size",
} as const
