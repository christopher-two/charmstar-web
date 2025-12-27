import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { Button } from './ui/button'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

    return (
        <div className="group relative flex flex-col gap-4">
            <Link to={`/shop/product/${product.id}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Quick view or secondary image could go here */}
                </div>
            </Link>

            <div className="flex flex-col gap-1">
                <Link to={`/shop/product/${product.id}`} className="hover:underline">
                    <h3 className="text-lg font-medium text-foreground line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-lg font-semibold text-foreground">${product.price}</p>
            </div>

            <div className="mt-auto pt-2 grid gap-2">
                <Button
                    className="w-full gap-2"
                    onClick={() => addItem(product)}
                >
                    <ShoppingBag className="h-4 w-4" />
                    Agregar
                </Button>
            </div>
        </div>
    )
}
