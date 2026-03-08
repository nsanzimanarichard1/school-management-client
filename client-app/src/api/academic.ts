import { api } from './client'
import type { Grade, Attendance, TimetableEntry } from '../types'

export const academicApi = {
  getProfile: async () => {
    const res = await api.get('/api/academic/profile')
    return res.data.data
  },

  getGrades: async (): Promise<Grade[]> => {
    const res = await api.get('/api/academic/grades')
    return res.data.data
  },

  getAttendance: async (): Promise<any[]> => {
    const res = await api.get('/api/academic/attendance')
    return res.data.data
  },

  getTimetable: async (): Promise<TimetableEntry[]> => {
    const res = await api.get('/api/academic/timetable')
    return res.data.data
  },

  getRecords: async () => {
    const res = await api.get('/api/academic/records')
    return res.data.data
  },

  getStatistics: async () => {
    const res = await api.get('/api/academic/statistics')
    return res.data.data
  }
}
