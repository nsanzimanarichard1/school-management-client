import { api } from './client'

export const academicApi = {
  // Subjects
  createSubject: async (data: { name: string; code: string }) => {
    const res = await api.post('/api/admin/subjects', data)
    return res.data
  },
  getSubjects: async () => {
    const res = await api.get('/api/admin/subjects')
    return res.data
  },

  // Classes
  createClass: async (data: { name: string; grade: string; teacherId?: string }) => {
    const res = await api.post('/api/admin/classes', data)
    return res.data
  },
  getClasses: async () => {
    const res = await api.get('/api/admin/classes')
    return res.data
  },
  deleteClass: async (classId: string) => {
    const res = await api.delete(`/api/admin/classes/${classId}`)
    return res.data
  }
}
