import { api } from './client'

export const feesApi = {
  getPayments: async () => {
    const res = await api.get('/api/admin/dashboard/stats')
    return res.data
  },
  getAllTransactions: async () => {
    const res = await api.get('/api/fees/history')
    return res.data
  },
  deposit: async (data: { amount: number; description: string }) => {
    const res = await api.post('/api/fees/deposit', data)
    return res.data
  },
  withdraw: async (data: { amount: number; reason: string }) => {
    const res = await api.post('/api/fees/withdraw', data)
    return res.data
  },
  getBalance: async () => {
    const res = await api.get('/api/fees/balance')
    return res.data
  }
}
