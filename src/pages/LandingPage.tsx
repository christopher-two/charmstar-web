import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { LandingSidebar } from '../components/LandingSidebar'
import { MessageCircle, Mail } from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'
import { SEO } from '../components/SEO'
import { products } from '../data/products'
import { Reveal } from '../components/Reveal'
import { ProductCard } from '../components/ProductCard'

export function LandingPage() {
    const { setTheme } = useTheme()
    // Select 4 random products once on mount to simulate "Featured"
    const [featuredProducts] = useState(() => products.sort(() => 0.5 - Math.random()).slice(0, 4))

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
                    <Reveal>
                        <h1 className="text-4xl md:text-7xl font-serif font-medium tracking-tight mb-6 animate-fade-in-up text-foreground">
                            Charms Únicos y Especiales
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 font-light mx-auto">
                            Cuenta tu historia a través de joyas que reflejan tu personalidad.
                        </p>
                    </Reveal>
                    <Reveal delay={400}>
                        <Link to="/shop">
                            <Button size="lg" className="rounded-full px-10 py-6 text-xl transition-all duration-300">
                                Ver Catálogo Completo
                            </Button>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <Reveal>
                        <div className="mb-12 text-center">
                            <h2 className="text-2xl font-serif font-medium text-foreground">Destacados</h2>
                            <div className="w-12 h-1 bg-foreground mx-auto mt-4"></div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product, index) => (
                            <Reveal key={product.id} delay={index * 100} className="h-full">
                                <ProductCard product={product} />
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={300}>
                        <div className="mt-12 text-center">
                            <Link to="/shop">
                                <Button variant="outline" className="rounded-full px-8">
                                    Ver todos los productos
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="about" className="py-24 bg-muted/20 pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <Reveal>
                            <div>
                                <h2 className="text-3xl font-serif font-medium text-foreground">Sobre Nosotros</h2>
                                <div className="w-12 h-1 bg-foreground mx-auto mt-6"></div>
                            </div>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Bienvenido a nuestro catálogo, tu destino ideal para encontrar
                                los accesorios más hermosos estilo Pandora, Van Cleef y Sonny Angel.
                            </p>
                        </Reveal>
                        <Reveal delay={400}>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Nos apasiona ofrecerte calidad premium y diseños duraderos que
                                te acompañen en tus momentos más especiales. Cada pieza es seleccionada
                                con amor y cuidado.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section id="process" className="py-24 bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-serif font-medium text-foreground">Proceso de Compra</h2>
                            <div className="w-12 h-1 bg-foreground mx-auto mt-4"></div>
                            <p className="text-muted-foreground mt-4">Es muy sencillo adquirir tus piezas favoritas.</p>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: '01', title: 'Explora', desc: 'Navega por nuestro catálogo y elige tus favoritos.' },
                            { number: '02', title: 'Contacta', desc: 'Usa el botón de WhatsApp en el producto para verificar stock.' },
                            { number: '03', title: 'Recibe', desc: 'Coordinamos el pago y envío directamente contigo.' }
                        ].map((step, index) => (
                            <Reveal key={step.number} delay={index * 200}>
                                <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border h-full">
                                    <span className="text-5xl font-serif font-bold text-muted/30 mb-4">{step.number}</span>
                                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-xl mx-auto text-center space-y-8">
                        <Reveal>
                            <h2 className="text-3xl font-serif font-medium text-foreground">Contáctanos</h2>
                            <p className="text-muted-foreground text-lg">
                                ¿Tienes dudas sobre algún producto o tu pedido? Estamos aquí para ayudarte.
                            </p>
                        </Reveal>
                        <Reveal delay={200}>
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
                        </Reveal>
                    </div>
                </div>
            </section>

            <section id="impact" className="relative h-screen flex items-center justify-center bg-background pl-0 lg:pl-24">
                <div className="container px-4 md:px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-tight max-w-4xl mx-auto italic text-foreground">
                            "La joyería no es solo un accesorio, es el reflejo silencioso de quién eres."
                        </h2>
                    </Reveal>
                </div>
            </section>
        </div>
    )
}
