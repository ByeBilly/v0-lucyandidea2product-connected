import { TaskResultGridClient } from "@/components/task/task-result-grid-client"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Community Creations
        </h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto">
          Explore amazing content created by our mform community. Images, videos, audio, and more - all generated with
          AI.
        </p>
      </div>

      <TaskResultGridClient />
    </div>
  )
}
