import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

interface RevealProps {
    children: React.ReactNode
    className?: string
    delay?: number // delay in ms
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect() // Animate once
                }
            },
            {
                threshold: 0.1, // Trigger when 10% visible
                rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before bottom
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-out transform",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
