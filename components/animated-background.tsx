"use client"

import { useEffect, useRef } from "react"

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

interface Shape3D {
  x: number
  y: number
  z: number
  rotX: number
  rotY: number
  rotZ: number
  size: number
  opacity: number
  type: "cube" | "pyramid" | "sphere"
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const firefliesRef = useRef<Firefly[]>([])
  const shapes3DRef = useRef<Shape3D[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initFireflies = () => {
      firefliesRef.current = []
      for (let i = 0; i < 25; i++) {
        firefliesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() * 60 + 320, // Red to purple range
        })
      }
    }

    const init3DShapes = () => {
      shapes3DRef.current = []
      for (let i = 0; i < 8; i++) {
        shapes3DRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 + 50,
          rotX: Math.random() * Math.PI * 2,
          rotY: Math.random() * Math.PI * 2,
          rotZ: Math.random() * Math.PI * 2,
          size: Math.random() * 40 + 20,
          opacity: Math.random() * 0.1 + 0.05,
          type: ["cube", "pyramid", "sphere"][Math.floor(Math.random() * 3)] as "cube" | "pyramid" | "sphere",
        })
      }
    }

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const drawFireflies = () => {
      const scrollY = window.scrollY
      const scrollDelta = scrollY - lastScrollY.current
      lastScrollY.current = scrollY

      firefliesRef.current.forEach((firefly) => {
        // Smooth lerping for position updates
        const lerpFactor = 0.05 // 4x slower than before (was 0.2)

        // Update target positions based on scroll (inverted direction)
        const targetX = firefly.x + firefly.vx - scrollDelta * 0.1
        const targetY = firefly.y + firefly.vy - scrollDelta * 0.05

        // Lerp to target positions
        firefly.x = lerp(firefly.x, targetX, lerpFactor)
        firefly.y = lerp(firefly.y, targetY, lerpFactor)

        // Boundary wrapping
        if (firefly.x < -10) firefly.x = canvas.width + 10
        if (firefly.x > canvas.width + 10) firefly.x = -10
        if (firefly.y < -10) firefly.y = canvas.height + 10
        if (firefly.y > canvas.height + 10) firefly.y = -10

        // Pulsing effect
        const pulse = Math.sin(timeRef.current * 0.003 + firefly.x * 0.01) * 0.3 + 0.7

        ctx.save()
        ctx.globalAlpha = firefly.opacity * pulse
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsl(${firefly.hue}, 100%, 50%)`
        ctx.fillStyle = `hsl(${firefly.hue}, 100%, 50%)`
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const draw3DShapes = () => {
      const scrollY = window.scrollY
      const scrollDelta = scrollY - lastScrollY.current

      shapes3DRef.current.forEach((shape) => {
        // Smooth lerping for 3D shapes
        const lerpFactor = 0.05 // 4x slower

        // Update rotations with 6DOF
        shape.rotX += 0.005
        shape.rotY += 0.003
        shape.rotZ += 0.007

        // Update target positions based on scroll
        const targetX = shape.x - scrollDelta * 0.2
        const targetY = shape.y - scrollDelta * 0.1

        // Lerp to target positions
        shape.x = lerp(shape.x, targetX, lerpFactor)
        shape.y = lerp(shape.y, targetY, lerpFactor)

        // Boundary wrapping
        if (shape.x < -100) shape.x = canvas.width + 100
        if (shape.x > canvas.width + 100) shape.x = -100
        if (shape.y < -100) shape.y = canvas.height + 100
        if (shape.y > canvas.height + 100) shape.y = -100

        // 3D projection
        const perspective = 300
        const scale = perspective / (perspective + shape.z)
        const projectedX = shape.x
        const projectedY = shape.y
        const projectedSize = shape.size * scale

        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.translate(projectedX, projectedY)

        // Draw different shapes
        if (shape.type === "cube") {
          ctx.strokeStyle = `hsl(${0 + timeRef.current * 0.1}, 70%, 50%)`
          ctx.lineWidth = 1
          ctx.strokeRect(-projectedSize / 2, -projectedSize / 2, projectedSize, projectedSize)
        } else if (shape.type === "pyramid") {
          ctx.strokeStyle = `hsl(${120 + timeRef.current * 0.1}, 70%, 50%)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, -projectedSize / 2)
          ctx.lineTo(-projectedSize / 2, projectedSize / 2)
          ctx.lineTo(projectedSize / 2, projectedSize / 2)
          ctx.closePath()
          ctx.stroke()
        } else {
          ctx.strokeStyle = `hsl(${240 + timeRef.current * 0.1}, 70%, 50%)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(0, 0, projectedSize / 2, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.restore()
      })
    }

    const drawWaves = () => {
      const scrollY = window.scrollY

      // Sine wave
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 2
      ctx.beginPath()

      const waveOffset = timeRef.current * 0.002 + scrollY * 0.001 // Moves to the right
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.3 + Math.sin((x + waveOffset) * 0.01) * 50
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()

      // Cosine wave
      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.7 + Math.cos((x + waveOffset) * 0.008) * 30
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      timeRef.current += 16

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawWaves()
      draw3DShapes()
      drawFireflies()

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initFireflies()
    init3DShapes()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initFireflies()
      init3DShapes()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
