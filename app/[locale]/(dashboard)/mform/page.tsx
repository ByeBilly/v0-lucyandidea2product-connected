import { MformInterface } from "@/features/mform/components/mform-interface"
import { MformDemoModeBanner } from "@/features/mform/components/demo-mode-banner"

export default function MformPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-slate-950 border-b border-slate-800">
        <MformDemoModeBanner />
      </div>
      <div className="flex-1">
        <MformInterface />
      </div>
    </div>
  )
}
