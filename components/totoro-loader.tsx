"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface TotoroLoaderProps {
  onLoadComplete?: () => void
}

export function TotoroLoader({ onLoadComplete }: TotoroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            if (onLoadComplete) onLoadComplete()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 bg-sky-400 flex flex-col items-center justify-center z-50">
      <div className="relative w-40 h-40 md:w-64 md:h-64 mb-8 animate-bounce" style={{ animationDuration: "2s" }}>
        <Image src="/totoro-umbrella.png" alt="Totoro Loading" width={300} height={300} className="object-contain" />
      </div>
      <div className="w-64 md:w-80 bg-white/30 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white mt-4 font-medium">{`Loading Totoro's World... `}{Math.round(progress)}%</p>
    </div>
  )
}
