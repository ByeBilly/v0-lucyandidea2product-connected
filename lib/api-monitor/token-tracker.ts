/**
 * Token Tracking & Cost Monitoring System
 * 
 * Intercepts all AI API calls to:
 * - Track token usage
 * - Calculate real-time costs
 * - Enforce user budgets
 * - Log for analytics
 * - Prevent overspending
 */

import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

// Cost per 1M tokens (update regularly!)
export const TOKEN_COSTS = {
  'gemini-2.0-flash': {
    input: 0.15,   // $0.15 per 1M input tokens
    output: 0.60,  // $0.60 per 1M output tokens
  },
  'gemini-1.5-pro': {
    input: 3.50,
    output: 10.50,
  },
  'claude-3.5-sonnet': {
    input: 3.00,
    output: 15.00,
  },
  'gpt-4o': {
    input: 2.50,
    output: 10.00,
  },
  'gpt-4-turbo': {
    input: 10.00,
    output: 30.00,
  },
} as const

export type ModelId = keyof typeof TOKEN_COSTS

export interface TokenUsage {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
}

export interface BudgetLimits {
  dailyMax: number      // $ per day
  monthlyMax: number    // $ per month
  perRequestMax: number // $ per request
}

export interface UsageRecord {
  userId: string
  model: ModelId
  inputTokens: number
  outputTokens: number
  cost: number
  timestamp: Date
  requestId: string
}

/**
 * Calculate cost from token usage
 */
export function calculateCost(
  model: ModelId,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = TOKEN_COSTS[model]
  if (!costs) {
    console.warn(`Unknown model: ${model}, using fallback pricing`)
    return ((inputTokens + outputTokens) / 1_000_000) * 5 // $5 per 1M tokens fallback
  }

  const inputCost = (inputTokens / 1_000_000) * costs.input
  const outputCost = (outputTokens / 1_000_000) * costs.output
  
  return inputCost + outputCost
}

/**
 * Get user's current spending for period
 */
export async function getUserSpending(
  userId: string,
  period: 'day' | 'month'
): Promise<number> {
  const now = new Date()
  const startDate = period === 'day'
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
    : new Date(now.getFullYear(), now.getMonth(), 1)

  // Query from your database
  // This is pseudo-code - adapt to your DB schema
  const usage = await db.execute(sql`
    SELECT SUM(cost) as total
    FROM api_usage_logs
    WHERE user_id = ${userId} AND timestamp >= ${startDate}
  `)

  return (usage[0] as any)?.total || 0
}

/**
 * Check if user can afford the estimated cost
 */
export async function checkBudget(
  userId: string,
  estimatedCost: number,
  limits: BudgetLimits
): Promise<{ allowed: boolean; reason?: string }> {
  
  // Check per-request limit
  if (estimatedCost > limits.perRequestMax) {
    return {
      allowed: false,
      reason: `Request cost $${estimatedCost.toFixed(4)} exceeds per-request limit of $${limits.perRequestMax}`
    }
  }

  // Check daily limit
  const dailySpent = await getUserSpending(userId, 'day')
  if (dailySpent + estimatedCost > limits.dailyMax) {
    return {
      allowed: false,
      reason: `Would exceed daily budget: $${(dailySpent + estimatedCost).toFixed(2)} / $${limits.dailyMax}`
    }
  }

  // Check monthly limit
  const monthlySpent = await getUserSpending(userId, 'month')
  if (monthlySpent + estimatedCost > limits.monthlyMax) {
    return {
      allowed: false,
      reason: `Would exceed monthly budget: $${(monthlySpent + estimatedCost).toFixed(2)} / $${limits.monthlyMax}`
    }
  }

  return { allowed: true }
}

/**
 * Log API usage to database
 */
export async function logUsage(record: UsageRecord): Promise<void> {
  try {
    // Store in your database
    await db.execute(sql`
      INSERT INTO api_usage_logs (
        user_id, model, input_tokens, output_tokens, 
        cost, timestamp, request_id
      ) VALUES (${record.userId}, ${record.model}, ${record.inputTokens}, ${record.outputTokens}, ${record.cost}, ${record.timestamp}, ${record.requestId})
    `)
  } catch (error) {
    console.error('Failed to log usage:', error)
    // Don't throw - logging failure shouldn't break the request
  }
}

/**
 * Estimate tokens for a prompt (rough estimation)
 */
export function estimateTokens(text: string): number {
  // Very rough: ~1 token per 4 characters
  // Real tokenization is model-specific and more complex
  return Math.ceil(text.length / 4)
}

/**
 * Get user's budget limits
 */
export async function getUserBudgetLimits(userId: string): Promise<BudgetLimits> {
  // Query from your database
  const limits = await db.execute(sql`
    SELECT daily_max, monthly_max, per_request_max
    FROM user_metric_limits
    WHERE user_id = ${userId}
  `)

  // Cast to any because row type isn't strict here without Drizzle schema
  const row = limits[0] as any

  return {
    dailyMax: row?.daily_max ?? 10,      // Default: $10/day
    monthlyMax: row?.monthly_max ?? 50,    // Default: $50/month
    perRequestMax: row?.per_request_max ?? 1,  // Default: $1/request
  }
}

/**
 * Main token tracking wrapper
 * Use this to wrap ALL AI API calls
 */
export async function trackAPICall<T>(
  userId: string,
  model: ModelId,
  promptText: string,
  apiCall: () => Promise<{ response: T; usage: { inputTokens: number; outputTokens: number } }>
): Promise<{ response: T; cost: number; allowed: boolean; reason?: string }> {
  
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // 1. Estimate cost upfront
  const estimatedInputTokens = estimateTokens(promptText)
  const estimatedCost = calculateCost(model, estimatedInputTokens, estimatedInputTokens) // Rough 1:1 ratio
  
  // 2. Check budget
  const limits = await getUserBudgetLimits(userId)
  const budgetCheck = await checkBudget(userId, estimatedCost, limits)
  
  if (!budgetCheck.allowed) {
    return {
      response: null as any,
      cost: estimatedCost,
      allowed: false,
      reason: budgetCheck.reason
    }
  }
  
  // 3. Make the actual API call
  const { response, usage } = await apiCall()
  
  // 4. Calculate actual cost
  const actualCost = calculateCost(model, usage.inputTokens, usage.outputTokens)
  
  // 5. Log usage
  await logUsage({
    userId,
    model,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cost: actualCost,
    timestamp: new Date(),
    requestId
  })
  
  return {
    response,
    cost: actualCost,
    allowed: true
  }
}





