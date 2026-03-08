import { api } from './client'
import type { Stats } from '../types'

export const dashboardApi = {
  getStats: async (): Promise<Stats> => {
    const res = await api.get('/api/admin/dashboard/stats')
    return res.data
  }
}
