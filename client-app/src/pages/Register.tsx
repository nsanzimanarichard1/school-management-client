import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { api } from '../api'
import { registerSchema, type RegisterInput } from '../schemas/auth'
import { getDeviceId } from '../utils/deviceId'

export default function Register() {
  const [formData, setFormData] = useState<RegisterInput & { deviceId: string }>({
    name: '', email: '', password: '', role: 'STUDENT', phone: '', deviceId: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({})
  const navigate = useNavigate()

  useEffect(() => {
    setFormData(prev => ({ ...prev, deviceId: getDeviceId() }))
  }, [])

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post('/api/auth/register', data)
      return res.data
    },
    onSuccess: () => {
      setTimeout(() => navigate('/login'), 2000)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { deviceId, ...dataToValidate } = formData
    const result = registerSchema.safeParse(dataToValidate)
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof RegisterInput] = err.message
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
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {mutation.error && <div className="alert alert-error">{(mutation.error as any).response?.data?.message || 'Registration failed'}</div>}
        {mutation.isSuccess && <div className="alert alert-success">Registration successful! Please wait for device verification. Redirecting to login...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            {errors.name && <span className="text-red-600 text-xs mt-1">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            {errors.email && <span className="text-red-600 text-xs mt-1">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            {errors.phone && <span className="text-red-600 text-xs mt-1">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as 'STUDENT' | 'PARENT' })}>
              <option value="STUDENT">Student</option>
              <option value="PARENT">Parent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            {errors.password && <span className="text-red-600 text-xs mt-1">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Device ID (Auto-generated)</label>
            <input type="text" value={formData.deviceId} readOnly className="bg-gray-100" />
            <p className="text-xs text-gray-500 mt-1">Save this ID - you'll need it to login</p>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
