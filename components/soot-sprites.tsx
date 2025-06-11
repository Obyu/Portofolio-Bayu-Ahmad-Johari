"use client"

import { useEffect, useState } from "react"

interface SootSprite {
  id: number
  x: number
  y: number
  size: number
  speed: number
  delay: number
  opacity: number
}

interface SootSpritesProps {
  currentSection: string
}

export function SootSprites({ currentSection }: SootSpritesProps) {
  const [sprites, setSprites] = useState<SootSprite[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create soot sprites with random positions and sizes
    const spriteCount = 12
    const newSprites = Array.from({ length: spriteCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.5,
    }))

    setSprites(newSprites)
  }, [])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className="absolute animate-float transition-all duration-1000"
          style={{
            left: `${sprite.x}%`,
            top: `${sprite.y}%`,
            animationDuration: `${sprite.speed}s`,
            animationDelay: `${sprite.delay}s`,
            opacity: currentSection === "hero" ? sprite.opacity + 0.3 : sprite.opacity,
          }}
        >
          <div
            className="bg-black rounded-full relative transition-all duration-1000"
            style={{ width: sprite.size, height: sprite.size }}
          >
            {/* Eyes with blinking animation */}
            <div
              className="absolute top-1 left-1 w-1 h-0.5 bg-white rounded-full animate-pulse"
              style={{ animationDuration: "3s", animationDelay: `${sprite.id * 0.2}s` }}
            ></div>
            <div
              className="absolute top-1 right-1 w-1 h-0.5 bg-white rounded-full animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: `${sprite.id * 0.3 + 0.5}s` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
