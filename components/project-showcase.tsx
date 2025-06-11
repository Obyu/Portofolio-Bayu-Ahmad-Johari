"use client"

import { ProjectCard } from "./project-card"
import { FadeInSection } from "./fade-in-section"

const projects = [
  {
    name: "Web Absensi",
    description:
      "Website yang mempermudah memindahkan data dari Excel ke database dengan interface yang user-friendly dan sistem validasi data otomatis.",
    image: "/project-web-absensi.png",
    tech: ["Laravel", "MySQL", "Excel", "Bootstrap"],
    totoroImage: "/totoro-smile.png",
    gradient: "from-blue-400 to-purple-500",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    name: "WhatsApp Bot AI",
    description:
      "Bot cerdas berbasis AI untuk otomatisasi komunikasi WhatsApp dengan fitur natural language processing dan auto-reply.",
    image: "/project-whatsapp-bot.png",
    tech: ["Python", "AI/ML", "WhatsApp API", "NLP"],
    totoroImage: "/medium-totoro.png",
    gradient: "from-green-400 to-blue-500",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Engineer Hub",
    description:
      "Platform komprehensif untuk engineer mencari pekerjaan, berbagi knowledge, dan membangun network profesional.",
    image: "/project-engineer-hub.png",
    tech: ["Laravel", "JavaScript", "MySQL", "Vue.js"],
    totoroImage: "/totoro-leaf.png",
    gradient: "from-orange-400 to-red-500",
    demoUrl: "#",
    githubUrl: "#",
  },
]

export function ProjectShowcase() {
  return (
    <section className="py-10 sm:py-20 bg-white/10 backdrop-blur-sm relative min-h-screen">
      <div className="container mx-auto relative px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg font-caligula">Proyek Saya</h2>
            <p className="text-white/90 text-base sm:text-lg drop-shadow max-w-2xl mx-auto">
              Karya-karya yang dibuat dengan dedikasi dan inovasi, menggabungkan teknologi modern dengan solusi praktis
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <FadeInSection delay={600}>
          <div className="text-center mt-12">
            <p className="text-white/80 mb-4">Tertarik dengan proyek-proyek saya?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Lihat Semua Proyek
              </button>
              <button className="px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-full font-medium transition-all duration-300 hover:scale-105">
                Hubungi Saya
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
