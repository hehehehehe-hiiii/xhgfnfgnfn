"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion"

interface ParallaxProps {
    children: React.ReactNode
    speed?: number
    className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"].map(v =>
        `${parseFloat(v) * speed}px`
    ))

    const springY = useSpring(y, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <motion.div ref={ref} style={{ y: springY }} className={className}>
            {children}
        </motion.div>
    )
}

export function ParallaxText({ children, speed = 1, className = "" }: ParallaxProps) {
    const { scrollY } = useScroll()
    const transformY = useTransform(scrollY, [0, 500], [0, 100 * speed])

    return (
        <motion.div style={{ y: transformY }} className={className}>
            {children}
        </motion.div>
    )
}
