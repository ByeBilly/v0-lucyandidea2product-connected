# Token Tracking & Cost Monitoring System

## 🎯 Purpose

Monitor ALL AI API calls flowing through VisionaryDirector to:
- ✅ Track token usage in real-time
- ✅ Calculate actual costs per request
- ✅ Enforce user-set budgets
- ✅ Prevent bill shock
- ✅ Provide transparency
- ✅ Log for analytics and debugging

---

## 🏗️ Architecture

```
User Request
    ↓
trackAPICall() ← Main wrapper
    ↓
├─ 1. Estimate cost from prompt
├─ 2. Check user budget limits
├─ 3. Block if over budget
├─ 4. Make actual API call
├─ 5. Extract real token usage
├─ 6. Calculate actual cost
└─ 7. Log to database
    ↓
User gets response + cost info
```

---

## 📊 Database Schema

### `api_usage_logs` Table
Stores every single API call:
- `user_id` - Who made the call
- `model` - Which AI model (gemini-2.0-flash, claude-3.5-sonnet, etc.)
- `input_tokens` - Prompt tokens
- `output_tokens` - Response tokens
- `cost` - Calculated cost in USD
- `timestamp` - When it happened
- `request_id` - Unique identifier
- `metadata` - Additional context (JSON)

### `user_budget_limits` Table
User-configured spending limits:
- `daily_max` - Daily spending cap
- `monthly_max` - Monthly spending cap
- `per_request_max` - Maximum cost per single request

---

## 🔧 How to Use

### Step 1: Wrap ALL AI API Calls

**Before (Dangerous):**
```typescript
// Direct API call - no tracking!
const response = await geminiClient.generateContent(prompt)
```

**After (Safe):**
```typescript
import { trackAPICall } from '@/lib/api-monitor/token-tracker'

const result = await trackAPICall(
  userId,
  'gemini-2.0-flash',
  prompt,
  async () => {
    // Your actual API call
    const response = await geminiClient.generateContent(prompt)
    
    return {
      response: response.text,
      usage: {
        inputTokens: response.usageMetadata.promptTokenCount,
        outputTokens: response.usageMetadata.candidatesTokenCount
      }
    }
  }
)

if (!result.allowed) {
  throw new Error(`Budget exceeded: ${result.reason}`)
}

// Use result.response and show result.cost to user
```

### Step 2: Show Real-Time Usage to Users

```tsx
import { APIUsageDashboard } from '@/components/api-usage-dashboard'

<APIUsageDashboard userId={currentUser.id} />
```

Shows:
- Daily/monthly spending
- Budget progress bars
- Recent API calls
- Cost breakdown by model
- Warnings when approaching limits

### Step 3: Warn Before Expensive Calls

```tsx
import { BudgetWarningModal } from '@/components/budget-warning-modal'

const [showWarning, setShowWarning] = useState(false)
const [estimatedCost, setEstimatedCost] = useState(0)

// Before making API call
const estimated = calculateCost('gemini-2.0-flash', inputTokens, inputTokens)
if (estimated > 0.10) { // Warn if > $0.10
  setEstimatedCost(estimated)
  setShowWarning(true)
  return
}

<BudgetWarningModal
  open={showWarning}
  estimatedCost={estimatedCost}
  currentSpent={userDailySpent}
  limit={userDailyLimit}
  onProceed={handleProceed}
  onCancel={() => setShowWarning(false)}
/>
```

---

## 💰 Cost Tracking

### Current Model Prices (per 1M tokens)

```typescript
TOKEN_COSTS = {
  'gemini-2.0-flash': {
    input: $0.15,
    output: $0.60
  },
  'claude-3.5-sonnet': {
    input: $3.00,
    output: $15.00
  },
  'gpt-4o': {
    input: $2.50,
    output: $10.00
  }
}
```

**⚠️ Update these regularly!** AI providers change pricing.

---

## 🛡️ Budget Protection

### Three Layers of Protection:

