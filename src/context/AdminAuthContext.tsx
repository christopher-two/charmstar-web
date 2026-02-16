import React, { createContext, useState, useEffect, type ReactNode } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { AuthContextType, AdminUser } from '@/types/admin'

export const AdminAuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed'
      setError(errorMessage)
      throw err
    }
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = (): AuthContextType => {
  const context = React.useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
