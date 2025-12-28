import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { cn } from '../lib/utils'
import { SEO } from '../components/SEO'

import { Search, Sparkles } from 'lucide-react'
import { Input } from '../components/ui/input'
import { useEffect } from 'react'

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
    const [searchParams, setSearchParams] = useSearchParams()

    // Get values from URL or default
    const activeCategory = (searchParams.get('category') as typeof validCategories[number]) || 'Todas'
    const searchQuery = searchParams.get('q') || ''
    const sortBy = searchParams.get('sort') || 'featured'
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''

    // Helper to update specific params while keeping others
    const updateParams = (updates: Record<string, string | null>) => {
        const newParams = new URLSearchParams(searchParams)
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '') {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
        })
        setSearchParams(newParams, { replace: true })
    }

    const filteredProducts = products
        .filter(product => {
            const matchesCategory = activeCategory === 'Todas' || product.category === activeCategory

            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.price.toString().includes(searchQuery)

            const price = product.price
            const min = minPrice ? parseFloat(minPrice) : 0
            const max = maxPrice ? parseFloat(maxPrice) : Infinity
            const matchesPrice = price >= min && price <= max

            return matchesCategory && matchesSearch && matchesPrice
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price
                case 'price-desc': return b.price - a.price
                case 'name-asc': return a.name.localeCompare(b.name)
                case 'name-desc': return b.name.localeCompare(a.name)
                default: return 0
            }
        })

    // Cleanup params if needed (optional)
    useEffect(() => {
        // If query params are invalid, we could clean them here. 
        // For now, we trust basic string parsing.
    }, [])

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
                    <div className="sticky top-24 space-y-8">
                        {/* Search Input */}
                        <div>
                            <h2 className="text-xl font-serif font-bold mb-4 text-foreground">Buscar</h2>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Buscar productos..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => updateParams({ q: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <h2 className="text-xl font-serif font-bold mb-4 text-foreground">Ordenar por</h2>
                            <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={sortBy}
                                onChange={(e) => updateParams({ sort: e.target.value })}
                            >
                                <option value="featured">Destacados</option>
                                <option value="price-asc">Precio: Menor a Mayor</option>
                                <option value="price-desc">Precio: Mayor a Menor</option>
                                <option value="name-asc">Nombre: A - Z</option>
                                <option value="name-desc">Nombre: Z - A</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h2 className="text-xl font-serif font-bold mb-4 text-foreground">Precio</h2>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => updateParams({ minPrice: e.target.value })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => updateParams({ maxPrice: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h2 className="text-xl font-serif font-bold mb-4 text-foreground">Categorías</h2>
                            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                                {validCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => updateParams({ category: category })}
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
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-serif font-medium tracking-tight text-foreground">
                            {activeCategory === 'Todas' ? 'Catálogo Completo' : (activeCategory === 'Sonny Angel' ? 'Sonny Angel / Labubus' : activeCategory)}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {filteredProducts.length} productos encontrados
                            {(searchQuery || minPrice || maxPrice) && ` con los filtros actuales`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-24 px-4 bg-muted/30 rounded-2xl border border-dashed border-border/60">
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl animate-pulse" />
                                <Sparkles className="h-16 w-16 text-muted-foreground/40 relative z-10" />
                            </div>
                            <h3 className="text-xl font-serif font-medium text-foreground mb-2">
                                ¡Ups! No encontramos brillos por aquí
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                No hay productos que coincidan con tus filtros actuales. Intenta ajustar tu búsqueda para encontrar la joya perfecta.
                            </p>
                            <button
                                onClick={() => setSearchParams({})}
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-sm hover:shadow"
                            >
                                Ver todo el catálogo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
