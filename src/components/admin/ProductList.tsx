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
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onEdit?.(product)}
              className="group relative bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-muted">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}

                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    Edit Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {product.category}
                  </span>
                  <span className="font-semibold text-foreground">
                    ${product.price}
                  </span>
                </div>
                <h3 className="font-medium text-foreground line-clamp-1" title={product.name}>
                  {product.name}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}
