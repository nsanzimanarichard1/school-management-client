import { api } from './client'
import type { FeeBalance, FeeHistory } from '../types'

export const feesApi = {
  getBalance: async (): Promise<FeeBalance> => {
    const res = await api.get('/api/fees/balance')
    return res.data.data
  },

  getHistory: async (): Promise<FeeHistory> => {
    const res = await api.get('/api/fees/history')
    return res.data.data
  },

  deposit: async (amount: number): Promise<void> => {
    await api.post('/api/fees/deposit', { amount })
  },

  withdraw: async (amount: number): Promise<void> => {
    await api.post('/api/fees/withdraw', { amount })
  }
}
