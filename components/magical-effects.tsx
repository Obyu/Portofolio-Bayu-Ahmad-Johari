"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface MagicalEffect {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

interface MagicalEffectsProps {
  currentSection: string
  scrollY: number
}

export function MagicalEffects({ currentSection, scrollY }: MagicalEffectsProps) {
  const [sparkles, setSparkles] = useState<MagicalEffect[]>([])
  const [showCalcifer, setShowCalcifer] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create magical sparkles
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 3,
    }))

    setSparkles(newSparkles)
  }, [])

  useEffect(() => {
    if (isClient) {
      // Show Calcifer when scrolling in projects section
      setShowCalcifer(currentSection === "projects" && scrollY > 800)
    }
  }, [currentSection, scrollY, isClient])

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Magical sparkles */}
      {(currentSection === "skills" || currentSection === "projects") &&
        sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-pulse transition-opacity duration-1000"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              opacity: sparkle.opacity,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: "2s",
            }}
          >
            <div
              className="bg-yellow-300 rounded-full"
              style={{
                width: `${3 * sparkle.size}px`,
                height: `${3 * sparkle.size}px`,
                boxShadow: "0 0 8px rgba(255, 255, 0, 0.5)",
              }}
            />
          </div>
        ))}

      {/* Calcifer floating effect */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "20%",
          left: "10%",
          opacity: showCalcifer ? 1 : 0,
          transform: `scale(${showCalcifer ? 0.6 : 0.3}) translateY(${showCalcifer ? "0px" : "50px"})`,
        }}
      >
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <Image
            src="/calcifer.png"
            alt="Calcifer"
            width={96}
            height={96}
            className="object-contain animate-float"
            style={{
              animationDuration: "3s",
              filter: "drop-shadow(0 0 8px rgba(255, 165, 0, 0.5))",
            }}
          />
        </div>
      </div>

      {/* White bunny hopping effect */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "25%",
          right: "15%",
          opacity: currentSection === "hero" ? 0.8 : 0,
          transform: `scale(${currentSection === "hero" ? 0.4 : 0.2})`,
        }}
      >
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16">
          <Image
            src="/white-bunny.png"
            alt="White Bunny"
            width={64}
            height={64}
            className="object-contain animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>
    </div>
  )
}
