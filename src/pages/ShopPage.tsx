import { useState } from 'react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { cn } from '../lib/utils'
import { SEO } from '../components/SEO'

const validCategories = [
    'Todas',
    'Charms',
    'Pulseras',
    'Collares',
    'Anillos',
    'Sonny Angel',
    'Accesorios'
] as const

export function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<typeof validCategories[number]>('Todas')

    const filteredProducts = activeCategory === 'Todas'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <div className="container px-4 md:px-6 py-12">
            <SEO
                title="Catálogo - Charm Star"
                description="Compra charms, pulseras, anillos y coleccionables Sonny Angel. Envíos a todo México."
                url="https://charmstar.com/shop"
            />
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h2 className="text-xl font-serif font-bold mb-6 text-foreground">Categorías</h2>
                        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                            {validCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "whitespace-nowrap px-4 py-2 text-left text-sm rounded-md transition-colors",
                                        activeCategory === category
                                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {category === 'Sonny Angel' ? 'Sonny Angel / Labubus' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-serif font-medium tracking-tight text-foreground">
                            {activeCategory === 'Todas' ? 'Catálogo Completo' : (activeCategory === 'Sonny Angel' ? 'Sonny Angel / Labubus' : activeCategory)}
                        </h1>
                        <p className="text-muted-foreground mt-2">{filteredProducts.length} productos encontrados</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border border-dashed border-border">
                            <p className="text-muted-foreground">No hay productos en esta categoría por el momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
