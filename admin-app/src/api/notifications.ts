import { api } from './client'

export const notificationsApi = {
  getAll: async () => {
    const res = await api.get('/api/notifications')
    return res.data
  },

  getUnread: async () => {
    const res = await api.get('/api/notifications/unread')
    return res.data
  },

  markAsRead: async (id: string) => {
    await api.patch(`/api/notifications/${id}/read`)
  },

  markAllAsRead: async () => {
    await api.patch('/api/notifications/read-all')
  }
}
