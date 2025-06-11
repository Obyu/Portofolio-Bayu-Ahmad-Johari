"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SceneTransitionProps {
  currentSection: string
}

export function SceneTransition({ currentSection }: SceneTransitionProps) {
  const [prevSection, setPrevSection] = useState(currentSection)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (currentSection !== prevSection) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setPrevSection(currentSection)
        setIsTransitioning(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentSection, prevSection])

  const getBackgroundStyle = () => {
    switch (currentSection) {
      case "hero":
        return "from-sky-400 via-sky-300 to-green-300"
      case "projects":
        return "from-sky-500 via-blue-400 to-green-400"
      case "skills":
        return "from-blue-400 via-green-300 to-yellow-200"
      case "experience":
        return "from-orange-300 via-yellow-300 to-green-300"
      case "contact":
        return "from-purple-400 via-blue-400 to-green-300"
      default:
        return "from-sky-400 via-sky-300 to-green-300"
    }
  }

  const getTotoroImage = () => {
    switch (currentSection) {
      case "hero":
        return "/totoro-umbrella.png"
      case "projects":
        return "/totoro-smile.png"
      case "skills":
        return "/totoro-leaf.png"
      case "experience":
        return "/totoro-standing.png"
      case "contact":
        return "/totoro-umbrella2.png"
      default:
        return "/totoro-umbrella.png"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Background gradient that changes with section */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${getBackgroundStyle()} transition-all duration-1000 ease-in-out`}
      ></div>

      {/* Tree branch in top left corner */}
      <div className="absolute top-0 left-0 w-80 h-60 opacity-30">
        <Image src="/tree-branch.png" alt="Tree Branch" width={320} height={240} className="object-contain" />
      </div>

      {/* Sunset cloud in background */}
      <div
        className="absolute top-20 right-10 w-64 h-48 opacity-20 transition-opacity duration-1000"
        style={{ opacity: currentSection === "experience" || currentSection === "contact" ? 0.4 : 0.2 }}
      >
        <Image
          src="/sunset-cloud.png"
          alt="Sunset Cloud"
          width={256}
          height={192}
          className="object-contain animate-float"
          style={{ animationDuration: "12s" }}
        />
      </div>

      {/* Transition overlay */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isTransitioning ? 0.3 : 0 }}
      ></div>

      {/* Transition Totoro silhouette */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isTransitioning ? 1 : 0 }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src={getTotoroImage() || "/placeholder.svg"}
            alt="Totoro Transition"
            width={300}
            height={300}
            className="object-contain"
            style={{ filter: "brightness(0) invert(1) opacity(0.5)" }}
          />
        </div>
      </div>
    </div>
  )
}
