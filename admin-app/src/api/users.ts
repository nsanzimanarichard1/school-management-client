import { api } from './client'

export const usersApi = {
  // Teachers
  createTeacher: async (data: any) => {
    const res = await api.post('/api/admin/teachers', data)
    return res.data
  },
  getTeachers: async () => {
    const res = await api.get('/api/admin/teachers')
    return res.data
  },
  assignTeacherToClass: async (data: { teacherId: string; classId: string }) => {
    await api.post('/api/admin/teachers/assign-class', data)
  },

  // Students
  createStudent: async (data: any) => {
    const res = await api.post('/api/admin/students', data)
    return res.data
  },
  getStudents: async () => {
    const res = await api.get('/api/admin/students')
    return res.data
  },
  assignStudentToClass: async (data: { studentId: string; classId: string }) => {
    await api.post('/api/admin/students/assign-class', data)
  },

  // Parents
  createParent: async (data: any) => {
    const res = await api.post('/api/admin/parents', data)
    return res.data
  },
  getParents: async () => {
    const res = await api.get('/api/admin/parents')
    return res.data
  },

  // All Users
  getAllUsers: async () => {
    const res = await api.get('/api/admin/users')
    return res.data
  },
  verifyUser: async (userId: string) => {
    const res = await api.put(`/api/admin/users/${userId}/verify`)
    return res.data
  },
  deleteUser: async (userId: string) => {
    const res = await api.delete(`/api/admin/users/${userId}`)
    return res.data
  }
}
