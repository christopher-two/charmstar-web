import { useState } from 'react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useNavigate } from 'react-router-dom'

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
  const { logout } = useAdminAuth()
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
    <div className="min-h-screen bg-background pb-32 font-sans transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">

        {/* Main Content Area - Full Width */}
        <main className="flex-1 overflow-y-auto w-full relative">

          <div className="px-4 lg:px-10 pt-8 pb-20 w-full max-w-7xl mx-auto">
            {activeSection === 'products' && (
              <div className="space-y-6">
                <AdminProductList
                  key={refreshKey}
                  onEdit={handleEditProduct}
                />
              </div>
            )}

            {activeSection === 'add' && (
              <div className="w-full">
                <AdminProductForm
                  initialData={undefined}
                  onSave={handleProductSaved}
                  onCancel={() => setActiveSection('products')}
                />
              </div>
            )}

            {activeSection === 'edit' && (
              <div className="w-full">
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

      {/* Floating Bottom Nav */}
      <AdminBottomNav
        activeSection={activeSection}
        onNavigate={(section) => {
          setActiveSection(section)
          if (section === 'add' && activeSection !== 'add') {
            setEditingProduct(undefined)
          }
        }}
        onLogout={() => setShowLogoutDialog(true)}
        onShop={() => navigate('/shop')}
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
