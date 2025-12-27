import { X, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Button } from './ui/button'
import { useEffect } from 'react'

export function CartSidebar() {
    const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart()

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleCheckout = () => {
        const phoneNumber = "524521793811"

        let message = "Hola Charm Star, me interesa realizar el siguiente pedido:\n\n"
        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`
        })
        message += `\nTotal: $${total}`

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-background h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Tu Carrito ({items.length})
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                            <ShoppingBag className="h-12 w-12 opacity-20" />
                            <p>Tu carrito está vacío</p>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Explorar productos
                            </Button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card text-card-foreground">
                                <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">${item.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t p-4 bg-muted/20">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground">Total</span>
                            <span className="text-xl font-bold">${total}</span>
                        </div>
                        <Button
                            className="w-full gap-2"
                            size="lg"
                            onClick={handleCheckout}
                        >
                            <MessageCircle className="h-5 w-5" />
                            Completar pedido por WhatsApp
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
