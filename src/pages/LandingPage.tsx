import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { LandingSidebar } from '../components/LandingSidebar'
import { MessageCircle, Mail } from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'
import { SEO } from '../components/SEO'

export function LandingPage() {
    const { setTheme } = useTheme()

    useEffect(() => {
        document.documentElement.style.transition = 'background-color 1.5s ease, color 1.5s ease'

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTheme('dark')
                    } else {
                        setTheme('light')
                    }
                })
            },
            {
                threshold: 0.5,
            }
        )

        const element = document.getElementById('impact')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [setTheme])

    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title="Charm Star - Catálogo de Joyería Exclusiva"
                description="Explora nuestra colección de charms, pulseras y accesorios únicos. Estilo Pandora, Van Cleef y Sonny Angel en México."
            />
            <LandingSidebar />

            <section id="home" className="relative h-screen flex items-center bg-muted/30 overflow-hidden pl-0 lg:pl-24">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background z-0" />
                <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center text-center h-full">
                    <h1 className="text-4xl md:text-7xl font-serif font-medium tracking-tight mb-6 animate-fade-in-up text-foreground">
                        Charms Únicos y Especiales
                    </h1>
                    <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 font-light">
                        Cuenta tu historia a través de joyas que reflejan tu personalidad.
                    </p>
                    <Link to="/shop">
                        <Button size="lg" className="rounded-full px-10 py-6 text-xl transition-all duration-300">
                            Ver Catálogo Completo
                        </Button>
                    </Link>
                </div>
            </section>

            <section id="about" className="py-24 bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-serif font-medium text-foreground">Sobre Nosotros</h2>
                            <div className="w-12 h-1 bg-foreground mb-6"></div>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Bienvenido a nuestro catálogo, tu destino ideal para encontrar
                                los accesorios más hermosos estilo Pandora, Van Cleef y Sonny Angel.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Nos apasiona ofrecerte calidad premium y diseños duraderos que
                                te acompañen en tus momentos más especiales. Cada pieza es seleccionada
                                con amor y cuidado.
                            </p>
                        </div>
                        <div className="bg-muted aspect-square rounded-xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic">
                                Imagen Editorial
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="process" className="py-24 bg-muted/20 pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-medium text-foreground">Proceso de Compra</h2>
                        <div className="w-12 h-1 bg-foreground mx-auto mt-4"></div>
                        <p className="text-muted-foreground mt-4">Es muy sencillo adquirir tus piezas favoritas.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: '01', title: 'Explora', desc: 'Navega por nuestro catálogo y elige tus favoritos.' },
                            { number: '02', title: 'Contacta', desc: 'Usa el botón de WhatsApp en el producto para verificar stock.' },
                            { number: '03', title: 'Recibe', desc: 'Coordinamos el pago y envío directamente contigo.' }
                        ].map((step) => (
                            <div key={step.number} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border">
                                <span className="text-5xl font-serif font-bold text-muted/30 mb-4">{step.number}</span>
                                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl font-serif font-medium text-foreground">Contáctanos</h2>
                        <p className="text-muted-foreground text-lg">
                            ¿Tienes dudas sobre algún producto o tu pedido? Estamos aquí para ayudarte.
                        </p>
                        <div className="flex flex-col gap-4 items-center">
                            <a href="https://wa.me/524521793811" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                                <span className="p-3 bg-muted rounded-full">
                                    <MessageCircle className="w-6 h-6" />
                                </span>
                                WhatsApp: +52 452 179 3811
                            </a>
                            <a href="mailto:hola@charmstar.com" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                                <span className="p-3 bg-muted rounded-full">
                                    <Mail className="w-6 h-6" />
                                </span>
                                hola@charmstar.com.mx
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="impact" className="relative h-screen flex items-center justify-center bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-tight max-w-4xl mx-auto italic text-foreground">
                        "La joyería no es solo un accesorio, es el reflejo silencioso de quién eres."
                    </h2>
                </div>
            </section>
        </div>
    )
}
