import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../utils/AuthContext'
import { api } from '../api'
import { loginSchema, type LoginInput } from '../schemas/auth'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', deviceId: '' })
  const [errors, setErrors] = useState<Partial<LoginInput>>({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post('/api/auth/login', data)
      return res.data
    },
    onSuccess: (response) => {
      // Handle response structure: { success: true, data: { token, user } }
      const { token, user } = response.data
      login(user, token)
      navigate('/dashboard')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginSchema.safeParse({ email: formData.email, password: formData.password })
    
    if (!result.success) {
      const fieldErrors: Partial<LoginInput> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof LoginInput] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    if (!formData.deviceId.trim()) {
      alert('Please enter a device ID')
      return
    }

    setErrors({})
    mutation.mutate(formData)
  }

  const getErrorMessage = () => {
    const error = mutation.error as any
    const message = error?.response?.data?.error || error?.response?.data?.message || 'Login failed'
    
    if (message.includes('Device not registered')) {
      return 'Device not registered. Please register with this device ID first.'
    }
    if (message.includes('Device not verified')) {
      return 'Your device is pending admin verification. Please wait for approval.'
    }
    return message
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Student/Parent Login</h2>
        {mutation.error && (
          <div className="alert alert-error">
            {getErrorMessage()}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {errors.email && <span className="text-red-600 text-xs mt-1">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            {errors.password && <span className="text-red-600 text-xs mt-1">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Device ID</label>
            <input
              type="text"
              value={formData.deviceId}
              onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
              placeholder="Enter your device ID"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Use the same device ID you registered with</p>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-red-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}



