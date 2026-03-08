import { api } from './client'
import type { AuthResponse } from '../types'
import type { LoginInput } from '../schemas/auth'
import { getDeviceId } from '../utils/deviceId'

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post('/api/auth/login', {
      ...data,
      deviceId: 'admin-device'
    })
    // Backend returns { success: true, data: { token, user } }
    return res.data.data
  }
}
