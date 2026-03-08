import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MdCheckCircle, MdCancel } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'

export default function Approvals() {
  const queryClient = useQueryClient()

  const { data: pendingDevices } = useQuery({
    queryKey: ['pendingDevices'],
    queryFn: async () => {
      const res = await api.get('/api/admin/devices/pending')
      return res.data.data || []
    }
  })

  const { data: pendingWithdrawals } = useQuery({
    queryKey: ['pendingWithdrawals'],
    queryFn: async () => {
      const res = await api.get('/api/admin/withdrawals/pending')
      return res.data.data || []
    }
  })

  const verifyDevice = useMutation({
    mutationFn: async (deviceId: string) => {
      await api.post('/api/admin/devices/verify', { deviceId })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingDevices'] })
  })

  const processWithdrawal = useMutation({
    mutationFn: async ({ withdrawalId, status }: { withdrawalId: string; status: string }) => {
      await api.post('/api/admin/withdrawals/process', { withdrawalId, status })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingWithdrawals'] })
  })

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Approvals</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pending Device Verifications</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingDevices?.map((device: any) => (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{device.userName}</td>
                      <td className="px-6 py-4">{device.userEmail}</td>
                      <td className="px-6 py-4 font-mono text-sm">{device.deviceId}</td>
                      <td className="px-6 py-4">{new Date(device.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => verifyDevice.mutate(device.deviceId)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1">
                          <MdCheckCircle /> Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!pendingDevices?.length && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No pending device verifications</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Withdrawal Requests</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingWithdrawals?.map((withdrawal: any) => (
                    <tr key={withdrawal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{withdrawal.studentName}</td>
                      <td className="px-6 py-4">{withdrawal.amount} RWF</td>
                      <td className="px-6 py-4">{withdrawal.reason}</td>
                      <td className="px-6 py-4">{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => processWithdrawal.mutate({ withdrawalId: withdrawal.id, status: 'approved' })} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1">
                          <MdCheckCircle /> Approve
                        </button>
                        <button onClick={() => processWithdrawal.mutate({ withdrawalId: withdrawal.id, status: 'rejected' })} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                          <MdCancel /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!pendingWithdrawals?.length && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No pending withdrawal requests</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
