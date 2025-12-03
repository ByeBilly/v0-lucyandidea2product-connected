# M-Form Secure API Key System - Technical Documentation

**Document Version:** 1.0
**Last Updated:** December 4, 2025 12:01 AEST

## Executive Summary

mform implements a Bring-Your-Own-API (BYO-API) key system where users provide their own API keys for AI services. This architecture breaks vendor lock-in and enables wholesale pricing directly from providers.

## System Architecture

### Storage Layer

**Location:** Browser localStorage
**Key:** `"mform_api_keys"`
**Format:**
\`\`\`typescript
interface StoredApiKeys {
  [provider: ApiProvider]?: string  // e.g., "openai": "sk-..."
  custom?: CustomApiKey[]            // User-defined APIs
}

interface CustomApiKey {
  id: string                    // Unique ID (timestamp-based)
  name: string                  // User-friendly name
  apiKey: string                // The actual API key
  baseUrl?: string              // Optional custom endpoint
  description?: string          // User notes
  createdAt: Date
}
\`\`\`

**Example Stored Data:**
\`\`\`json
{
  "openai": "sk-proj-abc123...",
  "anthropic": "sk-ant-xyz789...",
  "custom": [
    {
      "id": "custom_1701234567890",
      "name": "Hugging Face",
      "apiKey": "hf_abc123...",
      "baseUrl": "https://api-inference.huggingface.co",
      "description": "For custom model inference",
      "createdAt": "2025-12-04T12:00:00Z"
    }
  ]
}
\`\`\`

### Security Analysis

**Current State (⚠️ CRITICAL ISSUE):**
- Keys stored in **PLAINTEXT** in localStorage
- No encryption at rest
- Vulnerable to XSS attacks
- Vulnerable to malicious browser extensions
- No server-side validation
- No key rotation mechanism

**Risk Assessment:**
- **Severity:** HIGH
- **Likelihood:** MEDIUM (depends on XSS prevention elsewhere)
- **Impact:** User API keys could be stolen and abused
- **CVSS Score:** ~7.5 (High)

**Recommended Mitigations:**
1. **Immediate:** Implement Web Crypto API encryption
2. **Short-term:** Add CSP headers to prevent XSS
3. **Medium-term:** Optional server-side encrypted storage
4. **Long-term:** Hardware security module (HSM) for enterprise users

### Component Architecture

**Main Component:** `features/mform/components/api-key-manager.tsx`

**Responsibilities:**
1. Display built-in provider cards (OpenAI, Anthropic, etc.)
2. Allow user to enter/edit API keys
3. Show/hide keys (password field)
4. Save keys to localStorage
5. Display "Active" status for configured keys
6. Support custom API addition
7. Delete custom APIs

**User Flow:**
\`\`\`
1. User clicks "API Keys" in mform interface
2. Component loads keys from localStorage
3. User enters key in masked field
4. User clicks "Save"
5. Key written to localStorage immediately
6. UI shows green "Active" badge
7. User can now use that provider for generation
\`\`\`

**Code Excerpt:**
\`\`\`typescript
const handleSaveKey = (provider: ApiProvider) => {
  const key = tempKeys[provider]
  if (!key || key.trim() === "") return

  const updated = { ...apiKeys, [provider]: key }
  setApiKeys(updated)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) // ⚠️ PLAINTEXT

  setSavedProviders((prev) => ({ ...prev, [provider]: true }))
  setTimeout(() => {
    setSavedProviders((prev) => ({ ...prev, [provider]: false }))
  }, 2000)
}
\`\`\`

### Supported Providers

**Built-in Providers (as defined in `features/mform/constants.ts`):**

\`\`\`typescript
export const API_PROVIDERS: Record<ApiProvider, ProviderConfig> = {
  openai: {
    name: "OpenAI",
    description: "GPT-4, DALL-E, Whisper, TTS",
    capabilities: ["chat", "image", "audio", "embeddings"],
    getApiKeyUrl: "https://platform.openai.com/api-keys",
    apiKeyPlaceholder: "sk-proj-...",
    baseUrl: "https://api.openai.com/v1"
  },
  anthropic: {
    name: "Anthropic",
    description: "Claude 3.5 Sonnet, Opus, Haiku",
    capabilities: ["chat", "vision"],
    getApiKeyUrl: "https://console.anthropic.com/settings/keys",
    apiKeyPlaceholder: "sk-ant-...",
    baseUrl: "https://api.anthropic.com"
  },
  stability: {
    name: "Stability AI",
    description: "Stable Diffusion XL, SD3",
    capabilities: ["image"],
    getApiKeyUrl: "https://platform.stability.ai/account/keys",
    apiKeyPlaceholder: "sk-...",
    baseUrl: "https://api.stability.ai"
  },
  replicate: {
    name: "Replicate",
    description: "LoRA, video models, custom models",
    capabilities: ["image", "video", "audio"],
    getApiKeyUrl: "https://replicate.com/account/api-tokens",
    apiKeyPlaceholder: "r8_...",
    baseUrl: "https://api.replicate.com"
  },
  elevenlabs: {
    name: "ElevenLabs",
    description: "Voice cloning, TTS",
    capabilities: ["audio"],
    getApiKeyUrl: "https://elevenlabs.io/app/settings/api-keys",
    apiKeyPlaceholder: "...",
    baseUrl: "https://api.elevenlabs.io"
  }
}
\`\`\`

### Custom API Integration

**Purpose:** Allow users to add ANY AI service, not just pre-configured ones

**Fields:**
- **Name:** User-defined label (e.g., "Hugging Face", "Groq")
- **API Key:** The actual key
- **Base URL:** Optional custom endpoint
- **Description:** User notes

**Storage:**
- Stored in `apiKeys.custom` array
- Each has unique ID (`custom_${timestamp}`)
- Can be deleted individually

**Use Case Examples:**
- Hugging Face inference endpoints
- Groq fast inference
- Local Ollama instances
- Custom fine-tuned models
- Enterprise AI gateways

### Key Retrieval & Usage

**When User Requests Generation:**

\`\`\`typescript
// 1. Load keys from localStorage
const stored = localStorage.getItem('mform_api_keys')
const apiKeys = JSON.parse(stored)

// 2. Check if user has key for chosen provider
const provider = 'openai' // user's selection
const apiKey = apiKeys[provider]

if (!apiKey) {
  throw new Error('Please configure your OpenAI API key in settings')
}

// 3. Call AI service directly with user's key
const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,  // User's key, not platform's
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: userPrompt })
})
\`\`\`

**Key Points:**
- Platform NEVER sees the key on the server
- Direct client → AI provider communication
- User pays wholesale rates
- No platform markup
- Full cost transparency

## Comparison: mform vs Lucy Keys

| Aspect | mform (BYO-API) | Lucy (Platform) |
|--------|-----------------|-----------------|
| Key Storage | User's browser | Vercel secrets |
| Who Pays | User directly | Platform credits |
| Pricing | Wholesale | Markup (2-10x) |
| Setup Complexity | Manual key entry | Zero setup |
| Control | Full control | Platform managed |
| Cost Transparency | 100% transparent | Opaque |
| Best For | Power users | Beginners |
| Security Risk | User's responsibility | Platform's responsibility |

## Encryption Implementation (RECOMMENDED)

### Option 1: Web Crypto API (Client-Side)

\`\`\`typescript
// Generate encryption key from user password
async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('visionarydirector_salt'), // Should be random per user
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Encrypt API key before storing
async function encryptApiKey(apiKey: string, password: string): Promise<string> {
  const key = await deriveKey(password)
  const encoder = new TextEncoder()
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(apiKey)
  )
  
  // Return IV + encrypted data as base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.length)
  
  return btoa(String.fromCharCode(...combined))
}

// Decrypt when needed
async function decryptApiKey(encrypted: string, password: string): Promise<string> {
  const key = await deriveKey(password)
  const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0))
  const iv = combined.slice(0, 12)
  const data = combined.slice(12)
  
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )
  
  return new TextDecoder().decode(decrypted)
}
\`\`\`

**Pros:**
- No server round-trip
- Standards-based (Web Crypto API)
- Works offline

**Cons:**
- Requires user to remember encryption password
- Password lost = keys lost
- Still vulnerable if password is weak

### Option 2: Server-Side Encrypted Storage

**Flow:**
1. User enters API key in UI
2. Key encrypted client-side with temporary session key
3. Sent to server over HTTPS
4. Server re-encrypts with KMS (AWS KMS, Google Secret Manager)
5. Stored in database encrypted
6. On use: Server decrypts and uses key on behalf of user

**Pros:**
- Professional-grade security
- Key recovery possible
- Audit logs

**Cons:**
- Server now sees keys (trust issue)
- Contradicts BYO-API philosophy
- Adds latency
- Requires KMS infrastructure

### Option 3: Hybrid Approach (RECOMMENDED)

**Default:** Client-side encryption with user password
**Optional:** Server-side encrypted backup for recovery
**User Choice:** "I trust the platform to backup my keys securely"

## Key Rotation & Revocation

**Current State:** No key rotation mechanism

**Recommended Implementation:**
1. Notify users when keys are >90 days old
2. One-click "Generate new key + update all services"
3. Graceful transition period (both keys work)
4. Revoke old key after confirmation

## Regression Detection

**Has This System Been Altered?**

To verify if mform's BYO-API key system has regressed:

\`\`\`bash
# 1. Check API key manager component exists
test -f features/mform/components/api-key-manager.tsx && echo "✅ Component exists"

# 2. Verify localStorage usage (should find STORAGE_KEY)
grep -r "mform_api_keys" features/mform/ && echo "✅ localStorage key found"

# 3. Check for encryption (should NOT find any currently)
grep -r "crypto.subtle" features/mform/ || echo "⚠️ No encryption detected"

# 4. Verify custom API support
grep -r "CustomApiKey" features/mform/types.ts && echo "✅ Custom API types exist"
\`\`\`

**Expected Results:**
- ✅ api-key-manager.tsx exists
- ✅ localStorage key "mform_api_keys" is used
- ⚠️ NO encryption currently implemented
- ✅ Custom API support present

**Signs of Regression:**
- ❌ API key manager component deleted
- ❌ Keys being sent to server instead of stored locally
- ❌ Custom API support removed
- ❌ Provider configs changed without documentation

## Current Status: INTACT ✅

**Audit Date:** December 4, 2025 12:01 AEST

**Verification:**
- ✅ API key manager component present and functional
- ✅ localStorage storage working
- ✅ Custom API support intact
- ✅ Provider configurations match design
- ⚠️ Encryption NOT implemented (never was)
- ⚠️ Security vulnerability acknowledged but not addressed

**Conclusion:**
The mform BYO-API key system is **FULLY INTACT** as designed. No regression detected. However, the original design has a security vulnerability (plaintext storage) that should be addressed.
