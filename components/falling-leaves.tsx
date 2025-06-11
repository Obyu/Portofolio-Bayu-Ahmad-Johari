"use client"

import { useEffect, useState } from "react"

interface Leaf {
  id: number
  x: number
  y: number
  rotation: number
  speed: number
  size: number
  delay: number
}

interface FallingLeavesProps {
  currentSection: string
}

export function FallingLeaves({ currentSection }: FallingLeavesProps) {
  const [leaves, setLeaves] = useState<Leaf[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create falling leaves effect
    const newLeaves = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      speed: Math.random() * 3 + 2,
      size: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
    }))

    setLeaves(newLeaves)
  }, [])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) return null

  const shouldShowLeaves = currentSection === "hero" || currentSection === "skills"

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {shouldShowLeaves &&
        leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute text-green-600 opacity-70 transition-opacity duration-1000"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.size})`,
              animation: `fall-leaf ${leaf.speed}s linear infinite`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            🍃
          </div>
        ))}

      <style jsx global>{`
        @keyframes fall-leaf {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
