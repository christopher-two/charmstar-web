import { useState } from 'react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { AdminProductList } from '@/components/admin/ProductList'
import { AdminProductForm } from '@/components/admin/ProductForm'
import { CategoryManager } from '@/components/admin/CategoryManager'
import { AdminBottomNav } from '@/components/admin/AdminBottomNav'
import type { Product } from '@/types/admin'
import toast from 'react-hot-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('products')
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)
  const [refreshKey, setRefreshKey] = useState(0)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/admin/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  const handleProductSaved = () => {
    setEditingProduct(undefined)
    setRefreshKey((prev) => prev + 1)
    toast.success('Product saved successfully!')
    if (window.innerWidth < 1024) {
      setActiveSection('products')
    }
  }

  const handleProductDeleted = () => {
    setEditingProduct(undefined)
    setRefreshKey((prev) => prev + 1)
    toast.success('Product deleted successfully!')
    if (window.innerWidth < 1024) {
      setActiveSection('products')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setActiveSection('edit')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0 font-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
          <div className="p-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Admin Area
            </h1>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {user?.email}
            </p>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <button
              onClick={() => {
                setActiveSection('products')
                setEditingProduct(undefined)
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeSection === 'products'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
            >
              Products
            </button>
            <button
              onClick={() => {
                setActiveSection('add')
                setEditingProduct(undefined)
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeSection === 'add'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
            >
              Add Product
            </button>
            <button
              onClick={() => setActiveSection('categories')}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeSection === 'categories'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
            >
              Categories
            </button>
          </nav>
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full gap-2 justify-start text-muted-foreground hover:text-destructive hover:border-destructive"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="lg:hidden border-b border-border bg-card p-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 lg:p-8 w-full">
            {activeSection === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center lg:hidden">
                  <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                </div>
                <AdminProductList
                  key={refreshKey}
                  onEdit={handleEditProduct}
                />
              </div>
            )}

            {activeSection === 'add' && (
              <div className="w-full">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
                  Add New Product
                </h2>
                <AdminProductForm
                  initialData={undefined}
                  onSave={handleProductSaved}
                  onCancel={() => setActiveSection('products')}
                />
              </div>
            )}

            {activeSection === 'edit' && (
              <div className="w-full">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
                  Edit Product
                </h2>
                <AdminProductForm
                  initialData={editingProduct}
                  onSave={handleProductSaved}
                  onCancel={() => setActiveSection('products')}
                  onDelete={handleProductDeleted}
                />
              </div>
            )}

            {activeSection === 'categories' && (
              <div className="w-full">
                <CategoryManager />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <AdminBottomNav
        activeSection={activeSection}
        onNavigate={(section) => {
          setActiveSection(section)
          if (section === 'upload' && activeSection !== 'upload') {
            setEditingProduct(undefined)
          }
        }}
        onLogout={() => setShowLogoutDialog(true)}
      />

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of the admin session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
