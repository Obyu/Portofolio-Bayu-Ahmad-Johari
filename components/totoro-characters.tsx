"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface TotoroCharactersProps {
  currentSection: string
  scrollY: number
}

export function TotoroCharacters({ currentSection, scrollY }: TotoroCharactersProps) {
  const [isRaining, setIsRaining] = useState(false)

  // Toggle rain effect based on scroll position
  useEffect(() => {
    setIsRaining(scrollY > 500 && scrollY < 1500)
  }, [scrollY])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Main Totoro with umbrella - appears in hero section */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "10%",
          right: "10%",
          opacity: currentSection === "hero" ? 1 : 0,
          transform: `scale(${currentSection === "hero" ? 1 : 0.8}) translateY(${
            currentSection === "hero" ? "0px" : "50px"
          })`,
        }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src="/totoro-umbrella.png"
            alt="Totoro with Umbrella"
            width={300}
            height={300}
            className="object-contain animate-float"
            style={{ animationDuration: "8s" }}
          />
        </div>
      </div>

      {/* Smiling Totoro - appears in projects section */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "15%",
          right: "15%",
          opacity: currentSection === "projects" ? 1 : 0,
          transform: `scale(${currentSection === "projects" ? 1 : 0.8}) translateY(${
            currentSection === "projects" ? "0px" : "50px"
          })`,
        }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src="/totoro-smile.png"
            alt="Smiling Totoro"
            width={300}
            height={300}
            className="object-contain animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>
      </div>

      {/* Totoro with leaf - appears in skills section */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "10%",
          right: "10%",
          opacity: currentSection === "skills" ? 1 : 0,
          transform: `scale(${currentSection === "skills" ? 1 : 0.8}) translateY(${
            currentSection === "skills" ? "0px" : "50px"
          })`,
        }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src="/totoro-leaf.png"
            alt="Totoro with Leaf"
            width={300}
            height={300}
            className="object-contain animate-bounce"
            style={{ animationDuration: "6s" }}
          />
        </div>
      </div>

      {/* Standing Totoro - appears in experience section */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "10%",
          right: "10%",
          opacity: currentSection === "experience" ? 1 : 0,
          transform: `scale(${currentSection === "experience" ? 1 : 0.8}) translateY(${
            currentSection === "experience" ? "0px" : "50px"
          })`,
        }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src="/totoro-standing.png"
            alt="Standing Totoro"
            width={300}
            height={300}
            className="object-contain animate-float"
            style={{ animationDuration: "7s" }}
          />
        </div>
      </div>

      {/* Totoro with umbrella 2 - appears in contact section */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "10%",
          right: "10%",
          opacity: currentSection === "contact" ? 1 : 0,
          transform: `scale(${currentSection === "contact" ? 1 : 0.8}) translateY(${
            currentSection === "contact" ? "0px" : "50px"
          })`,
        }}
      >
        <div className="relative w-40 h-40 md:w-64 md:h-64">
          <Image
            src="/totoro-umbrella2.png"
            alt="Totoro with Umbrella"
            width={300}
            height={300}
            className="object-contain animate-float"
            style={{ animationDuration: "8s" }}
          />
        </div>
      </div>

      {/* Medium Totoro - appears in different positions */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          bottom: "20%",
          left: "10%",
          opacity: currentSection === "hero" || currentSection === "skills" ? 0.9 : 0,
          transform: `scale(${currentSection === "hero" || currentSection === "skills" ? 0.7 : 0.5})`,
        }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/medium-totoro.png"
            alt="Medium Totoro"
            width={150}
            height={150}
            className="object-contain animate-bounce"
            style={{ animationDuration: "5s" }}
          />
        </div>
      </div>

      {/* Catbus - moves across screen */}
      <div
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          top: "30%",
          left: `${Math.min(100, (scrollY / 20) % 120) - 20}%`,
          opacity: currentSection === "projects" ? 1 : 0,
          transform: "translateY(-50%)",
        }}
      >
        <div className="relative w-40 h-24 md:w-64 md:h-40">
          <Image
            src="/catbus.png"
            alt="Catbus"
            width={250}
            height={150}
            className="object-contain"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 100, 0.5))",
            }}
          />
        </div>
      </div>

      {/* Rain effect */}
      {isRaining && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-200 opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "2px",
                height: `${Math.random() * 20 + 10}px`,
                animation: `fall ${Math.random() * 0.5 + 0.7}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}
