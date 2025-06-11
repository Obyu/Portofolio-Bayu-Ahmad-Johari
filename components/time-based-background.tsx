"use client"

import { useEffect, useState } from "react"
import { Cloud, Moon, Star, Sun } from "lucide-react"

interface TimeBasedBackgroundProps {
  timeOfDay: "morning" | "day" | "evening" | "night"
  prevTimeOfDay: "morning" | "day" | "evening" | "night"
  isTransitioning: boolean
  scrollY: number
}

export function TimeBasedBackground({ timeOfDay, prevTimeOfDay, isTransitioning, scrollY }: TimeBasedBackgroundProps) {
  const [clouds, setClouds] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; delay: number }>
  >([])
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>
  >([])
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string; speed: number; delay: number }>
  >([])

  // Generate clouds, stars, and particles on mount
  useEffect(() => {
    // Generate clouds
    const newClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 30 + 10,
      size: Math.random() * 0.5 + 0.7, // Scale factor
      speed: Math.random() * 20 + 40, // Animation duration in seconds
      delay: Math.random() * 10, // Animation delay in seconds
    }))
    setClouds(newClouds)

    // Generate stars
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 5,
      size: Math.random() * 0.5 + 0.5, // Scale factor
      opacity: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5, // Animation delay in seconds
    }))
    setStars(newStars)

    // Generate golden hour particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: Math.random() * 4 + 2,
      color: i % 2 === 0 ? "bg-yellow-300" : "bg-orange-300",
      speed: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  const getCloudOpacity = () => {
    if (timeOfDay === "morning") return 0.8
    if (timeOfDay === "day") return 0.4
    if (timeOfDay === "evening") return 0.6
    return 0.2
  }

  const getSunPosition = () => {
    const basePosition = 20
    if (timeOfDay === "morning") return basePosition
    if (timeOfDay === "day") return basePosition - 10
    if (timeOfDay === "evening") return basePosition + 30
    return -100 // Hidden at night
  }

  const getMoonPosition = () => {
    if (timeOfDay === "night") return 20
    return -100 // Hidden during day
  }

  const getSunColor = () => {
    if (timeOfDay === "morning") return "text-orange-400"
    if (timeOfDay === "day") return "text-yellow-400"
    if (timeOfDay === "evening") return "text-orange-500"
    return "text-yellow-400"
  }

  const getCloudColor = () => {
    if (timeOfDay === "night") return "text-indigo-300"
    if (timeOfDay === "evening") return "text-orange-100"
    return "text-white"
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sun with smooth transition */}
      <div
        className="absolute transition-all duration-2000 ease-in-out"
        style={{
          top: `${getSunPosition()}%`,
          right: "10%",
          opacity: timeOfDay === "night" ? 0 : 1,
          transform: `scale(${timeOfDay === "evening" ? 1.2 : 1})`,
          filter: `blur(${timeOfDay === "evening" ? "1px" : "0px"})`,
        }}
      >
        <Sun
          className={`w-20 h-20 ${getSunColor()} animate-pulse transition-colors duration-2000`}
          style={{ animationDuration: "8s" }}
        />
        {/* Sun rays/glow effect */}
        <div
          className={`absolute inset-0 rounded-full ${
            timeOfDay === "evening" ? "bg-orange-400" : timeOfDay === "morning" ? "bg-orange-300" : "bg-yellow-300"
          } opacity-30 blur-xl -z-10 scale-150 transition-all duration-2000`}
        ></div>
      </div>

      {/* Moon with smooth transition */}
      <div
        className="absolute transition-all duration-2000 ease-in-out"
        style={{
          top: `${getMoonPosition()}%`,
          right: "10%",
          opacity: timeOfDay === "night" ? 1 : 0,
        }}
      >
        <Moon className="w-16 h-16 text-purple-200 animate-pulse" style={{ animationDuration: "10s" }} />
        {/* Moon glow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-200 opacity-20 blur-xl -z-10 scale-150"></div>
      </div>

      {/* Dynamic Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute transition-all duration-2000"
          style={{
            top: `${cloud.y}%`,
            left: `${cloud.x}%`,
            opacity: getCloudOpacity() * (cloud.id % 2 === 0 ? 1 : 0.7),
            transform: `scale(${cloud.size}) translateX(${
              timeOfDay === "day" ? (cloud.id % 2 === 0 ? "100px" : "-80px") : "0px"
            })`,
          }}
        >
          <Cloud
            className={`${getCloudColor()} animate-float transition-colors duration-2000`}
            style={{
              width: `${4 + cloud.size * 2}rem`,
              height: `${2 + cloud.size * 2}rem`,
              animationDuration: `${cloud.speed}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          />
        </div>
      ))}

      {/* Stars with fade in/out based on time of day */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse transition-opacity duration-2000"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: timeOfDay === "night" ? star.opacity : 0,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            transform: `scale(${star.size})`,
          }}
        >
          <Star className="w-3 h-3 text-yellow-200" />
        </div>
      ))}

      {/* Golden hour particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${particle.color} rounded-full animate-float transition-opacity duration-2000`}
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: timeOfDay === "evening" ? 0.6 : 0,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.speed}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  )
}
