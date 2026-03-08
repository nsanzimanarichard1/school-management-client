import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const classSchema = z.object({
  name: z.string().min(2, 'Class name required'),
  grade: z.string().min(1, 'Grade required'),
  teacherId: z.string().optional()
})

export type LoginInput = z.infer<typeof loginSchema>
export type ClassInput = z.infer<typeof classSchema>
