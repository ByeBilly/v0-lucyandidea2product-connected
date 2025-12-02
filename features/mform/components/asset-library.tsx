"use client"

import { useState } from "react"
import { Download, Trash2, X, ImageIcon, Video, Music, Search } from "lucide-react"
import type { GeneratedAsset } from "../types"

interface AssetLibraryProps {
  assets: GeneratedAsset[]
  onDeleteAsset: (assetId: string) => void
}

export function AssetLibrary({ assets, onDeleteAsset }: AssetLibraryProps) {
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video" | "audio">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [previewAsset, setPreviewAsset] = useState<GeneratedAsset | null>(null)

  const filteredAssets = assets.filter((asset) => {
    const matchesType = selectedType === "all" || asset.type === selectedType
    const matchesSearch =
      asset.prompt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.title?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const assetCounts = {
    all: assets.length,
    image: assets.filter((a) => a.type === "image").length,
    video: assets.filter((a) => a.type === "video").length,
    audio: assets.filter((a) => a.type === "audio").length,
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creations..."
            className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-3 border-b border-gray-800 bg-gray-900/50">
        {(["all", "image", "video", "audio"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedType === type
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              {type === "image" && <ImageIcon className="w-3.5 h-3.5" />}
              {type === "video" && <Video className="w-3.5 h-3.5" />}
              {type === "audio" && <Music className="w-3.5 h-3.5" />}
              <span className="capitalize">{type}</span>
              <span className="ml-1 text-xs opacity-70">({assetCounts[type]})</span>
            </div>
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              {selectedType === "image" && <ImageIcon className="w-8 h-8 text-gray-600" />}
              {selectedType === "video" && <Video className="w-8 h-8 text-gray-600" />}
              {selectedType === "audio" && <Music className="w-8 h-8 text-gray-600" />}
              {selectedType === "all" && <ImageIcon className="w-8 h-8 text-gray-600" />}
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">No creations yet</h3>
            <p className="text-xs text-gray-600">
              {searchQuery ? "No results found for your search" : "Start creating with mform to see your assets here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onPreview={() => setPreviewAsset(asset)}
                onDelete={() => onDeleteAsset(asset.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewAsset && <AssetPreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />}
    </div>
  )
}

interface AssetCardProps {
  asset: GeneratedAsset
  onPreview: () => void
  onDelete: () => void
}

function AssetCard({ asset, onPreview, onDelete }: AssetCardProps) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer group border border-gray-700 hover:border-purple-500 transition-all"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onPreview}
    >
      {/* Thumbnail */}
      {asset.type === "image" && asset.url && (
        <img
          src={asset.url || "/placeholder.svg"}
          alt={asset.title || "Generated image"}
          className="w-full h-full object-cover"
        />
      )}
      {asset.type === "video" && asset.url && <video src={asset.url} className="w-full h-full object-cover" muted />}
      {asset.type === "audio" && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-gray-900">
          <Music className="w-12 h-12 text-purple-400" />
        </div>
      )}

      {/* Type Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-xs font-medium text-white backdrop-blur-sm">
        {asset.type}
      </div>

      {/* Hover Actions */}
      {showActions && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (asset.url) {
                const a = document.createElement("a")
                a.href = asset.url
                a.download = asset.title || `asset-${asset.id}`
                a.click()
              }
            }}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title Overlay */}
      {asset.title && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-xs text-white truncate">{asset.title}</p>
        </div>
      )}
    </div>
  )
}

interface AssetPreviewModalProps {
  asset: GeneratedAsset
  onClose: () => void
}

function AssetPreviewModal({ asset, onClose }: AssetPreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          {asset.type === "image" && asset.url && (
            <img src={asset.url || "/placeholder.svg"} alt={asset.title || "Preview"} className="w-full h-auto" />
          )}
          {asset.type === "video" && asset.url && <video src={asset.url} controls className="w-full h-auto" />}
          {asset.type === "audio" && asset.url && (
            <div className="p-8">
              <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg mb-4">
                <Music className="w-24 h-24 text-purple-400" />
              </div>
              <audio src={asset.url} controls className="w-full" />
            </div>
          )}

          {/* Info */}
          <div className="p-4 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">{asset.title || "Untitled"}</h3>
            {asset.prompt && (
              <p className="text-sm text-gray-400 mb-3">
                <span className="font-medium">Prompt:</span> {asset.prompt}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (asset.url) {
                    const a = document.createElement("a")
                    a.href = asset.url
                    a.download = asset.title || `asset-${asset.id}`
                    a.click()
                  }
                }}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
