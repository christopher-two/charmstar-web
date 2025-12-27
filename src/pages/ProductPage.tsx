import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { Button } from '../components/ui/button'
import { MessageCircle, ArrowLeft, ShoppingBag, Share2 } from 'lucide-react'
import { SEO } from '../components/SEO'
import { useCart } from '../context/CartContext'

export function ProductPage() {
    const { id } = useParams<{ id: string }>()
    const { addItem } = useCart()
    const product = products.find(p => p.id === id)

    const [isCopied, setIsCopied] = useState(false)

    if (!product) {
        return (
            <div className="container px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <Link to="/shop">
                    <Button variant="outline">Volver a la tienda</Button>
                </Link>
            </div>
        )
    }

    const phoneNumber = "524521793811"
    const message = `Hola Charm Star, me interesa comprar el ${product.name} de $${product.price} (ID: ${product.id}). ¿Está disponible?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    const handleShare = async () => {
        const shareData = {
            title: `Charm Star - ${product.name}`,
            text: `¡Mira este increíble ${product.name} en Charm Star!`,
            url: window.location.href
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href)
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 2000)
            } catch (err) {
                console.log('Error copying to clipboard', err)
            }
        }
    }

    return (
        <div className="container px-4 md:px-6 py-12">
            <SEO
                title={`${product.name} - Charm Star`}
                description={`Compra ${product.name}. ${product.category}. Precio: $${product.price}. Envíos a todo México.`}
                url={`https://charmstar.com/shop/product/${product.id}`}
                image={product.image}
            />

            <div className="flex justify-between items-center mb-8">
                <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al catálogo
                </Link>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                    onClick={handleShare}
                >
                    <Share2 className="h-4 w-4" />
                    {isCopied ? '¡Enlace copiado!' : 'Compartir'}
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-semibold text-foreground">
                            ${product.price}
                        </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 mb-8 border border-border">
                        <p className="text-muted-foreground leading-relaxed">
                            Añade un toque de magia a tu colección con este hermoso {product.name.toLowerCase()}.
                            Perfecto para combinar con tus accesorios favoritos.
                        </p>
                    </div>

                    <div className="mt-auto space-y-3">
                        <Button
                            size="lg"
                            className="w-full md:w-auto text-lg px-8 gap-2"
                            onClick={() => addItem(product)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            Agregar al Carrito
                        </Button>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full md:w-auto"
                        >
                            <Button variant="outline" size="lg" className="w-full md:w-auto text-lg px-8 gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Comprar directo por WhatsApp
                            </Button>
                        </a>
                        <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
                            Puedes agregar varios productos al carrito para un solo pedido
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
