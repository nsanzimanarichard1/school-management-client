import { useQuery } from '@tanstack/react-query'
import { MdCheckCircle, MdCancel, MdAccessTime } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'

export default function Attendance() {
  const { data: attendance, isLoading } = useQuery({
    queryKey: ['allAttendance'],
    queryFn: async () => {
      const res = await api.get('/api/admin/attendance')
      return res.data.data || []
    }
  })

  if (isLoading) return <div>Loading...</div>

  const totalRecords = attendance?.length || 0
  const presentCount = attendance?.filter((a: any) => a.status === 'PRESENT')?.length || 0
  const absentCount = attendance?.filter((a: any) => a.status === 'ABSENT')?.length || 0
  const lateCount = attendance?.filter((a: any) => a.status === 'LATE')?.length || 0

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Records</p>
                  <h3 className="text-2xl font-bold">{totalRecords}</h3>
                </div>
                <MdCheckCircle className="text-4xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Present</p>
                  <h3 className="text-2xl font-bold">{presentCount}</h3>
                </div>
                <MdCheckCircle className="text-4xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Absent</p>
                  <h3 className="text-2xl font-bold">{absentCount}</h3>
                </div>
                <MdCancel className="text-4xl text-red-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Late</p>
                  <h3 className="text-2xl font-bold">{lateCount}</h3>
                </div>
                <MdAccessTime className="text-4xl text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b">Attendance Records</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marked By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendance?.map((record: any, idx: number) => (
                  <tr key={record.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{record.student?.user?.name}</td>
                    <td className="px-6 py-4">{record.student?.class?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        record.status === 'PRESENT' ? 'bg-green-100 text-green-800' :
                        record.status === 'ABSENT' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{record.teacher?.user?.name}</td>
                    <td className="px-6 py-4">{record.remarks || '-'}</td>
                  </tr>
                ))}
                {attendance?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No attendance records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
