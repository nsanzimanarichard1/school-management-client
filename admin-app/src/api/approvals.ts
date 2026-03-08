import { api } from './client'

export const approvalsApi = {
  // Device Verifications
  getPendingDevices: async () => {
    const res = await api.get('/api/admin/devices/pending')
    return res.data
  },
  verifyDevice: async (deviceId: string) => {
    await api.post('/api/admin/devices/verify', { deviceId })
  },

  // Withdrawal Requests
  getPendingWithdrawals: async () => {
    const res = await api.get('/api/admin/withdrawals/pending')
    return res.data
  },
  processWithdrawal: async (withdrawalId: string, status: 'approved' | 'rejected') => {
    await api.post('/api/admin/withdrawals/process', { withdrawalId, status })
  }
}
