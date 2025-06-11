"use client"

interface TotoroSceneProps {
  currentSection: string
  scrollY: number
}

export function TotoroScene({ currentSection, scrollY }: TotoroSceneProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Main Totoro - appears in different positions based on section */}
      <div
        className="absolute transition-all duration-2000 ease-in-out"
        style={{
          bottom: currentSection === "hero" ? "10%" : "5%",
          right: currentSection === "hero" ? "10%" : "5%",
          opacity: currentSection === "contact" ? 0.3 : 0.6,
          transform: `scale(${currentSection === "projects" ? 1.2 : 1})`,
        }}
      >
        <div className="text-6xl md:text-8xl animate-float" style={{ animationDuration: "8s" }}>
          🌳
        </div>
      </div>

      {/* Small Totoro characters */}
      <div
        className="absolute top-1/4 left-10 text-3xl animate-bounce transition-all duration-1000"
        style={{
          opacity: currentSection === "hero" ? 1 : 0.4,
          animationDuration: "4s",
        }}
      >
        🐰
      </div>

      <div
        className="absolute top-1/3 right-1/4 text-2xl animate-bounce transition-all duration-1000"
        style={{
          opacity: currentSection === "skills" ? 1 : 0.4,
          animationDuration: "5s",
          animationDelay: "1s",
        }}
      >
        🐰
      </div>

      {/* Umbrella (iconic from the image) */}
      <div
        className="absolute bottom-1/4 left-1/3 text-4xl animate-pulse transition-all duration-1000"
        style={{
          opacity: currentSection === "projects" ? 0.8 : 0.3,
          animationDuration: "6s",
        }}
      >
        ☂️
      </div>

      {/* Satsuki and Mei characters */}
      <div
        className="absolute bottom-20 left-20 text-2xl animate-bounce transition-all duration-1000"
        style={{
          opacity: currentSection === "experience" ? 1 : 0.5,
          animationDuration: "3s",
        }}
      >
        👧
      </div>

      <div
        className="absolute bottom-16 left-32 text-xl animate-bounce transition-all duration-1000"
        style={{
          opacity: currentSection === "experience" ? 1 : 0.5,
          animationDuration: "3.5s",
          animationDelay: "0.5s",
        }}
      >
        👶
      </div>

      {/* Cat Bus (moves across screen) */}
      <div
        className="absolute top-1/2 transition-all duration-1000 text-3xl"
        style={{
          left: `${Math.min(100, (scrollY / 20) % 120)}%`,
          opacity: currentSection === "projects" ? 1 : 0,
          transform: "translateY(-50%)",
        }}
      >
        🚌
      </div>
    </div>
  )
}
