/**
 * Example: How to use Token Tracker in your AI API calls
 */

import { trackAPICall } from './token-tracker'

// Example 1: Wrapping a Gemini API call
export async function callGeminiWithTracking(
  userId: string,
  prompt: string
) {
  const result = await trackAPICall(
    userId,
    'gemini-2.0-flash',
    prompt,
    async () => {
      // Your actual API call here
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.USER_GEMINI_KEY!
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      })
      
      const data = await response.json()
      
      // Extract token usage from response
      return {
        response: data.candidates[0].content.parts[0].text,
        usage: {
          inputTokens: data.usageMetadata.promptTokenCount,
          outputTokens: data.usageMetadata.candidatesTokenCount
        }
      }
    }
  )
  
  // Handle result
  if (!result.allowed) {
    throw new Error(`Budget exceeded: ${result.reason}`)
  }
  
  return {
    text: result.response,
    cost: result.cost
  }
}

// Example 2: Wrapping Claude API call
export async function callClaudeWithTracking(
  userId: string,
  prompt: string
) {
  const result = await trackAPICall(
    userId,
    'claude-3.5-sonnet',
    prompt,
    async () => {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.USER_ANTHROPIC_KEY!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      
      const data = await response.json()
      
      return {
        response: data.content[0].text,
        usage: {
          inputTokens: data.usage.input_tokens,
          outputTokens: data.usage.output_tokens
        }
      }
    }
  )
  
  if (!result.allowed) {
    throw new Error(`Budget exceeded: ${result.reason}`)
  }
  
  return {
    text: result.response,
    cost: result.cost
  }
}

// Example 3: Using in a Server Action
export async function visionaryDirectorAction(userId: string, dream: string) {
  try {
    const result = await callGeminiWithTracking(userId, dream)
    
    return {
      success: true,
      response: result.text,
      cost: result.cost,
      message: `Generated! Cost: $${result.cost.toFixed(4)}`
    }
  } catch (error: any) {
    if (error.message.includes('Budget exceeded')) {
      return {
        success: false,
        error: 'BUDGET_EXCEEDED',
        message: error.message
      }
    }
    throw error
  }
}







