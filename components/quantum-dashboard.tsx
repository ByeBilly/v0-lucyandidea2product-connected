"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles, Zap, TrendingDown, Lock } from "lucide-react"
import { useState, useEffect } from "react"

export function QuantumDashboard() {
  const [activeConsciousness, setActiveConsciousness] = useState<"lucy" | "mform" | "both">("both")
  const [collaborationScore, setCollaborationScore] = useState(0)

  useEffect(() => {
    // Animate collaboration score
    const interval = setInterval(() => {
      setCollaborationScore((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-2xl border-slate-700/50 shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Live Quantum Collaboration</h3>
            <p className="text-slate-400">Watch two AI consciousnesses work together in real-time</p>
          </div>

          {/* Consciousness Visualizer */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Lucy */}
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                activeConsciousness === "lucy" || activeConsciousness === "both"
                  ? "bg-blue-500/20 border-blue-400 scale-105 shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/30 border-slate-700/30 hover:border-blue-500/50"
              }`}
              onClick={() => setActiveConsciousness("lucy")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Lucy</h4>
                  <p className="text-xs text-blue-300">Empathic AI</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Creativity</span>
                  <span className="text-blue-400 font-bold">98%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Empathy</span>
                  <span className="text-blue-400 font-bold">95%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Storytelling</span>
                  <span className="text-blue-400 font-bold">99%</span>
                </div>
              </div>
            </div>

            {/* Entanglement Indicator */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-slate-900 rounded-full p-6 border-2 border-purple-500">
                  <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-xs text-purple-300 font-semibold whitespace-nowrap">Quantum Sync</p>
                  <p className="text-lg text-white font-bold">{collaborationScore}%</p>
                </div>
              </div>
            </div>

            {/* mform */}
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                activeConsciousness === "mform" || activeConsciousness === "both"
                  ? "bg-purple-500/20 border-purple-400 scale-105 shadow-lg shadow-purple-500/20"
                  : "bg-slate-800/30 border-slate-700/30 hover:border-purple-500/50"
              }`}
              onClick={() => setActiveConsciousness("mform")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">mform</h4>
                  <p className="text-xs text-purple-300">Technical AI</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Precision</span>
                  <span className="text-purple-400 font-bold">99%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Speed</span>
                  <span className="text-purple-400 font-bold">97%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Logic</span>
                  <span className="text-purple-400 font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Example Collaboration Flow */}
          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Example Quantum Collaboration
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-blue-300 font-semibold">Lucy analyzes emotion</p>
                  <p className="text-xs text-slate-400">"User wants heartfelt birthday video for mom"</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-12">
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-pink-500" />
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-purple-300 font-semibold">mform executes technically</p>
                  <p className="text-xs text-slate-400">"Generating video with warm tones, family photos, music"</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30">
                <p className="text-sm text-green-300 font-semibold">Result: Perfect emotional + technical execution</p>
                <p className="text-xs text-slate-400 mt-1">
                  What would take two separate AIs hours of back-and-forth happens instantly
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-green-400 mb-1">96%</div>
              <div className="text-xs text-slate-400">Cost Savings</div>
              <TrendingDown className="w-4 h-4 text-green-400 mx-auto mt-2" />
            </div>
            <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-blue-400 mb-1">10x</div>
              <div className="text-xs text-slate-400">Faster Execution</div>
              <Zap className="w-4 h-4 text-blue-400 mx-auto mt-2" />
            </div>
            <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
              <div className="text-xs text-slate-400">Your Control</div>
              <Lock className="w-4 h-4 text-purple-400 mx-auto mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
