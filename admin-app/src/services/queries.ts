import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, academicApi, approvalsApi, dashboardApi, notificationsApi, feesApi } from '../api'

// Dashboard
export const useStats = () => useQuery({ queryKey: ['stats'], queryFn: dashboardApi.getStats })

// Users
export const useTeachers = () => useQuery({ 
  queryKey: ['teachers'], 
  queryFn: async () => {
    const res = await usersApi.getTeachers()
    return res.data || res
  }
})

export const useStudents = () => useQuery({ 
  queryKey: ['students'], 
  queryFn: async () => {
    const res = await usersApi.getStudents()
    return res.data || res
  }
})

export const useParents = () => useQuery({ 
  queryKey: ['parents'], 
  queryFn: async () => {
    const res = await usersApi.getParents()
    return res.data || res
  }
})

export const useCreateTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.createTeacher,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teachers'] })
  })
}

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] })
  })
}

export const useAssignStudentToClass = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.assignStudentToClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    }
  })
}

export const useAssignTeacherToClass = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.assignTeacherToClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    }
  })
}

// Academic
export const useSubjects = () => useQuery({ 
  queryKey: ['subjects'], 
  queryFn: async () => {
    const res = await academicApi.getSubjects()
    return res.data || res
  }
})

export const useClasses = () => useQuery({ 
  queryKey: ['classes'], 
  queryFn: async () => {
    const res = await academicApi.getClasses()
    return res.data || res
  }
})

export const useCreateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: academicApi.createSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] })
  })
}

export const useCreateClass = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: academicApi.createClass,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classes'] })
  })
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: academicApi.deleteClass,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classes'] })
  })
}

// Users Management
export const useUsers = () => useQuery({ queryKey: ['users'], queryFn: async () => {
  const res = await usersApi.getAllUsers()
  return res.data
}})

export const useVerifyUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await usersApi.verifyUser(userId)
      return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await usersApi.deleteUser(userId)
      return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
}

// Payments
export const usePayments = () => useQuery({ 
  queryKey: ['payments'], 
  queryFn: async () => {
    const res = await feesApi.getPayments()
    return res.data || { payments: [], stats: { total: 0, pending: 0, completed: 0 } }
  }
})

// Approvals
export const usePendingDevices = () => useQuery({ queryKey: ['pendingDevices'], queryFn: approvalsApi.getPendingDevices })
export const usePendingWithdrawals = () => useQuery({ queryKey: ['pendingWithdrawals'], queryFn: approvalsApi.getPendingWithdrawals })

export const useVerifyDevice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: approvalsApi.verifyDevice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingDevices'] })
  })
}

export const useProcessWithdrawal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ withdrawalId, status }: { withdrawalId: string; status: 'approved' | 'rejected' }) =>
      approvalsApi.processWithdrawal(withdrawalId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingWithdrawals'] })
  })
}

// Notifications
export const useNotifications = () => useQuery({ queryKey: ['notifications'], queryFn: notificationsApi.getAll })
export const useUnreadNotifications = () => useQuery({ queryKey: ['unreadNotifications'], queryFn: notificationsApi.getUnread })

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
    }
  })
}
