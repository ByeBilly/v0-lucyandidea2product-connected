"use client"

import { VisionaryDirectorLogo } from "@/components/visionary-director-logo"
import { AnimatedLetter } from "@/components/animated-letter"

export default function TestLettersPage() {
  const allLetters = "VISIONARYDIRECTOR".split("")
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Animated Letters Test Page</h1>
          <p className="text-gray-400">Testing all letter animations</p>
        </div>

        {/* Full Logo - Extra Large */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Full Logo (XL Size)</h2>
          <div className="bg-slate-900/50 p-12 rounded-3xl border border-white/10">
            <VisionaryDirectorLogo size="xl" letterDelay={80} />
          </div>
        </div>

        {/* Full Logo - Large */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Full Logo (Large Size)</h2>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <VisionaryDirectorLogo size="lg" letterDelay={50} />
          </div>
        </div>

        {/* Full Logo - Medium */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Full Logo (Medium Size)</h2>
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10">
            <VisionaryDirectorLogo size="md" letterDelay={30} />
          </div>
        </div>

        {/* Individual Letters Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">All Individual Letters</h2>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center justify-items-center">
              {Array.from(new Set(allLetters)).sort().map((letter, index) => (
                <div key={letter} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 flex items-center justify-center bg-slate-800/50 rounded-xl border border-white/5">
                    <AnimatedLetter
                      letter={letter}
                      className="h-20"
                      delay={index * 100}
                      fallbackColor="text-blue-400"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{letter}.mp4</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Sizes Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Size Comparison</h2>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 space-y-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Small (h-12)</p>
              <div className="flex gap-1">
                {allLetters.slice(0, 5).map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} className="h-12" delay={i * 50} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Medium (h-24)</p>
              <div className="flex gap-1">
                {allLetters.slice(0, 5).map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} className="h-24" delay={i * 50} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Large (h-32)</p>
              <div className="flex gap-1">
                {allLetters.slice(0, 5).map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} className="h-32" delay={i * 50} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Extra Large (h-48)</p>
              <div className="flex gap-1">
                {allLetters.slice(0, 5).map((letter, i) => (
                  <AnimatedLetter key={i} letter={letter} className="h-48" delay={i * 50} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dark Background Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Dark Background Test</h2>
          <div className="bg-black p-12 rounded-3xl border border-white/10">
            <VisionaryDirectorLogo size="lg" letterDelay={50} />
          </div>
        </div>

        {/* Light Background Test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Light Background Test</h2>
          <div className="bg-white p-12 rounded-3xl">
            <VisionaryDirectorLogo size="lg" letterDelay={50} />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="space-y-4 pb-16">
          <h2 className="text-2xl font-semibold text-center">Letter Status</h2>
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-green-400 mb-2">✅ Videos Found:</p>
                <p className="text-gray-400 text-xs">Check console and look for successfully loaded videos</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-400 mb-2">⚠️ Missing Videos:</p>
                <p className="text-gray-400 text-xs">Letters showing as text fallback need their .mp4 files added</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm">
                💡 <strong>Tip:</strong> Upload missing letter videos to <code className="bg-black/30 px-2 py-1 rounded">public/letters/</code> and refresh to see them animate!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}



