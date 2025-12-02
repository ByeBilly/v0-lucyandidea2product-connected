"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Mail, Download } from "lucide-react"

interface WaitlistEntry {
  id: number
  email: string
  name: string | null
  status: string
  created_at: string
}

export default function AdminWaitlistPage() {
  const [signups, setSignups] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSignups()
  }, [])

  const fetchSignups = async () => {
    try {
      const response = await fetch("/api/waitlist")
      const data = await response.json()
      setSignups(data.signups || [])
    } catch (error) {
      console.error("Failed to fetch signups:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Status", "Joined Date"],
      ...signups.map((s) => [s.name || "N/A", s.email, s.status, new Date(s.created_at).toLocaleDateString()]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading waitlist...</div>
      </div>
    )
  }

  const stats = {
    total: signups.length,
    thisWeek: signups.filter((s) => new Date(s.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    withNames: signups.filter((s) => s.name).length,
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Waitlist Dashboard</h1>
            <p className="text-slate-400">Manage early access signups</p>
          </div>
          <Button onClick={exportCSV} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{stats.total}</span>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{stats.thisWeek}</span>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">With Names</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{stats.withNames}</span>
                <Mail className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Signups</CardTitle>
            <CardDescription className="text-slate-400">Latest people who joined the waitlist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signups.slice(0, 50).map((signup, index) => (
                <div
                  key={signup.id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{signup.name || "Anonymous"}</p>
                      <p className="text-slate-400 text-sm">{signup.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {new Date(signup.created_at).toLocaleDateString()}
                    </Badge>
                    <Badge
                      variant={signup.status === "pending" ? "default" : "secondary"}
                      className={signup.status === "pending" ? "bg-yellow-600" : ""}
                    >
                      {signup.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
