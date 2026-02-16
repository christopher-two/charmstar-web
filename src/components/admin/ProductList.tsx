import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product } from '@/types/admin'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'

interface AdminProductListProps {
  onEdit?: (product: Product) => void
}

export const AdminProductList: React.FC<AdminProductListProps> = ({
  onEdit,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>(['all'])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'))
      const cats: string[] = ['all']
      querySnapshot.forEach((doc) => {
        cats.push(doc.data().name)
      })
      setCategories(cats)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'products'))
      const productsList: Product[] = []
      querySnapshot.forEach((doc) => {
        productsList.push({
          id: doc.id,
          ...doc.data(),
        } as Product)
      })
      setProducts(productsList.sort((a, b) => b.createdAt! - a.createdAt!))
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Search and Filter Section - Integrated */}
      <div className="mb-8 space-y-6 text-center">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-full border-2 border-border/60 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm text-lg"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${selectedCategory === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid - Integrated full width */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onEdit?.(product)}
              className="group relative bg-background rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-muted rounded-xl mb-3 shadow-md border border-border/50">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}

                {/* Edit Hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm text-black">
                    Edit
                  </span>
                </div>
              </div>

              {/* Minimal Content */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors" title={product.name}>
                    {product.name}
                  </h3>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground text-xs">{product.category}</span>
                  <span className="font-semibold text-foreground">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-xs text-center text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>
    </div>
  )
}
