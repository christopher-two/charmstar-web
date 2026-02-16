import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { ShopPage } from './pages/ShopPage'
import { ProductPage } from './pages/ProductPage'
import { ThemeProvider } from './components/ThemeProvider'
import { ScrollToTop } from './components/ScrollToTop'
import './index.css'

import { CartProvider } from './context/CartContext'
import { CartSidebar } from './components/CartSidebar'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CartProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="shop/product/:id" element={<ProductPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
            <CartSidebar />
            <Toaster position="bottom-right" />
          </BrowserRouter>
        </AdminAuthProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
