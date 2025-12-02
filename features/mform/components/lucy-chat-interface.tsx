"use client"
import { useState, useEffect } from "react"
import { Check, Settings, Plus, MessageSquare } from "lucide-react"
import { useLucyChat } from "../hooks/use-lucy-chat"
import { ChatMessage } from "./chat-message"
import { AssetLibrary } from "./asset-library"
import { ApiKeyManager } from "./api-key-manager"
import type { LucyChatInterfaceProps, GeneratedAsset, StoredApiKeys } from "../types"

export function LucyChatInterface({ userId, userCredits = 100 }: LucyChatInterfaceProps = {}) {
  console.log("[v0] LucyChatInterface mounting")
  const [showSettings, setShowSettings] = useState(false)
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([])
  const [hasAnyApiKey, setHasAnyApiKey] = useState(false)
  const [apiKeyCount, setApiKeyCount] = useState(0)

  const {
    messages,
    chats,
    currentChatId,
    isProcessing,
    error,
    sendUserMessage,
    loadChat,
    startNewChat,
    loadChatHistory,
  } = useLucyChat({ apiKey: "" })

  useEffect(() => {
    console.log("[v0] LucyChatInterface useEffect running")
    const storedKeys = localStorage.getItem("mform_api_keys")
    if (storedKeys) {
      try {
        const keys: StoredApiKeys = JSON.parse(storedKeys)

        // Check built-in providers
        const builtInKeys = Object.entries(keys).filter(
          ([key, value]) => key !== "custom" && value && String(value).length > 0,
        ).length

        // Check custom providers
        const customKeys = keys.custom?.length || 0

        const totalKeys = builtInKeys + customKeys
        setApiKeyCount(totalKeys)
        setHasAnyApiKey(totalKeys > 0)
        console.log("[v0] Found", totalKeys, "API keys")
      } catch (e) {
        console.error("Failed to check API keys", e)
      }
    }

    // Load saved assets
    const savedAssets = localStorage.getItem("mform_generated_assets")
    if (savedAssets) {
      setGeneratedAssets(JSON.parse(savedAssets))
    }
  }, [showSettings])

  const handleDeleteAsset = (assetId: string) => {
    const updatedAssets = generatedAssets.filter((asset) => asset.id !== assetId)
    setGeneratedAssets(updatedAssets)
    localStorage.setItem("mform_generated_assets", JSON.stringify(updatedAssets))
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Left Sidebar - Asset Library */}
      <aside className="w-80 flex flex-col bg-gray-900 border-r border-gray-800">
        {/* API Status Banner */}
        <div className="p-4 border-b border-gray-800 bg-gray-800/50">
          {hasAnyApiKey ? (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <Check className="w-4 h-4" />
              <span>
                {apiKeyCount} API{apiKeyCount !== 1 ? "s" : ""} configured
              </span>
            </div>
          ) : (
            <div className="text-sm text-yellow-400">No API keys configured</div>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="mt-2 text-xs text-purple-400 hover:text-purple-300 underline"
          >
            Manage API Keys →
          </button>
        </div>

        {/* Asset Library */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Your Creations</h2>
          </div>
          <AssetLibrary assets={generatedAssets} onDeleteAsset={handleDeleteAsset} />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
          <div>
            <h1 className="text-xl font-bold text-white">mform</h1>
            <p className="text-xs text-gray-500">Create with your own API keys</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => startNewChat()}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-all ${
                hasAnyApiKey
                  ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                  : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 animate-pulse"
              }`}
              title="API Keys"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-purple-900/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Start Creating</h2>
              <p className="text-gray-400 max-w-md mb-6">
                Use your own API keys from multiple providers to generate images, videos, and audio. Your creations,
                your control.
              </p>
              {!hasAnyApiKey && (
                <div className="px-4 py-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-yellow-400 text-sm mb-4">
                  Please add API keys to start creating
                </div>
              )}
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                {hasAnyApiKey ? `Manage ${apiKeyCount} API Key${apiKeyCount !== 1 ? "s" : ""}` : "Add API Keys"}
              </button>
            </div>
          ) : (
            messages.map((message) => <ChatMessage key={message.id} message={message} />)
          )}
          {error && (
            <div className="px-4 py-3 bg-red-900/20 border border-red-700/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement
              if (input.value.trim() && !isProcessing) {
                sendUserMessage(input.value.trim())
                input.value = ""
              }
            }}
            className="flex gap-2"
          >
            <input
              name="message"
              type="text"
              disabled={!hasAnyApiKey || isProcessing}
              placeholder={hasAnyApiKey ? "Describe what you want to create..." : "Add API keys first..."}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!hasAnyApiKey || isProcessing}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {isProcessing ? "Creating..." : "Send"}
            </button>
          </form>
        </div>
      </main>

      {/* Settings Modal - Multi-API Manager */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-gray-900 rounded-lg border border-gray-700 p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">API Configuration</h3>
                <p className="text-xs text-gray-400 mt-1">Add built-in or custom API providers</p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <ApiKeyManager />
          </div>
        </div>
      )}
    </div>
  )
}
