"use server"

import { dataActionWithPermission } from "@/lib/permission/guards/action"
import { LucyChatsEdit } from "@/lib/db/crud/lucy"
import { LucyMessagesEdit, LucyMessagesQuery } from "@/lib/db/crud/lucy"
import type { UserContext } from "@/lib/types/auth/user-context.bean"
import { chatWithLucy } from "@/features/lucy/services/ai-service"
import { checkRateLimit } from "@/lib/rate-limiting/redis-limiter"

interface SendMessageInput {
  chatId?: string
  text: string
  attachments?: {
    data: string
    mimeType: string
    type: "image" | "audio"
  }[]
  apiKey?: string // Client-provided API key for dev mode
}

interface SendMessageResult {
  success: boolean
  chatId: string
  userMessageId: string
  botMessageId?: string
  botText?: string
  functionCalls?: {
    id: string
    name: string
    args: Record<string, any>
  }[]
  error?: string
  rateLimitExceeded?: boolean
  retryAfter?: number
}

/**
 * Send a message to Lucy and get a response
 */
export const sendMessage = dataActionWithPermission(
  "lucySendMessage",
  async (input: SendMessageInput, userContext: UserContext): Promise<SendMessageResult> => {
    try {
      if (!userContext.id) {
        return { success: false, chatId: "", userMessageId: "", error: "Not authenticated" }
      }

      const rateLimit = await checkRateLimit(userContext.id, "chat")
      if (!rateLimit.allowed) {
        return {
          success: false,
          chatId: input.chatId || "",
          userMessageId: "",
          error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.`,
          rateLimitExceeded: true,
          retryAfter: rateLimit.retryAfter,
        }
      }

      // Get or create chat
      let chatId = input.chatId
      if (!chatId) {
        const chat = await LucyChatsEdit.create({
          userId: userContext.id,
          title: input.text.slice(0, 50) + (input.text.length > 50 ? "..." : ""),
        })
        chatId = chat.id
      }

      // Save user message
      const userMessage = await LucyMessagesEdit.create({
        chatId,
        role: "user",
        content: input.text,
        attachments: input.attachments ? JSON.stringify(input.attachments) : null,
      })

      // TODO: Get user's current credits from Unibee
      const currentCredits = 100

      const messages = await LucyMessagesQuery.findByChatId(chatId)
      const chatHistory = messages
        .filter((m) => m.content !== null)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content as string,
        }))

      // Default to GPT-4o, but can test Claude, Gemini, etc.
      const model = "openai/gpt-4o" // TODO: Make this configurable per user
      const response = await chatWithLucy(chatHistory, currentCredits, model)

      const botText = response.text || ""
      const toolCalls = response.toolCalls || []

      // Save bot message if there's text
      let botMessageId: string | undefined
      if (botText) {
        const botMessage = await LucyMessagesEdit.create({
          chatId,
          role: "model",
          content: botText,
        })
        botMessageId = botMessage.id
      }

      // Update chat title if this was the first message
      if (!input.chatId) {
        await LucyChatsEdit.update(chatId, {
          title: input.text.slice(0, 50) + (input.text.length > 50 ? "..." : ""),
        })
      }

      return {
        success: true,
        chatId,
        userMessageId: userMessage.id,
        botMessageId,
        botText,
        functionCalls: toolCalls.map((tc) => ({
          id: tc.toolCallId,
          name: tc.toolName,
          args: tc.args as Record<string, any>,
        })),
      }
    } catch (error: any) {
      console.error("[v0] Lucy sendMessage error:", error)
      return {
        success: false,
        chatId: input.chatId || "",
        userMessageId: "",
        error: error.message || "Failed to send message",
      }
    }
  },
)
