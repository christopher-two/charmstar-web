import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { Button } from '../components/ui/button'
import { MessageCircle, ArrowLeft, ShoppingBag, Share2, Truck, CreditCard, ShieldCheck } from 'lucide-react'
import { SEO } from '../components/SEO'
import { useCart } from '../context/CartContext'
import { ImageModal } from '../components/ImageModal'
import { ProductCard } from '../components/ProductCard'
import { cn } from '../lib/utils'
import { useEffect } from 'react'

export function ProductPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { addItem } = useCart()
    const product = products.find(p => p.id === id)

    const [isCopied, setIsCopied] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Update selected image when product loads
    useEffect(() => {
        if (product) {
            setSelectedImage(product.image)
        }
    }, [product])

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

    // Prepare images array (combining main image + additional images if any)
    const allImages = product.images && product.images.length > 0
        ? product.images
        : [product.image]

    // Ensure selectedImage defaults to something valid if state isn't ready
    const currentImage = selectedImage || product.image

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/shop')
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
                <button
                    onClick={handleBack}
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al catálogo
                </button>
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

            <div key={product.id} className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in-up">
                <div className="space-y-4">
                    {/* Main Image */}
                    <div
                        className="relative aspect-square bg-muted rounded-xl overflow-hidden cursor-zoom-in group"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-background/80 backdrop-blur text-xs px-3 py-1 rounded-full shadow-sm">
                                Click para ampliar
                            </span>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {allImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={cn(
                                        "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                                        currentImage === img
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-transparent hover:border-muted-foreground/50"
                                    )}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
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

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                image={currentImage}
                alt={product.name}
            />

            {/* Purchase Info Section */}
            <div className="mt-20 border-t pt-12">
                <h2 className="text-2xl font-serif font-medium mb-8">Información de Compra</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl border border-border/50">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Truck className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-serif font-medium text-lg text-foreground mb-2">Envíos Seguros</h3>
                        <p className="text-muted-foreground">
                            Realizamos envíos a todo México a través de paqueterías confiables.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl border border-border/50">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <CreditCard className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-serif font-medium text-lg text-foreground mb-2">Pago Flexible</h3>
                        <p className="text-muted-foreground">
                            Aceptamos pagos mediante transferencia bancaria y depósito en OXXO para tu comodidad.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-xl border border-border/50">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-serif font-medium text-lg text-foreground mb-2">Garantía de Calidad</h3>
                        <p className="text-muted-foreground">
                            Todos nuestros productos son verificados y empacados cuidadosamente para asegurar que lleguen perfectos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-12 border-t pt-12">
                <h2 className="text-2xl font-serif font-medium mb-8">También te podría gustar</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .sort(() => Math.random() - 0.5) // Simple shuffle
                        .slice(0, 4)
                        .map(relatedProduct => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                </div>
            </div>
        </div>
    )
}
