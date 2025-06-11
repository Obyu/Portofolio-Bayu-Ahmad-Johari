"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface FloatingElement {
  id: number
  x: number
  y: number
  emoji: string
  size: number
  speed: number
  delay: number
  type: "emoji" | "image"
  imageSrc?: string
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create floating nature elements with mix of emojis and images
    const newElements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => {
      const isImage = i % 5 === 0 // Every 5th element is an image
      const imageOptions = ["/white-bunny.png", "/calcifer.png"]

      if (isImage) {
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 80 + 10,
          emoji: ["🌸", "🌿", "🍃", "🦋", "🌼", "🌺"][Math.floor(Math.random() * 6)],
          size: Math.random() * 0.2 + 0.3,
          speed: Math.random() * 10 + 8,
          delay: Math.random() * 5,
          type: "image" as const,
          imageSrc: imageOptions[Math.floor(Math.random() * imageOptions.length)],
        }
      } else {
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 80 + 10,
          emoji: ["🌸", "🌿", "🍃", "🦋", "🌼", "🌺"][Math.floor(Math.random() * 6)],
          size: Math.random() * 0.3 + 0.6,
          speed: Math.random() * 10 + 8,
          delay: Math.random() * 5,
          type: "emoji" as const,
          imageSrc: undefined,
        }
      }
    })

    setElements(newElements)
  }, [])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float opacity-60"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDuration: `${element.speed}s`,
            animationDelay: `${element.delay}s`,
            transform: `scale(${element.size})`,
          }}
        >
          {element.type === "image" && element.imageSrc ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16">
              <Image
                src={element.imageSrc || "/placeholder.svg"}
                alt="Floating Character"
                width={64}
                height={64}
                className="object-contain drop-shadow-lg"
              />
            </div>
          ) : (
            <span className="text-lg sm:text-xl md:text-2xl drop-shadow">{element.emoji}</span>
          )}
        </div>
      ))}
    </div>
  )
}
