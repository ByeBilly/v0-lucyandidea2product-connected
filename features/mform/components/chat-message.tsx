"use client"

interface Attachment {
  data: string
  mimeType: string
  type: "image" | "audio"
}

interface ToolCall {
  id: string
  name: string
  args: Record<string, any>
}

interface Message {
  id: string
  role: "user" | "model"
  text?: string
  attachments?: Attachment[]
  toolCalls?: ToolCall[]
  isLoading?: boolean
  isError?: boolean
}

interface ChatMessageProps {
  message: Message
  onPlayAudio?: (text: string) => void
}
// </CHANGE>

import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function ChatMessage({ message, onPlayAudio }: ChatMessageProps) {
  const isUser = message.role === "user"

  if (message.isLoading) {
    return (
      <div className="flex justify-start mb-4">
        <Card className="max-w-[80%] p-4 bg-muted">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/2" />
          </div>
        </Card>
      </div>
    )
  }
  // </CHANGE>

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <Card
        className={`max-w-[80%] p-4 ${isUser ? "bg-primary text-primary-foreground" : message.isError ? "bg-destructive/20 border-destructive" : "bg-muted"}`}
      >
        <div className="flex flex-col gap-2">
          {message.text && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
          {/* </CHANGE> */}

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="text-xs opacity-70">
                  {attachment.type === "image" && <span>📷 Image attached</span>}
                  {attachment.type === "audio" && <span>🎵 Audio attached</span>}
                </div>
              ))}
            </div>
          )}
          {/* </CHANGE> */}

          {message.toolCalls && message.toolCalls.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.toolCalls.map((tool, index) => (
                <div key={index} className="text-xs opacity-70 border-t pt-2">
                  <strong>Tool:</strong> {tool.name}
                  <pre className="text-xs mt-1 opacity-50">{JSON.stringify(tool.args, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
          {/* </CHANGE> */}

          {/* TTS Button for assistant messages */}
          {!isUser && onPlayAudio && message.text && (
            <Button size="sm" variant="ghost" onClick={() => onPlayAudio(message.text!)} className="mt-2 self-end">
              <Play className="h-4 w-4 mr-1" />
              Play Audio
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
