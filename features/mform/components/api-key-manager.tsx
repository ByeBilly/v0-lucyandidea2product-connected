"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Eye, EyeOff, Check, Lock, Plus, Trash2 } from "lucide-react"
import { API_PROVIDERS } from "../constants"
import type { ApiProvider, StoredApiKeys, CustomApiKey } from "../types"

const STORAGE_KEY = "mform_api_keys"

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<StoredApiKeys>({})
  const [tempKeys, setTempKeys] = useState<StoredApiKeys>({})
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [savedProviders, setSavedProviders] = useState<Record<string, boolean>>({})

  const [showAddCustom, setShowAddCustom] = useState(false)
  const [customName, setCustomName] = useState("")
  const [customKey, setCustomKey] = useState("")
  const [customBaseUrl, setCustomBaseUrl] = useState("")
  const [customDescription, setCustomDescription] = useState("")

  // Load API keys from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setApiKeys(parsed)
        setTempKeys(parsed)
      } catch (e) {
        console.error("Failed to parse stored API keys", e)
      }
    }
  }, [])

  const handleSaveKey = (provider: ApiProvider) => {
    const key = tempKeys[provider]
    if (!key || key.trim() === "") return

    const updated = { ...apiKeys, [provider]: key }
    setApiKeys(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    // Show saved feedback
    setSavedProviders((prev) => ({ ...prev, [provider]: true }))
    setTimeout(() => {
      setSavedProviders((prev) => ({ ...prev, [provider]: false }))
    }, 2000)
  }

  const handleKeyChange = (provider: ApiProvider, value: string) => {
    setTempKeys((prev) => ({ ...prev, [provider]: value }))
  }

  const toggleShowKey = (provider: string) => {
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }))
  }

  const hasKey = (provider: ApiProvider) => {
    return apiKeys[provider] && apiKeys[provider]!.length > 0
  }

  const handleAddCustom = () => {
    if (!customName.trim() || !customKey.trim()) return

    const newCustomKey: CustomApiKey = {
      id: `custom_${Date.now()}`,
      name: customName,
      apiKey: customKey,
      baseUrl: customBaseUrl || undefined,
      description: customDescription || undefined,
      createdAt: new Date(),
    }

    const customKeys = apiKeys.custom || []
    const updated = { ...apiKeys, custom: [...customKeys, newCustomKey] }
    setApiKeys(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    // Reset form
    setCustomName("")
    setCustomKey("")
    setCustomBaseUrl("")
    setCustomDescription("")
    setShowAddCustom(false)
  }

  const handleDeleteCustom = (id: string) => {
    const customKeys = apiKeys.custom?.filter((k) => k.id !== id) || []
    const updated = { ...apiKeys, custom: customKeys }
    setApiKeys(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Lock className="w-4 h-4" />
        <span>Your API keys are stored locally and never sent to our servers</span>
      </div>

      {/* Built-in Providers */}
      {(Object.keys(API_PROVIDERS) as ApiProvider[]).map((providerId) => {
        const provider = API_PROVIDERS[providerId]
        const isSaved = savedProviders[providerId]
        const keyExists = hasKey(providerId)

        return (
          <Card key={providerId} className="p-4 bg-background/50">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{provider.name}</h4>
                    {keyExists && (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{provider.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {provider.capabilities.map((cap) => (
                      <span key={cap} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={provider.getApiKeyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  Get Key
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`key-${providerId}`} className="text-xs">
                  API Key
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={`key-${providerId}`}
                      type={showKeys[providerId] ? "text" : "password"}
                      placeholder={provider.apiKeyPlaceholder}
                      value={tempKeys[providerId] || ""}
                      onChange={(e) => handleKeyChange(providerId, e.target.value)}
                      className="pr-10 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey(providerId)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKeys[providerId] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSaveKey(providerId)}
                    disabled={!tempKeys[providerId] || tempKeys[providerId] === apiKeys[providerId]}
                    className="shrink-0"
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Custom API Keys</h3>
          <Button size="sm" variant="outline" onClick={() => setShowAddCustom(!showAddCustom)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Custom
          </Button>
        </div>

        {/* Add Custom API Form */}
        {showAddCustom && (
          <Card className="p-4 mb-3 bg-background/50">
            <div className="space-y-3">
              <div>
                <Label htmlFor="custom-name" className="text-xs">
                  Provider Name *
                </Label>
                <Input
                  id="custom-name"
                  placeholder="e.g., Hugging Face, Stability AI"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="custom-key" className="text-xs">
                  API Key *
                </Label>
                <Input
                  id="custom-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="custom-url" className="text-xs">
                  Base URL (Optional)
                </Label>
                <Input
                  id="custom-url"
                  placeholder="https://api.example.com"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="custom-desc" className="text-xs">
                  Description (Optional)
                </Label>
                <Textarea
                  id="custom-desc"
                  placeholder="Notes about this API"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="text-sm min-h-[60px]"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddCustom} disabled={!customName || !customKey}>
                  Save Custom API
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddCustom(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Display Custom APIs */}
        {apiKeys.custom && apiKeys.custom.length > 0 ? (
          <div className="space-y-2">
            {apiKeys.custom.map((customApi) => (
              <Card key={customApi.id} className="p-3 bg-background/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm truncate">{customApi.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    </div>
                    {customApi.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{customApi.description}</p>
                    )}
                    {customApi.baseUrl && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">URL: {customApi.baseUrl}</p>
                    )}
                    <p className="text-xs text-muted-foreground/60 mt-1">Key: {customApi.apiKey.substring(0, 8)}...</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteCustom(customApi.id)}
                    className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          !showAddCustom && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No custom APIs configured. Add one to integrate with any API service.
            </p>
          )
        )}
      </div>
    </div>
  )
}
