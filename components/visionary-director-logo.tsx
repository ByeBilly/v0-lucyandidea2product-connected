"use client"

import { AnimatedLetter } from "./animated-letter"

interface VisionaryDirectorLogoProps {
  /** Size preset: sm, md, lg, xl, or custom Tailwind classes */
  size?: "sm" | "md" | "lg" | "xl" | "custom"
  /** Custom className for fine-tuned control */
  className?: string
  /** Delay between each letter animation (ms) */
  letterDelay?: number
  /** Whether to stack words vertically on mobile */
  stackOnMobile?: boolean
}

export function VisionaryDirectorLogo({ 
  size = "lg", 
  className = "",
  letterDelay = 50,
  stackOnMobile = true 
}: VisionaryDirectorLogoProps) {
  
  const sizeClasses = {
    sm: "h-12 md:h-16",      // Small: 48px -> 64px
    md: "h-16 md:h-24",      // Medium: 64px -> 96px
    lg: "h-24 md:h-32 lg:h-40", // Large: 96px -> 128px -> 160px
    xl: "h-32 md:h-40 lg:h-48", // Extra Large: 128px -> 160px -> 192px
    custom: className        // Use custom className
  }

  const letterClass = size === "custom" ? className : sizeClasses[size]
  
  const word1 = "VISIONARY".split("")
  const word2 = "DIRECTOR".split("")

  return (
    <div className={`flex ${stackOnMobile ? "flex-col" : "flex-row"} items-center justify-center gap-4 md:flex-row md:gap-6`}>
      {/* VISIONARY */}
      <div className="flex items-center justify-center gap-1">
        {word1.map((letter, index) => (
          <AnimatedLetter
            key={`visionary-${index}`}
            letter={letter}
            className={letterClass}
            delay={index * letterDelay}
            fallbackColor="text-blue-400"
          />
        ))}
      </div>

      {/* DIRECTOR */}
      <div className="flex items-center justify-center gap-1">
        {word2.map((letter, index) => (
          <AnimatedLetter
            key={`director-${index}`}
            letter={letter}
            className={letterClass}
            delay={(word1.length + index) * letterDelay}
            fallbackColor="text-purple-400"
          />
        ))}
      </div>
    </div>
  )
}

// Export preset versions for convenience
export function VisionaryDirectorLogoHero() {
  return (
    <VisionaryDirectorLogo 
      size="xl" 
      letterDelay={80}
      stackOnMobile={true}
    />
  )
}

export function VisionaryDirectorLogoCompact() {
  return (
    <VisionaryDirectorLogo 
      size="md" 
      letterDelay={30}
      stackOnMobile={false}
    />
  )
}


