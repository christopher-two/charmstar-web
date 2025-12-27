import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { useCart } from '../context/CartContext'

export function Navbar() {
    const [isOpen, setIsOpenState] = useState(false)
    const { items, setIsOpen } = useCart()
    const location = useLocation()

    // Handle scroll to anchor when location changes
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1))
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [location])

    const navLinks = [
        { name: 'Colecciones', href: '/shop' },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Left: Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 w-1/3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo (Desktop & Mobile) */}
                    <div className="flex w-full md:w-1/3 justify-start md:justify-center">
                        <Link to="/" className="text-2xl font-bold font-serif tracking-tight text-foreground">
                            CHARM STAR
                        </Link>
                    </div>

                    {/* Right: Actions (Desktop) */}
                    <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
                        {location.pathname !== '/' && <ModeToggle />}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={() => setIsOpen(true)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                    {items.length}
                                </span>
                            )}
                        </Button>
                        <Link to="/shop">
                            <Button>
                                Ir a la Tienda
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button + Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        {location.pathname !== '/' && <ModeToggle />}
                        <button
                            className="p-2 text-foreground"
                            onClick={() => setIsOpenState(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t bg-background p-4">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpenState(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/shop" onClick={() => setIsOpenState(false)}>
                            <Button className="w-full">
                                Ir a la Tienda
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