1. **Per-Request Limit**
   - Blocks individual expensive requests
   - Default: $1.00 per request
   - Prevents accidental huge costs

2. **Daily Limit**
   - Caps total spending per day
   - Default: $10.00/day
   - Resets at midnight UTC

3. **Monthly Limit**
   - Caps total spending per month
   - Default: $50.00/month
   - Resets on 1st of month

### User Can Configure:

```tsx
<BudgetSettings>
  <Input 
    label="Daily Maximum" 
    value={dailyMax} 
    onChange={setDailyMax}
  />
  <Input 
    label="Monthly Maximum" 
    value={monthlyMax} 
    onChange={setMonthlyMax}
  />
  <Input 
    label="Per Request Maximum" 
    value={perRequestMax} 
    onChange={setPerRequestMax}
  />
</BudgetSettings>
```

---

## 📈 Analytics Queries

### Get user's spending
```sql
SELECT SUM(cost) as total
FROM api_usage_logs
WHERE user_id = 'user-id'
  AND timestamp >= '2024-01-01';
```

### Most expensive models
```sql
SELECT model, COUNT(*) as calls, SUM(cost) as total_cost
FROM api_usage_logs
GROUP BY model
ORDER BY total_cost DESC;
```

### Daily usage trends
```sql
SELECT DATE(timestamp) as date, SUM(cost) as daily_cost
FROM api_usage_logs
WHERE user_id = 'user-id'
GROUP BY DATE(timestamp)
ORDER BY date DESC
LIMIT 30;
```

---

## 🚨 Critical Implementation Rules

### ❌ NEVER Allow Untracked Calls

```typescript
// BAD - No tracking!
const response = await geminiClient.generateContent(prompt)

// GOOD - Always tracked
const result = await trackAPICall(userId, model, prompt, apiCall)
```

### ❌ NEVER Skip Budget Checks

```typescript
// BAD - Bypassing protection!
if (!result.allowed && userIsAdmin) {
  // Skip check for admins
  const response = await directAPICall()
}

// GOOD - Everyone has limits
if (!result.allowed) {
  throw new Error(result.reason)
}
```

### ✅ ALWAYS Log Usage

Even failed calls should be logged (with cost = 0):
```typescript
catch (error) {
  await logUsage({
    userId,
    model,
    inputTokens: 0,
    outputTokens: 0,
    cost: 0,
    metadata: { error: error.message }
  })
  throw error
}
```

---

## 🔍 Monitoring & Alerts

### Admin Dashboard Should Show:

1. **Platform-Wide Stats**
   - Total API calls today
   - Total cost today
   - Average cost per call
   - Most active users

2. **User Alerts**
   - Users approaching limits
   - Unusual spending patterns
   - Failed budget checks

3. **Model Performance**
   - Cost per model
   - Token efficiency
   - Error rates

---

## 🚀 Deployment Checklist

Before launching BYOK:

- [ ] Database tables created (`api_usage_logs`, `user_budget_limits`)
- [ ] Token costs updated to current pricing
- [ ] All AI API calls wrapped in `trackAPICall()`
- [ ] Budget dashboard accessible to all users
- [ ] Warning modals implemented
- [ ] Default limits set (conservative: $10/day, $50/month)
- [ ] Terms of Service updated with cost disclaimers
- [ ] User onboarding includes budget setup
- [ ] Admin monitoring dashboard built
- [ ] Alerts configured for unusual activity

---

## 📚 Further Reading

- [Gemini Pricing](https://ai.google.dev/pricing)
- [Claude Pricing](https://www.anthropic.com/pricing)
- [OpenAI Pricing](https://openai.com/pricing)

---

## ⚠️ Legal Note

**Token tracking is NOT a guarantee.**

Users are still responsible for:
- Monitoring their provider dashboards
- Setting appropriate limits
- Understanding API costs
- Paying provider bills

This system is a **safety tool**, not a financial contract.

Always include in TOS:
> "Cost estimates are approximate. You are responsible for all API charges from third-party providers."






