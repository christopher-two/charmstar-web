import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'process', label: 'Proceso' },
    { id: 'contact', label: 'Contacto' },
    { id: 'impact', label: 'Impacto' },
]

export function LandingSidebar() {
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        )

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="fixed left-0 top-0 h-screen w-16 md:w-24 hidden lg:flex flex-col justify-center items-center z-40 bg-background border-r transition-colors duration-700">
            <div className="flex flex-col gap-8">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center justify-center"
                        title={section.label}
                    >
                        {/* Dot Indicator */}
                        <div
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300",
                                activeSection === section.id
                                    ? "bg-foreground scale-125"
                                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground"
                            )}
                        />

                        {/* Label (Tooltip style) */}
                        <span className={cn(
                            "absolute left-full ml-4 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 transition-opacity whitespace-nowrap pointer-events-none",
                            "group-hover:opacity-100"
                        )}>
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
