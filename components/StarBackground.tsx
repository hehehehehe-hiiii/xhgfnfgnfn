"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

    useEffect(() => {
        // Performance Optimization: Don't render if system prefers reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: true }) // Optimize canvas context
        if (!ctx) return

        let animationFrameId: number
        let stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initStars()
        }

        const initStars = () => {
            // Optimization: Reduce star count based on screen size
            const starCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 100)
            stars = []
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    speed: Math.random() * 0.2 + 0.05, // Slower for smoother look
                    opacity: Math.random() * 0.5 + 0.1
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Theme awareness: Dark stars for light mode, White stars for dark mode
            // NOTE: With the user reverting to the '64SHOP' look, they likely want a space theme.
            // Space effects usually imply a dark background even in light mode sections, 
            // OR they want the deep blue aesthetic everywhere. 
            // But standard light mode behavior is white BG. 
            // The previous '64SHOP' setup allowed for light mode with dark text on white bg (Step 124 globals.css had light/dark).
            // So dark stars on white bg is correct.

            const isDark = document.documentElement.classList.contains("dark")

            stars.forEach((star) => {
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)

                ctx.fillStyle = isDark
                    ? `rgba(255, 255, 255, ${star.opacity})`
                    : `rgba(15, 23, 42, ${star.opacity})`

                ctx.fill()

                star.y += star.speed
                if (star.y > canvas.height) {
                    star.y = 0
                    star.x = Math.random() * canvas.width
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [theme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-normal"
            style={{ willChange: "transform" }}
        />
    )
}
