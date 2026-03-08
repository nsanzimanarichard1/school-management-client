import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../utils/AuthContext'
import { authApi } from '../api'
import { loginSchema, type LoginInput } from '../schemas/auth'

export default function Login() {
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginInput>>({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.user.role.toUpperCase() !== 'ADMIN') {
        alert('Access denied. Admin credentials required.')
        return
      }
      login(data.user, data.token)
      navigate('/dashboard')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<LoginInput> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof LoginInput] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    mutation.mutate(formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {mutation.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{(mutation.error as any).response?.data?.message || 'Login failed'}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {errors.email && <span className="text-red-600 text-xs mt-1">{errors.email}</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {errors.password && <span className="text-red-600 text-xs mt-1">{errors.password}</span>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
