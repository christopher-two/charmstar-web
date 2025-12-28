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

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="shop/product/:id" element={<ProductPage />} />
            </Route>
          </Routes>
          <CartSidebar />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
