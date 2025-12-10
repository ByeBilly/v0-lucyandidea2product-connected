"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle } from "lucide-react"

interface UsageData {
  dailySpent: number
  dailyLimit: number
  monthlySpent: number
  monthlyLimit: number
  recentCalls: Array<{
    model: string
    cost: number
    timestamp: Date
  }>
}

export function APIUsageDashboard({ userId }: { userId: string }) {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch usage data from your API
    const fetchUsage = async () => {
      const response = await fetch(`/api/usage/${userId}`)
      const data = await response.json()
      setUsage(data)
      setLoading(false)
    }

    fetchUsage()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchUsage, 30000)
    return () => clearInterval(interval)
  }, [userId])

  if (loading || !usage) {
    return <div>Loading usage data...</div>
  }

  const dailyPercent = (usage.dailySpent / usage.dailyLimit) * 100
  const monthlyPercent = (usage.monthlySpent / usage.monthlyLimit) * 100

  const getDailyStatus = () => {
    if (dailyPercent < 50) return { color: "text-green-500", icon: CheckCircle, label: "Healthy" }
    if (dailyPercent < 80) return { color: "text-yellow-500", icon: TrendingUp, label: "Moderate" }
    return { color: "text-red-500", icon: AlertTriangle, label: "High" }
  }

  const dailyStatus = getDailyStatus()

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      {dailyPercent > 80 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You've used {dailyPercent.toFixed(0)}% of your daily budget! 
            Consider pausing AI calls or increasing your limit.
          </AlertDescription>
        </Alert>
      )}

      {/* Budget Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Daily Budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Today's Usage
            </CardTitle>
            <CardDescription>
              ${usage.dailySpent.toFixed(2)} / ${usage.dailyLimit.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <dailyStatus.icon className={`h-4 w-4 ${dailyStatus.color}`} />
                  {dailyStatus.label}
                </span>
                <span className={dailyStatus.color}>{dailyPercent.toFixed(0)}%</span>
              </div>
              <Progress 
                value={dailyPercent} 
                className={dailyPercent > 80 ? "bg-red-100" : "bg-gray-100"}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              Remaining: ${(usage.dailyLimit - usage.dailySpent).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Month
            </CardTitle>
            <CardDescription>
              ${usage.monthlySpent.toFixed(2)} / ${usage.monthlyLimit.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{monthlyPercent.toFixed(0)}%</span>
              </div>
              <Progress 
                value={monthlyPercent}
                className={monthlyPercent > 80 ? "bg-red-100" : "bg-gray-100"}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              Remaining: ${(usage.monthlyLimit - usage.monthlySpent).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent API Calls</CardTitle>
          <CardDescription>Your last 5 AI requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usage.recentCalls.map((call, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{call.model}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(call.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="font-semibold">${call.cost.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown by Model */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Model</CardTitle>
          <CardDescription>Where your budget is going</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Gemini 2.0 Flash</span>
              <span className="font-semibold">$2.34 (48%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Claude 3.5 Sonnet</span>
              <span className="font-semibold">$1.89 (39%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>GPT-4</span>
              <span className="font-semibold">$0.63 (13%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}








