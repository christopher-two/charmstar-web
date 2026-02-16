import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Search } from 'lucide-react'
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

  const categories = [
    'all',
    'Charms',
    'Pulseras',
    'Collares',
    'Anillos',
    'Sonny Angel',
    'Accesorios',
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await deleteDoc(doc(db, 'products', id))
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Image</th>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">${product.price}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(product)}
                        className="gap-1"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="gap-1 bg-destructive hover:bg-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}
