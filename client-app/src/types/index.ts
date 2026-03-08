export interface User {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN'
  verified: boolean
}

export interface AuthResponse {
  success: boolean
  data: {
    token: string
    user: User
  }
}

export interface FeeBalance {
  balance: number
  studentName: string
  lowBalanceThreshold: number
  isLowBalance: boolean
}

export interface Transaction {
  id: string
  type: 'DEPOSIT' | 'WITHDRAWAL'
  amount: number
  status: 'COMPLETED' | 'PENDING' | 'REJECTED'
  description: string
  createdAt: string
}

export interface FeeHistory {
  transactions: Transaction[]
  totalDeposits: number
  totalWithdrawals: number
}

export interface Grade {
  subject: string
  grade: string
  marks: number
  term: string
}

export interface AttendanceRecord {
  date: string
  status: 'present' | 'absent' | 'late'
  subject: string
}

export interface Attendance {
  percentage: number
  records: AttendanceRecord[]
}

export interface TimetableEntry {
  day: string
  time: string
  subject: string
  teacher: string
  room: string
}
