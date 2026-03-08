export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin'
}

export interface AuthResponse {
  user: AdminUser
  token: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  phone: string
  isVerified: boolean
}

export interface Stats {
  totalStudents: number
  totalTeachers: number
  totalFees: number
  pendingVerifications: number
  attendanceRate: number
  activeClasses?: number
}

export interface Class {
  _id: string
  name: string
  grade: string
  teacher?: { _id: string; name: string }
  studentCount?: number
}

export interface Teacher {
  _id: string
  name: string
}

export interface Payment {
  id: string
  date: string
  studentName: string
  type: string
  amount: number
  status: 'completed' | 'pending' | 'rejected'
  description: string
}

export interface PaymentStats {
  total: number
  pending: number
  completed: number
}
