"use client"

import type { UIMessage } from "ai"
import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface ChatMessageProps {
  message: UIMessage
  onPlayAudio?: (text: string) => void
}

export function ChatMessage({ message, onPlayAudio }: ChatMessageProps) {
  const isUser = message.role === "user"

  const textContent =
    message.parts
      ?.filter((part: any) => part.type === "text")
      .map((part: any) => part.text)
      .join("") || ""

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <Card className={`max-w-[80%] p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <div className="flex flex-col gap-2">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{textContent}</ReactMarkdown>
          </div>

          {/* TTS Button for assistant messages */}
          {!isUser && onPlayAudio && textContent && (
            <Button size="sm" variant="ghost" onClick={() => onPlayAudio(textContent)} className="mt-2 self-end">
              <Play className="h-4 w-4 mr-1" />
              Play Audio
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
