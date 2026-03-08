import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { feesApi, academicApi, notificationsApi } from '../api'

// Fees
export const useFeeBalance = () => useQuery({ queryKey: ['feeBalance'], queryFn: feesApi.getBalance })
export const useFeeHistory = () => useQuery({ queryKey: ['feeHistory'], queryFn: feesApi.getHistory })

export const useDeposit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: feesApi.deposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeBalance'] })
      queryClient.invalidateQueries({ queryKey: ['feeHistory'] })
    }
  })
}

export const useWithdraw = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: feesApi.withdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeBalance'] })
      queryClient.invalidateQueries({ queryKey: ['feeHistory'] })
    }
  })
}

// Academic
export const useProfile = () => useQuery({ queryKey: ['profile'], queryFn: academicApi.getProfile })
export const useGrades = () => useQuery({ queryKey: ['grades'], queryFn: academicApi.getGrades })
export const useAttendance = () => useQuery({ queryKey: ['attendance'], queryFn: academicApi.getAttendance })
export const useTimetable = () => useQuery({ queryKey: ['timetable'], queryFn: academicApi.getTimetable })
export const useAcademicRecords = () => useQuery({ queryKey: ['academicRecords'], queryFn: academicApi.getRecords })
export const useAcademicStats = () => useQuery({ queryKey: ['academicStats'], queryFn: academicApi.getStatistics })

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

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
    }
  })
}
