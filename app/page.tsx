"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Gamepad2,
  Palette,
  Volume2,
  Zap,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Play,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { useState, useRef, useEffect } from "react"

export default function GameDevPortfolio() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId)

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    // Set timeout for 0.5 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      if (cardId === "gattlebrounds") {
        setPlayingVideo("gattlebrounds")
      }
    }, 500)
  }

  const handleCardLeave = () => {
    setHoveredCard(null)

    // Clear timeout if leaving before 0.5 seconds
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Advanced Animated Background */}
      <AnimatedBackground />

      {/* Static Background Grid Pattern */}
      <div
        className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Subtle overlay to ensure readability */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none" style={{ zIndex: 3 }} />

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">
              <span className="text-red-500">{"$\"{"}</span>
              <span className="mx-0">Arklite</span>
              <span className="text-red-500">{"}\""}</span>
            </div>
            <div className="hidden md:flex items-center h-full">
              {/* Angled separator before navigation */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent transform rotate-12 mr-8"></div>

              <Link
                href="#about"
                className="hover:text-red-400 transition-colors h-full flex items-center px-4 hover:bg-red-500/10"
              >
                About
              </Link>
              <Link
                href="#skills"
                className="hover:text-red-400 transition-colors h-full flex items-center px-4 hover:bg-red-500/10"
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="hover:text-red-400 transition-colors h-full flex items-center px-4 hover:bg-red-500/10"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="hover:text-red-400 transition-colors h-full flex items-center px-4 hover:bg-red-500/10"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ zIndex: 10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto -mt-16">
            <div className="mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 mb-6">
                <div className="bg-black rounded-full p-6">
                  <Gamepad2 className="w-12 h-12 text-red-500" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Arklite</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Programmer by trade, with a versatile game development skill set honed over five years. Crafting enjoyable gameplay experiences from early concepts to evolving prototypes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-400 text-white border-0 transition-colors">
                <Play className="w-4 h-4 mr-2" />
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/20 hover:text-white bg-transparent transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-red-500">Multi-Disciplinary</span> Skills
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Building games requires mastery across multiple domains. Here's my current skill set and areas of growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="bg-gray-900/50 border-red-500/30 transition-all duration-300 group shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Code className="w-6 h-6 text-red-500" />
                </div>
                <CardTitle className="text-white">Programming</CardTitle>
                <CardDescription className="text-gray-400">Core Expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    C#
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Godot
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Unity
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Game Logic
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-red-500/30 transition-all duration-300 group shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Zap className="w-6 h-6 text-red-500" />
                </div>
                <CardTitle className="text-white">QA Testing</CardTitle>
                <CardDescription className="text-gray-400">Professional Experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Bug Testing
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Edge Cases
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    UX Feedback
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Stability
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-red-500/30 transition-all duration-300 group shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Volume2 className="w-6 h-6 text-red-500" />
                </div>
                <CardTitle className="text-white">Audio Design</CardTitle>
                <CardDescription className="text-gray-400">Sound & SFX</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    SFX Creation
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Mixing
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Layering
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Filtering
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-red-500/30 transition-all duration-300 group shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Monitor className="w-6 h-6 text-red-500" />
                </div>
                <CardTitle className="text-white">Content Producer</CardTitle>
                <CardDescription className="text-gray-400">Video & Editing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    DaVinci Resolve
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    FFmpeg
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Tutorials
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Bash Scripts
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-red-500/30 transition-all duration-300 group shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Palette className="w-6 h-6 text-red-500" />
                </div>
                <CardTitle className="text-white">Visual Designer</CardTitle>
                <CardDescription className="text-gray-400">Brand & Identity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Iconography
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Brand Identity
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Color Theory
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-100 hover:bg-red-500/30 hover:text-white transition-colors">
                    Storefront
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/20 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="text-red-500">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of games and interactive experiences I've developed, from solo projects to collaborative
              efforts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card
              className="bg-black/50 border-red-500/30 overflow-hidden group transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50"
              onMouseEnter={() => handleCardHover("gattlebrounds")}
              onMouseLeave={handleCardLeave}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden">
                {playingVideo === "gattlebrounds" ? (
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source src="/game-dev-portfolio/videos/gattlebrounds-showcase.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center relative">
                    {/* Top-down action adventure visualization */}
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
                      <defs>
                        <linearGradient id="golemGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(147, 51, 234, 0.8)" />
                          <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
                          <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
                        </linearGradient>
                      </defs>

                      {/* Cyber golem character (top-down view) */}
                      <circle cx="200" cy="120" r="12" fill="none" stroke="url(#golemGlow)" strokeWidth="2" />
                      <circle cx="200" cy="120" r="8" fill="rgba(147, 51, 234, 0.3)" />

                      {/* Movement trail */}
                      <path
                        d="M180 140 Q190 130 200 120 Q210 110 220 100"
                        stroke="rgba(236, 72, 153, 0.6)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="3,3"
                      />

                      {/* Platforming elements */}
                      <rect x="120" y="80" width="40" height="8" fill="none" stroke="url(#golemGlow)" strokeWidth="1" />
                      <rect
                        x="240"
                        y="160"
                        width="40"
                        height="8"
                        fill="none"
                        stroke="url(#golemGlow)"
                        strokeWidth="1"
                      />
                      <rect x="80" y="180" width="30" height="8" fill="none" stroke="url(#golemGlow)" strokeWidth="1" />

                      {/* Otherworldly environment elements */}
                      <circle cx="100" cy="60" r="15" fill="none" stroke="rgba(147, 51, 234, 0.4)" strokeWidth="1" />
                      <circle cx="320" cy="180" r="20" fill="none" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1" />

                      {/* Skydiving trajectory */}
                      <path
                        d="M350 50 Q300 80 250 110 Q200 140 150 170"
                        stroke="rgba(147, 51, 234, 0.5)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                      />

                      {/* Action elements (projectiles/effects) */}
                      <circle cx="160" cy="100" r="2" fill="rgba(236, 72, 153, 0.8)" />
                      <circle cx="240" cy="140" r="2" fill="rgba(147, 51, 234, 0.8)" />
                      <circle cx="280" cy="80" r="2" fill="rgba(236, 72, 153, 0.8)" />
                    </svg>

                    {/* Scanning effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-600 text-white">In Development</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Gattlebrounds
                  <Monitor className="w-4 h-4 text-gray-400" />
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Top-down action adventure shooter with challenging platforming and skydiving through otherworldly
                  environments as a cyber golem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Godot Engine
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    C#
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Single Player
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 hover:text-white bg-transparent transition-colors"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-black/50 border-red-500/30 overflow-hidden group transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50"
              onMouseEnter={() => handleCardHover("cyber-runner")}
              onMouseLeave={handleCardLeave}
            >
              <div className="aspect-video bg-gradient-to-br from-red-500/10 to-purple-500/10 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative">
                  {/* Cyberpunk circuit pattern */}
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
                    <defs>
                      <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
                        <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
                        <stop offset="100%" stopColor="rgba(239, 68, 68, 0.4)" />
                      </linearGradient>
                    </defs>

                    {/* Circuit board traces */}
                    <path
                      d="M50 50 L150 50 L150 100 L250 100 L250 150 L350 150"
                      stroke="url(#neonGlow)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.7"
                    />
                    <path
                      d="M100 190 L200 190 L200 140 L300 140 L300 90 L350 90"
                      stroke="url(#neonGlow)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                    <path
                      d="M50 120 L120 120 L120 180 L180 180"
                      stroke="url(#neonGlow)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />

                    {/* Circuit nodes */}
                    <circle cx="150" cy="50" r="4" fill="rgba(239, 68, 68, 0.8)" />
                    <circle cx="250" cy="100" r="4" fill="rgba(147, 51, 234, 0.8)" />
                    <circle cx="200" cy="140" r="4" fill="rgba(239, 68, 68, 0.8)" />
                    <circle cx="120" cy="120" r="4" fill="rgba(147, 51, 234, 0.8)" />

                    {/* Central processor */}
                    <rect
                      x="180"
                      y="100"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="url(#neonGlow)"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    <rect x="185" y="105" width="30" height="30" fill="rgba(239, 68, 68, 0.1)" />
                  </svg>

                  {/* Animated scan line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-600 text-white">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Cyber Runner
                  <div className="flex gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <Smartphone className="w-4 h-4 text-gray-400" />
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  A fast-paced cyberpunk endless runner with procedural level generation and dynamic difficulty scaling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Unity
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    C#
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Mobile
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-400 transition-colors">
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 hover:text-white bg-transparent transition-colors"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-black/50 border-red-500/30 overflow-hidden group transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50"
              onMouseEnter={() => handleCardHover("quantum-puzzles")}
              onMouseLeave={handleCardLeave}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-green-500/10 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-black to-teal-900 flex items-center justify-center relative">
                  {/* Quantum particle visualization */}
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
                    <defs>
                      <radialGradient id="quantumGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                      </radialGradient>
                    </defs>

                    {/* Quantum wave patterns */}
                    <path
                      d="M50 120 Q100 80 150 120 T250 120 T350 120"
                      stroke="rgba(59, 130, 246, 0.6)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M50 140 Q100 180 150 140 T250 140 T350 140"
                      stroke="rgba(16, 185, 129, 0.6)"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Quantum particles */}
                    <circle cx="100" cy="100" r="6" fill="url(#quantumGlow)" opacity="0.8" />
                    <circle cx="200" cy="160" r="8" fill="url(#quantumGlow)" opacity="0.6" />
                    <circle cx="300" cy="80" r="5" fill="url(#quantumGlow)" opacity="0.9" />

                    {/* Entanglement lines */}
                    <line
                      x1="100"
                      y1="100"
                      x2="200"
                      y2="160"
                      stroke="rgba(147, 51, 234, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="200"
                      y1="160"
                      x2="300"
                      y2="80"
                      stroke="rgba(147, 51, 234, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  </svg>

                  {/* Quantum field effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">Web</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Quantum Puzzles
                  <Globe className="w-4 h-4 text-gray-400" />
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Mind-bending puzzle game exploring quantum mechanics concepts through interactive gameplay.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    JavaScript
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    WebGL
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Physics
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-400 transition-colors">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Play Online
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 hover:text-white bg-transparent transition-colors"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Source
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-black/50 border-red-500/30 overflow-hidden group transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/50"
              onMouseEnter={() => handleCardHover("developer-tools")}
              onMouseLeave={handleCardLeave}
            >
              <div className="aspect-video bg-gradient-to-br from-orange-500/10 to-red-500/10 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-900 via-black to-red-900 flex items-center justify-center relative">
                  {/* Developer tools interface */}
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
                    <defs>
                      <linearGradient id="toolGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(249, 115, 22, 0.8)" />
                        <stop offset="50%" stopColor="rgba(239, 68, 68, 0.6)" />
                        <stop offset="100%" stopColor="rgba(249, 115, 22, 0.4)" />
                      </linearGradient>
                    </defs>

                    {/* Code editor interface */}
                    <rect x="50" y="50" width="300" height="140" fill="none" stroke="url(#toolGlow)" strokeWidth="2" />
                    <rect x="50" y="50" width="300" height="25" fill="rgba(249, 115, 22, 0.1)" />

                    {/* Code lines */}
                    <line x1="70" y1="100" x2="180" y2="100" stroke="rgba(249, 115, 22, 0.6)" strokeWidth="2" />
                    <line x1="70" y1="120" x2="220" y2="120" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" />
                    <line x1="70" y1="140" x2="160" y2="140" stroke="rgba(249, 115, 22, 0.6)" strokeWidth="2" />
                    <line x1="70" y1="160" x2="200" y2="160" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" />

                    {/* Tool icons */}
                    <rect x="260" y="100" width="15" height="15" fill="none" stroke="url(#toolGlow)" strokeWidth="1" />
                    <rect x="280" y="100" width="15" height="15" fill="none" stroke="url(#toolGlow)" strokeWidth="1" />
                    <rect x="300" y="100" width="15" height="15" fill="none" stroke="url(#toolGlow)" strokeWidth="1" />
                  </svg>

                  {/* Compilation effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-600 text-white">Tools</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white">Developer Tools</CardTitle>
                <CardDescription className="text-gray-400">
                  Custom tools and utilities I've built to streamline game development workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Unity Editor
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Python
                  </Badge>
                  <Badge variant="outline" className="border-red-500/50 text-red-400">
                    Automation
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 hover:text-white bg-transparent transition-colors"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    View Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                About <span className="text-red-500">Me</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    I'm a passionate game developer with a solid foundation in programming, 
                    driven to create unique games through a deep dive into every aspect of development. 
                    My journey began with code, and I’m continually broadening my skills across programming, 
                    art, sound design, game design theory, and even pipelines and workflows.
                  </p>
                  <p>
                    Currently, I’m honing my C# skills with Godot while maintaining proficiency with Unity. 
                    My focus is on crafting games that blend my love for diverse gameplay experiences—drawn 
                    from years of playing everything from competitive titles to single-player adventures—into fresh, 
                    enjoyable mechanics and systems.
                  </p>
                  <p>
                    When I’m not coding or designing, I enjoy analyzing games, experimenting with new tools, 
                    and contributing to the indie game community, like with my Stat Tracker tool for Diablo: The Hell 2 mod, 
                    which enhances player experience through data insights.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-500">7+</div>
                    <div className="text-sm text-gray-400">Years Programming</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-500">5</div>
                    <div className="text-sm text-gray-400">Projects Contributed</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-500">1</div>
                    <div className="text-sm text-gray-400">Prototype In Development</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-500">7+</div>
                    <div className="text-sm text-gray-400">Skills Mastered</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center relative">
                    {/* Developer portrait placeholder */}
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 300 300">
                      <defs>
                        <radialGradient id="profileGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                          <stop offset="70%" stopColor="rgba(147, 51, 234, 0.2)" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>

                      {/* Abstract developer representation */}
                      <circle cx="150" cy="120" r="40" fill="none" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" />
                      <rect
                        x="120"
                        y="160"
                        width="60"
                        height="80"
                        fill="none"
                        stroke="rgba(239, 68, 68, 0.6)"
                        strokeWidth="2"
                      />

                      {/* Code symbols floating around */}
                      <text x="80" y="80" fill="rgba(239, 68, 68, 0.4)" fontSize="16" fontFamily="monospace">
                        {"<>"}
                      </text>
                      <text x="220" y="100" fill="rgba(147, 51, 234, 0.4)" fontSize="16" fontFamily="monospace">
                        {"{}"}
                      </text>
                      <text x="60" y="200" fill="rgba(239, 68, 68, 0.4)" fontSize="16" fontFamily="monospace">
                        {"[]"}
                      </text>
                      <text x="240" y="220" fill="rgba(147, 51, 234, 0.4)" fontSize="16" fontFamily="monospace">
                        {"()"}
                      </text>

                      {/* Connecting lines */}
                      <line
                        x1="100"
                        y1="90"
                        x2="130"
                        y2="110"
                        stroke="rgba(239, 68, 68, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />
                      <line
                        x1="200"
                        y1="110"
                        x2="170"
                        y2="130"
                        stroke="rgba(147, 51, 234, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />

                      {/* Background glow */}
                      <circle cx="150" cy="150" r="120" fill="url(#profileGlow)" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/20 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Let's <span className="text-red-500">Connect</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Interested in collaborating, have a project in mind, or just want to chat about games? I'd love to hear
              from you.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-black/50 border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Email</h3>
                  <div id="email-container">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-white bg-transparent"
                      onClick={() => {
                        const container = document.getElementById("email-container")
                        if (container) {
                          container.innerHTML = '<p class="text-gray-400 text-sm">hello@arklite.dev</p>'
                        }
                      }}
                    >
                      Reveal Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                    <Github className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">GitHub</h3>
                  <p className="text-gray-400 text-sm">@gamedev</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">LinkedIn</h3>
                  <p className="text-gray-400 text-sm">@gamedev</p>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="bg-red-600 hover:bg-red-400 text-white transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative bg-black" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0 flex items-center">
              © {new Date().getFullYear()} Arklite
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500/50 to-transparent transform rotate-12 mx-4"></div>
              Multi-disciplinary game developer
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500/50 to-transparent transform rotate-12"></div>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500/50 to-transparent transform rotate-12"></div>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
