"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Settings, FolderOpen } from "lucide-react"
import { ApiKeyManager } from "./api-key-manager"
import { AssetLibrary } from "./asset-library"
import type { GeneratedAsset } from "../types"

export function MformInterface() {
  const [activeTab, setActiveTab] = useState("create")
  const [assets, setAssets] = useState<GeneratedAsset[]>([])

  const handleDeleteAsset = (assetId: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId))
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Tab Navigation */}
        <div className="border-b border-slate-800">
          <TabsList className="w-full justify-start bg-transparent h-14 px-4">
            <TabsTrigger
              value="create"
              className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              <Sparkles className="w-4 h-4" />
              Create
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="library"
              className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              <FolderOpen className="w-4 h-4" />
              Library
              {assets.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded-full">
                  {assets.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="create" className="h-full m-0 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Creation Studio</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Configure your API keys in the Settings tab to start creating images, videos, and audio with mform.
                </p>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configure API Keys
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0">
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">API Key Management</h2>
                  <p className="text-gray-400">
                    Add your own API keys to unlock mform's full creative potential. Your keys are stored locally and
                    never sent to our servers.
                  </p>
                </div>
                <ApiKeyManager />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="h-full m-0">
            <AssetLibrary assets={assets} onDeleteAsset={handleDeleteAsset} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
