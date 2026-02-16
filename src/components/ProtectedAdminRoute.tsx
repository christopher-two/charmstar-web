import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '@/context/AdminAuthContext'

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
}) => {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
