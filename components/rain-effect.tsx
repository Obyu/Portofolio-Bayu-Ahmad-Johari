"use client"

import { useEffect, useState } from "react"

interface RainEffectProps {
  isRaining: boolean
}

export function RainEffect({ isRaining }: RainEffectProps) {
  const [raindrops, setRaindrops] = useState<
    Array<{ id: number; x: number; y: number; length: number; speed: number }>
  >([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (isRaining) {
      const drops = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
      }))
      setRaindrops(drops)
    } else {
      setRaindrops([])
    }
  }, [isRaining])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient || !isRaining) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-blue-200 opacity-70"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: "2px",
            height: `${drop.length}px`,
            animation: `fall ${drop.speed}s linear infinite`,
          }}
        ></div>
      ))}

      <style jsx global>{`
        @keyframes fall {
          from {
            transform: translateY(-100px);
          }
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  )
}
