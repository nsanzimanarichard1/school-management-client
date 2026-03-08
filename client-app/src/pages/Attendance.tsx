import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useAttendance } from '../services/queries'
import { MdCheckCircle } from 'react-icons/md'

export default function Attendance() {
  const { data: attendance, isLoading } = useAttendance()

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <MdCheckCircle className="text-3xl text-green-600" />
            <h1 className="text-3xl font-bold">Attendance</h1>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {!attendance || attendance.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No attendance records yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendance.map((record: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm font-medium">{record.subject}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full font-semibold ${
                            record.status === 'present' ? 'bg-green-100 text-green-600' :
                            record.status === 'late' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
