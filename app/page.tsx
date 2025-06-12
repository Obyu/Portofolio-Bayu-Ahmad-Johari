"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Mail, Phone, GraduationCap, Briefcase, Volume2, VolumeX, Menu, X } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { FadeInSection } from "@/components/fade-in-section"
import { TotoroCharacters } from "@/components/totoro-characters"
import { FloatingElements } from "@/components/floating-elements"
import { SceneTransition } from "@/components/scene-transition"
import { RainEffect } from "@/components/rain-effect"
import { TotoroLoader } from "@/components/totoro-loader"
import { FallingLeaves } from "@/components/falling-leaves"
import { MagicalEffects } from "@/components/magical-effects"
import { SootSprites } from "@/components/soot-sprites"
import { ProjectCard } from "@/components/project-card"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [isRaining, setIsRaining] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [currentYear, setCurrentYear] = useState("") // For hydration fix

  // Refs for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.5 })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 })
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3 })
  const [contactRef, contactInView] = useInView({ threshold: 0.3 })

  // Project data
  const projects = [
    {
      name: "Web Absensi",
      description: "Website yang mempermudah memindahkan data dari Excel ke database",
      image: "/absen-cloud.png",
      tech: ["Laravel", "MySQL", "Excel"],
      totoroImage: "/totoro-smile.png",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      name: "WhatsApp Bot",
      description: "Bot berbasis AI untuk otomatisasi komunikasi WhatsApp",
      image: "/whatsapp.png",
      tech: ["Python", "AI/ML", "WhatsApp API"],
      totoroImage: "/medium-totoro.png",
      gradient: "from-green-400 to-blue-500",
    },
    {
      name: "Engineer Hub",
      description: "Portal untuk engineer mencari pekerjaan dan tempat berkumpul",
      image: "/image.png",
      tech: ["Laravel", "JavaScript", "MySQL"],
      totoroImage: "/totoro-leaf.png",
      gradient: "from-orange-400 to-red-500",
    },
  ]

  // Set current year on client-side only to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  // Initialize audio on client-side only
  useEffect(() => {
    const audio = new Audio("/totoro-theme.mp3")
    audio.loop = true
    audio.volume = 0.3
    audio.preload = "auto"
    setAudioElement(audio)

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Auto-play music after loading is complete
  useEffect(() => {
    if (!isLoading && audioElement && !hasUserInteracted) {
      // Try to auto-play music
      const playMusic = async () => {
        try {
          await audioElement.play()
          setIsMusicPlaying(true)
        } catch (error) {
          // Auto-play blocked by browser, will need user interaction
          console.log("Auto-play blocked, waiting for user interaction", error)
        }
      }

      // Small delay to ensure everything is loaded
      setTimeout(playMusic, 1000)
    }
  }, [isLoading, audioElement, hasUserInteracted])

  // Handle first user interaction to enable auto-play
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && audioElement && !isMusicPlaying) {
        setHasUserInteracted(true)
        try {
          await audioElement.play()
          setIsMusicPlaying(true)
        } catch (error) {
          console.log("Could not auto-play music", error)
        }
      }
    }

    // Listen for any user interaction
    const events = ["click", "touchstart", "keydown", "scroll"]
    events.forEach((event) => {
      document.addEventListener(event, handleFirstInteraction, { once: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [hasUserInteracted, audioElement, isMusicPlaying])

  // Toggle music
  const toggleMusic = () => {
    if (audioElement) {
      if (isMusicPlaying) {
        audioElement.pause()
        setIsMusicPlaying(false)
      } else {
        audioElement.play()
        setIsMusicPlaying(true)
      }
      setHasUserInteracted(true)
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Toggle rain effect based on scroll position
      setIsRaining(currentScrollY > 500 && currentScrollY < 1500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (heroInView) setCurrentSection("hero")
    else if (projectsInView) setCurrentSection("projects")
    else if (skillsInView) setCurrentSection("skills")
    else if (experienceInView) setCurrentSection("experience")
    else if (contactInView) setCurrentSection("contact")
  }, [heroInView, projectsInView, skillsInView, experienceInView, contactInView])

  return (
    <>
      {isLoading && <TotoroLoader onLoadComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen relative overflow-hidden">
        {/* Background transitions */}
        <SceneTransition currentSection={currentSection} />

        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image src="/totoro-bg.png" alt="Totoro Background" fill className="object-cover opacity-20" priority />
        </div>

        {/* Animated Elements */}
        <TotoroCharacters currentSection={currentSection} scrollY={scrollY} />
        <FloatingElements />
        <RainEffect isRaining={isRaining} />
        <FallingLeaves currentSection={currentSection} />
        <MagicalEffects currentSection={currentSection} scrollY={scrollY} />
        <SootSprites currentSection={currentSection} />

        {/* Grass Foreground */}
        <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-green-500 to-transparent z-5 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-16 bg-green-600 opacity-80"></div>
        </div>

        {/* Music Status Indicator */}
        {isMusicPlaying && (
          <div className="fixed top-4 left-4 z-30 bg-green-600/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs flex items-center gap-2 animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>🎵 Totoro Theme Playing</span>
          </div>
        )}

        <header className="container mx-auto py-4 sm:py-6 relative z-20 px-4">
          <nav className="flex items-center justify-between">
            <div className="text-white font-bold text-lg sm:text-2xl flex items-center gap-2 drop-shadow-lg">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src="/totoro-smile.png"
                  alt="Totoro Logo"
                  width={40}
                  height={40}
                  className="object-contain animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <span className="hidden sm:inline">{`Bayu's Portfolio`}</span>
              <span className="sm:hidden">Bayu</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#projects"
                className="text-white hover:text-green-200 transition-colors font-medium drop-shadow"
              >
                Proyek
              </Link>
              <Link
                href="#skills"
                className="text-white hover:text-green-200 transition-colors font-medium drop-shadow"
              >
                Keahlian
              </Link>
              <Link
                href="#experience"
                className="text-white hover:text-green-200 transition-colors font-medium drop-shadow"
              >
                Pengalaman
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-green-200 transition-colors font-medium drop-shadow"
              >
                Kontak
              </Link>
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full px-6">Resume</Button>
              <button
                onClick={toggleMusic}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative"
                aria-label={isMusicPlaying ? "Pause music" : "Play music"}
              >
                {isMusicPlaying ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
                {isMusicPlaying && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleMusic}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative"
                aria-label={isMusicPlaying ? "Pause music" : "Play music"}
              >
                {isMusicPlaying ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
                {isMusicPlaying && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl z-50">
              <div className="p-4 space-y-4">
                <Link
                  href="#projects"
                  className="block text-white hover:text-green-200 transition-colors font-medium drop-shadow py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Proyek
                </Link>
                <Link
                  href="#skills"
                  className="block text-white hover:text-green-200 transition-colors font-medium drop-shadow py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Keahlian
                </Link>
                <Link
                  href="#experience"
                  className="block text-white hover:text-green-200 transition-colors font-medium drop-shadow py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pengalaman
                </Link>
                <Link
                  href="#contact"
                  className="block text-white hover:text-green-200 transition-colors font-medium drop-shadow py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kontak
                </Link>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </Button>
              </div>
            </div>
          )}
        </header>

        <main className="relative z-10">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="container mx-auto py-10 sm:py-20 flex flex-col items-center gap-8 sm:gap-12 min-h-screen px-4"
          >
            <FadeInSection>
              <div className="w-full text-center lg:text-left lg:flex-1 space-y-4 sm:space-y-6">
                <div className="text-white drop-shadow-lg">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 font-caligula">
                    Halo! Saya <br />
                    <span className="text-green-200 font-aquarium">Bayu Ahmad Johari</span>
                  </h1>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100 mb-4 sm:mb-6">
                    Backend Developer
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl text-green-100 mb-6 sm:mb-8">Specializing in AI</h3>
                </div>
                <p className="text-white text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed drop-shadow">
                  Seperti Totoro yang menjaga hutan, saya menjaga dan membangun sistem backend yang kuat dan cerdas
                  dengan teknologi AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full px-6 sm:px-8 py-3">
                    Lihat Proyek <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-3"
                  >
                    Hubungi Saya
                  </Button>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={300}>
              <div className="w-full flex justify-center lg:flex-1">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white/20 backdrop-blur-md shadow-2xl relative overflow-hidden border-4 border-white/30 animate-glow">
                  <div className="absolute inset-0">
                    <Image
                      src="/Profile-bayu-totoro.jpg"
                      alt="Bayu Ahmad Johari"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full animate-float"
                      style={{ animationDuration: "6s" }}
                      priority
                    />
                  </div>
                  {/* Floating soot sprites around profile */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 bg-black rounded-full animate-bounce opacity-80">
                    <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1 h-0.5 sm:w-2 sm:h-1 bg-white rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-0.5 sm:w-2 sm:h-1 bg-white rounded-full"></div>
                  </div>
                  <div
                    className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-6 sm:h-6 bg-black rounded-full animate-bounce opacity-80"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 sm:w-1 sm:h-0.5 bg-white rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 sm:w-1 sm:h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* Projects Section */}
          <section
            ref={projectsRef}
            id="projects"
            className="py-10 sm:py-20 bg-white/10 backdrop-blur-sm relative min-h-screen"
          >
            <div className="container mx-auto relative px-4">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center drop-shadow-lg font-caligula">
                  Proyek Saya
                </h2>
                <p className="text-white/90 text-center mb-8 sm:mb-12 text-base sm:text-lg drop-shadow">
                  Karya-karya yang dibuat dengan dedikasi dan inovasi
                </p>
              </FadeInSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section ref={skillsRef} id="skills" className="py-10 sm:py-20 relative min-h-screen">
            <div className="container mx-auto relative px-4">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center drop-shadow-lg font-caligula">
                  Keahlian Saya
                </h2>
                <p className="text-white/90 text-center mb-8 sm:mb-12 text-base sm:text-lg drop-shadow">
                  Teknologi dan soft skill yang saya kuasai
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Programming Skills */}
                <FadeInSection>
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                      <div className="w-6 h-6 sm:w-8 sm:h-8">
                        <Image src="/totoro-smile.png" alt="Totoro" width={32} height={32} className="object-contain" />
                      </div>
                      Programming
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {["Laravel", "JavaScript", "Python"].map((skill) => (
                        <div
                          key={skill}
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                        >
                          <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">{skill}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>

                {/* Social Skills */}
                <FadeInSection delay={200}>
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                      <div className="w-6 h-6 sm:w-8 sm:h-8">
                        <Image
                          src="/medium-totoro.png"
                          alt="Medium Totoro"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      Sosial
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {["Adaptasi", "Teamwork"].map((skill) => (
                        <div
                          key={skill}
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                        >
                          <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">{skill}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section
            ref={experienceRef}
            id="experience"
            className="py-10 sm:py-20 bg-white/10 backdrop-blur-sm relative min-h-screen"
          >
            <div className="container mx-auto relative px-4">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center drop-shadow-lg font-caligula">
                  Pengalaman Saya
                </h2>
                <p className="text-white/90 text-center mb-8 sm:mb-12 text-base sm:text-lg drop-shadow">
                  Perjalanan karir dan pendidikan yang membentuk saya
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Work Experience */}
                <FadeInSection>
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                      <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
                      Pengalaman Kerja
                    </h3>
                    <div className="space-y-6">
                      <div className="border-l-4 border-green-400 pl-4 relative">
                        <div className="absolute -left-6 sm:-left-7 top-0 w-8 h-8 sm:w-10 sm:h-10">
                          <Image
                            src="/totoro-leaf.png"
                            alt="Totoro"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">
                          Internship - PT Yodya Karya Persero
                        </h4>
                        <p className="text-white/90 drop-shadow text-sm sm:text-base">
                          Fokus pada maintenance website dan pembuatan website untuk memudahkan para engineer
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-400 pl-4">
                        <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">
                          Sales Gas Elpigi 50 Kilogram
                        </h4>
                        <p className="text-white/90 drop-shadow text-sm sm:text-base">
                          Pengalaman dalam penjualan dan customer service
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">
                          Mengelola Warung Sayur
                        </h4>
                        <p className="text-white/90 drop-shadow text-sm sm:text-base">
                          Pengalaman dalam manajemen bisnis dan operasional
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>

                {/* Education */}
                <FadeInSection delay={200}>
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/30">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                      <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                      Pendidikan
                    </h3>
                    <div className="border-l-4 border-purple-400 pl-4 relative">
                      <div className="absolute -left-6 sm:-left-7 top-0 w-8 h-8 sm:w-10 sm:h-10">
                        <Image src="/totoro-smile.png" alt="Totoro" width={40} height={40} className="object-contain" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white drop-shadow">SMK Prestasi Prima</h4>
                      <p className="text-white/90 drop-shadow text-sm sm:text-base">
                        Jurusan PPLG (Pemrograman Perangkat Lunak dan Gim)
                      </p>
                      <div className="mt-4 text-4xl sm:text-6xl animate-float" style={{ animationDuration: "5s" }}>
                        🎓
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section ref={contactRef} id="contact" className="py-10 sm:py-20 relative min-h-screen">
            <div className="container mx-auto relative px-4">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center drop-shadow-lg font-caligula">
                  Mari Berkolaborasi
                </h2>
                <p className="text-white/90 text-center mb-8 sm:mb-12 text-base sm:text-lg drop-shadow">
                  Hubungi saya untuk proyek yang menakjubkan
                </p>
              </FadeInSection>
              <FadeInSection delay={300}>
                <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                        <div className="w-6 h-6 sm:w-8 sm:h-8">
                          <Image
                            src="/totoro-umbrella.png"
                            alt="Totoro"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        Kirim Pesan
                      </h3>
                      <form className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-white mb-2 font-medium drop-shadow text-sm sm:text-base"
                          >
                            Nama
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 rounded-2xl bg-white/20 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors text-sm sm:text-base"
                            placeholder="Nama Anda"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-white mb-2 font-medium drop-shadow text-sm sm:text-base"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-2xl bg-white/20 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors text-sm sm:text-base"
                            placeholder="email@anda.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-white mb-2 font-medium drop-shadow text-sm sm:text-base"
                          >
                            Pesan
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-2xl bg-white/20 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors resize-none text-sm sm:text-base"
                            placeholder="Ceritakan proyek atau ide Anda..."
                          ></textarea>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3 shadow-lg">
                          Kirim Pesan ✨
                        </Button>
                      </form>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow">
                        <div className="w-6 h-6 sm:w-8 sm:h-8">
                          <Image
                            src="/totoro-standing.png"
                            alt="Totoro"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        Informasi Kontak
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white/80 font-medium drop-shadow text-sm sm:text-base">Email</p>
                            <p className="text-white font-bold drop-shadow text-sm sm:text-base">
                              bayujohari4@gmail.com
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white/80 font-medium drop-shadow text-sm sm:text-base">No HP</p>
                            <p className="text-white font-bold drop-shadow text-sm sm:text-base">085814242039</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center">
                            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white/80 font-medium drop-shadow text-sm sm:text-base">GitHub</p>
                            <p className="text-white font-bold drop-shadow text-sm sm:text-base break-all">
                              github.com/bayujohari
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </section>
        </main>

        <footer className="bg-green-800/90 backdrop-blur-sm py-6 sm:py-8 relative">
          <div className="container mx-auto text-center text-white relative px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <Image
                  src="/totoro-smile.png"
                  alt="Totoro"
                  width={32}
                  height={32}
                  className="object-contain animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <Image
                  src="/medium-totoro.png"
                  alt="Medium Totoro"
                  width={32}
                  height={32}
                  className="object-contain animate-bounce"
                  style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <Image
                  src="/totoro-leaf.png"
                  alt="Totoro with Leaf"
                  width={32}
                  height={32}
                  className="object-contain animate-bounce"
                  style={{ animationDuration: "3.5s", animationDelay: "1s" }}
                />
              </div>
            </div>
            <p className="text-sm sm:text-lg drop-shadow">
              © {currentYear} Bayu Ahmad Johari. Dibuat dengan 💚 terinspirasi oleh My Neighbor Totoro
            </p>
            <p className="text-green-200 mt-2 drop-shadow text-xs sm:text-base">
              Backend Developer • AI Specialist • Laravel Expert
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
