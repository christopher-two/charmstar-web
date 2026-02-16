export interface Product {
  id: string
  name: string
  price: number
  category: 'Charms' | 'Pulseras' | 'Collares' | 'Anillos' | 'Sonny Angel' | 'Accesorios'
  image: string
  images?: string[]
  description?: string
  createdAt?: number
  updatedAt?: number
}

export interface AdminUser {
  uid: string
  email: string
}

export interface AuthContextType {
  user: AdminUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export interface ProductFormData {
  name: string
  price: number
  category: Product['category']
  description?: string
  image: string
  images?: string[]
}
