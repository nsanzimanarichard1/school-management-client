import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AdminUser } from '../types'

interface AuthContextType {
  user: AdminUser | null
  login: (userData: AdminUser, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const token = localStorage.getItem('adminToken')
      const userData = localStorage.getItem('adminUser')
      if (token && userData) setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error loading auth data:', error)
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
    }
    setLoading(false)
  }, [])

  const login = (userData: AdminUser, token: string) => {
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminUser', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setUser(null)
  }

  if (loading) return <div>Loading...</div>

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
