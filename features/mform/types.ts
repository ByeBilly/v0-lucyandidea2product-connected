/**
 * mform Feature - Type Definitions
 */

export type ApiProvider = "gemini" | "openai" | "anthropic" | "replicate" | "elevenlabs"

export interface ApiProviderConfig {
  id: ApiProvider
  name: string
  description: string
  apiKeyPlaceholder: string
  getApiKeyUrl: string
  capabilities: Array<"chat" | "image" | "video" | "audio">
  models: {
    chat?: string[]
    image?: string[]
    video?: string[]
    audio?: string[]
  }
}

export interface CustomApiKey {
  id: string
  name: string
  apiKey: string
  baseUrl?: string
  description?: string
  createdAt: Date
}

export interface StoredApiKeys {
  gemini?: string
  openai?: string
  anthropic?: string
  replicate?: string
  elevenlabs?: string
  custom?: CustomApiKey[]
}

export interface GeneratedAsset {
  id: string
  type: "image" | "video" | "audio"
  url?: string
  title?: string
  prompt?: string
  provider?: ApiProvider
  model?: string
  createdAt: Date
}
