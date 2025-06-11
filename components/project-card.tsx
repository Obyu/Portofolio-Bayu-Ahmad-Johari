"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  project: {
    name: string
    description: string
    image: string
    tech: string[]
    totoroImage: string
    gradient: string
    demoUrl?: string
    githubUrl?: string
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false)

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-700 border border-white/30 group">
      <div className={`h-48 sm:h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-2xl shadow-lg animate-float group-hover:scale-110 transition-transform duration-700"
              style={{
                animationDuration: "4s",
                animationDelay: `${index * 0.5}s`,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
            />
            {/* Overlay sangat transparan tanpa blur */}
            <div className="absolute inset-0 bg-white/3 rounded-2xl group-hover:bg-white/5 transition-all duration-300"></div>
          </div>
        </div>

        {/* Mini Totoro */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 z-10">
          <Image
            src={project.totoroImage || "/placeholder.svg"}
            alt="Totoro"
            width={48}
            height={48}
            className="object-contain animate-pulse drop-shadow-lg group-hover:animate-bounce transition-all duration-300"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Badge "Project" */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 z-10 group-hover:bg-white/30 transition-all duration-300">
          <span className="text-white text-xs sm:text-sm font-medium drop-shadow">Project</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 drop-shadow group-hover:text-green-200 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-white/90 mb-4 leading-relaxed drop-shadow text-sm sm:text-base">{project.description}</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          {project.tech.map((tech, techIndex) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-green-600/80 text-white text-xs rounded-full font-medium backdrop-blur-sm hover:bg-green-500/90 transition-colors duration-200"
              style={{ animationDelay: `${techIndex * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-white/10 rounded-full flex-1 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
          >
            <Github className="mr-2 h-4 w-4" /> Kode
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full flex-1 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => project.demoUrl && window.open(project.demoUrl, "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Demo
          </Button>
        </div>

        {/* Tombol Lihat Detail */}
        <Button
          onClick={() => setIsDetailExpanded(!isDetailExpanded)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 hover:scale-105"
          size="sm"
        >
          {isDetailExpanded ? "Tutup Detail ↑" : "Lihat Detail ↓"}
        </Button>

        {/* Detail Section dengan Animasi */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isDetailExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            {/* Totoro Character di Detail */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src={project.totoroImage || "/placeholder.svg"}
                  alt="Detail Totoro"
                  width={80}
                  height={80}
                  className="object-contain animate-bounce drop-shadow-lg"
                  style={{
                    animationDuration: "2s",
                    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                  }}
                />
              </div>
            </div>

            {/* Detail Content */}
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">📋 Fitur Utama:</h4>
                <ul className="text-white/90 text-xs sm:text-sm space-y-1">
                  {project.name === "Web Absensi" && (
                    <>
                      <li>• Import data Excel otomatis</li>
                      <li>• Dashboard admin yang intuitif</li>
                      <li>• Sistem validasi data real-time</li>
                      <li>• Export laporan dalam berbagai format</li>
                    </>
                  )}
                  {project.name === "WhatsApp Bot" && (
                    <>
                      <li>• AI-powered natural language processing</li>
                      <li>• Auto-reply dengan konteks yang tepat</li>
                      <li>• Integrasi dengan multiple APIs</li>
                      <li>• Monitoring dan analytics real-time</li>
                    </>
                  )}
                  {project.name === "Engineer Hub" && (
                    <>
                      <li>• Portal pencarian kerja untuk engineer</li>
                      <li>• Sistem matching skill dan requirement</li>
                      <li>• Community forum dan networking</li>
                      <li>• Profile builder dengan portfolio</li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">🎯 Tantangan & Solusi:</h4>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  {project.name === "Web Absensi" &&
                    "Mengatasi kompleksitas import data Excel dengan berbagai format menjadi sistem database yang terstruktur dan konsisten."}
                  {project.name === "WhatsApp Bot" &&
                    "Mengimplementasikan AI yang dapat memahami konteks percakapan dan memberikan respons yang relevan dan natural."}
                  {project.name === "Engineer Hub" &&
                    "Membangun platform yang dapat menghubungkan engineer dengan perusahaan secara efektif dengan sistem matching yang akurat."}
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">⚡ Teknologi Detail:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.name === "Web Absensi" &&
                    ["Laravel 9", "MySQL 8.0", "PhpSpreadsheet", "Bootstrap 5", "jQuery"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-500/60 text-white text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  {project.name === "WhatsApp Bot" &&
                    ["Python 3.9", "OpenAI API", "WhatsApp Business API", "FastAPI", "Redis"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-green-500/60 text-white text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  {project.name === "Engineer Hub" &&
                    ["Laravel 10", "Vue.js 3", "MySQL", "Tailwind CSS", "Socket.io"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-orange-500/60 text-white text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-2 pt-2">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div
                  className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
