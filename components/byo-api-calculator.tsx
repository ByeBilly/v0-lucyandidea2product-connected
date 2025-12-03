"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { DollarSign, TrendingDown, Shield, Zap } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function BYOAPICalculator() {
  const [requests, setRequests] = useState(1000)

  const traditionalCost = requests * 0.5
  const byoApiCost = requests * 0.02
  const savings = traditionalCost - byoApiCost
  const savingsPercent = ((savings / traditionalCost) * 100).toFixed(0)

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm">
            <DollarSign className="h-4 w-4" />
            <span>Break Free from Vendor Lock-In</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calculate Your{" "}
            <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
              Cost Revolution
            </span>
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            See how much you save by bringing your own API keys
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-green-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">BYO-API Savings Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Slider */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-slate-300 font-medium">Monthly AI Requests</label>
                <span className="text-white font-bold text-lg">{requests.toLocaleString()}</span>
              </div>
              <Slider
                value={[requests]}
                onValueChange={(value) => setRequests(value[0])}
                min={100}
                max={100000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>100</span>
                <span>100,000</span>
              </div>
            </div>

            {/* Cost Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Traditional Platform */}
              <div className="p-6 bg-red-900/20 rounded-xl border-2 border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold">Traditional Platform</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Cost per request</span>
                    <span className="text-red-400 font-semibold">$0.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Monthly requests</span>
                    <span className="text-white">{requests.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-red-500/30">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total Cost</span>
                      <span className="text-red-400 font-bold text-xl">${traditionalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BYO-API */}
              <div className="p-6 bg-green-900/20 rounded-xl border-2 border-green-500/40 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  REVOLUTIONARY
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">VisionaryDirector BYO-API</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Cost per request</span>
                    <span className="text-green-400 font-semibold">$0.02</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Monthly requests</span>
                    <span className="text-white">{requests.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-green-500/30">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total Cost</span>
                      <span className="text-green-400 font-bold text-xl">${byoApiCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="p-8 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-xl border-2 border-green-500/40 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-green-400" />
                <h3 className="text-3xl font-bold text-white">You Save ${savings.toLocaleString()}/month</h3>
              </div>
              <p className="text-green-400 text-xl font-semibold mb-2">That's {savingsPercent}% cost reduction!</p>
              <p className="text-slate-300 text-sm mb-6">
                With BYO-API, you pay wholesale rates directly to OpenAI, Anthropic, etc. No middleman markup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  Join Waitlist & Save
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500/50 text-green-300 hover:bg-green-500/10 bg-transparent"
                >
                  Learn More About BYO-API
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Your Keys, Your Control</h4>
                <p className="text-slate-400 text-xs">Never share API keys. Full security.</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Wholesale Pricing</h4>
                <p className="text-slate-400 text-xs">Pay provider rates directly.</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Multi-Provider</h4>
                <p className="text-slate-400 text-xs">OpenAI, Anthropic, Replicate, more.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
