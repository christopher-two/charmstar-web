import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-background py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link to="/" className="text-xl font-bold font-serif tracking-tight mb-2 text-foreground">
                        CHARM STAR
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Charm Star. Todos los derechos reservados.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="https://instagram.com/charm_star_upn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <Instagram className="h-5 w-5" />
                        <span className="text-sm font-medium">@charm_star_upn</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
