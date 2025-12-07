"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedLetterProps {
  letter: string
  delay?: number
  className?: string
  fallbackColor?: string
}

export function AnimatedLetter({ letter, delay = 0, className = "", fallbackColor = "text-white" }: AnimatedLetterProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasVideo, setHasVideo] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && hasVideo) {
        videoRef.current.play().catch(() => {
          // If video fails to play, show fallback
          setHasVideo(false)
        })
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, hasVideo])

  const letterUpperCase = letter.toUpperCase()
  const videoPath = `/letters/${letterUpperCase}.mp4`

  if (!hasVideo || letter === " ") {
    // Fallback to static letter or space
    return (
      <span 
        className={`inline-block ${className} ${fallbackColor} ${letter === " " ? "w-8" : ""}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {letter}
      </span>
    )
  }

  return (
    <div className={`inline-block relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <video
        ref={videoRef}
        src={videoPath}
        muted
        playsInline
        loop
        onLoadedData={() => {
          console.log(`✅ Letter video loaded: ${letter} (${videoPath})`)
          setIsLoaded(true)
        }}
        onError={() => {
          console.error(`❌ Letter video failed: ${letter} (${videoPath})`)
          setHasVideo(false)
        }}
        className={`inline-block transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          height: "auto",
          width: "auto",
          maxHeight: "100%",
          display: "inline-block",
          verticalAlign: "middle"
        }}
      />
      {!isLoaded && (
        <span className={`absolute inset-0 flex items-center justify-center ${fallbackColor}`}>
          {letter}
        </span>
      )}
    </div>
  )
}


