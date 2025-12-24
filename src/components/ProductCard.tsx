import { MessageCircle } from 'lucide-react'
import type { Product } from '../data/products'
import { Button } from './ui/button'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const phoneNumber = "5215555555555" // TODO: Replace with real number
    const message = `Hola Charm Star, me interesa comprar el ${product.name} de $${product.price}. ¿Está disponible?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className="group relative flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Quick view or secondary image could go here */}
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium text-foreground line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-lg font-semibold text-foreground">${product.price}</p>
            </div>

            <div className="mt-auto pt-2">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                >
                    <Button
                        variant="outline"
                        className="w-full bg-transparent border-input text-foreground hover:bg-primary hover:text-primary-foreground transition-colors gap-2"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Comprar por WhatsApp
                    </Button>
                </a>
            </div>
        </div>
    )
}
