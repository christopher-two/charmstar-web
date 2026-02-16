import { useState } from 'react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { AdminProductList } from '@/components/admin/ProductList'
import { AdminProductForm } from '@/components/admin/ProductForm'
import toast from 'react-hot-toast'

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/admin/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const handleProductSaved = () => {
    setShowForm(false)
    setRefreshKey((prev) => prev + 1)
    toast.success('Product saved successfully!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome, {user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2">
            <AdminProductList key={refreshKey} />
          </div>

          {/* Form Section */}
          <div>
            <div className="sticky top-8">
              {showForm ? (
                <AdminProductForm
                  onSave={handleProductSaved}
                  onCancel={() => setShowForm(false)}
                />
              ) : (
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full h-12"
                >
                  + Add New Product
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
