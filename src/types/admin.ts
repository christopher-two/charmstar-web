export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  images?: string[]
  description?: string
  createdAt?: number
  updatedAt?: number
}

export interface Category {
  id: string
  name: string
  createdAt: any
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
  category: string
  description?: string
  image: string
  images?: string[]
}
