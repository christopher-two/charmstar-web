import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Lock, Mail } from 'lucide-react'

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Login successful!')
      navigate('/admin')
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="text-3xl font-bold text-primary">Charmstar</div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-muted-foreground text-center mb-6">
          Sign in to manage products
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
              <Input
                type="email"
                placeholder="admin@charmstar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
