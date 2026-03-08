import { api } from './client'
import type { AuthResponse } from '../types'
import type { LoginInput, RegisterInput } from '../schemas/auth'
import { getDeviceId } from '../utils/deviceId'

export const authApi = {
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const res = await api.post('/api/auth/register', {
      ...data,
      deviceId: getDeviceId()
    })
    return res.data
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post('/api/auth/login', {
      ...data,
      deviceId: getDeviceId()
    })
    return res.data
  },

  verifyStatus: async () => {
    const res = await api.get('/api/auth/verify-status')
    return res.data
  }
}
