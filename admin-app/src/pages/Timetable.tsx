import { useQuery } from '@tanstack/react-query'
import { MdSchedule, MdBook, MdPerson } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'

export default function Timetable() {
  const { data: timetable, isLoading } = useQuery({
    queryKey: ['allTimetable'],
    queryFn: async () => {
      const res = await api.get('/api/admin/timetable')
      return res.data.data || []
    }
  })

  if (isLoading) return <div>Loading...</div>

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
  const totalEntries = timetable?.length || 0
  const uniqueClasses = new Set(timetable?.map((t: any) => t.class?.name)).size
  const uniqueSubjects = new Set(timetable?.map((t: any) => t.subject?.name)).size

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Timetable Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Entries</p>
                  <h3 className="text-2xl font-bold">{totalEntries}</h3>
                </div>
                <MdSchedule className="text-4xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Classes</p>
                  <h3 className="text-2xl font-bold">{uniqueClasses}</h3>
                </div>
                <MdPerson className="text-4xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Subjects</p>
                  <h3 className="text-2xl font-bold">{uniqueSubjects}</h3>
                </div>
                <MdBook className="text-4xl text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b">Weekly Timetable</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timetable?.map((entry: any, idx: number) => (
                    <tr key={entry.id || idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{entry.dayOfWeek}</td>
                      <td className="px-6 py-4">{entry.startTime} - {entry.endTime}</td>
                      <td className="px-6 py-4">{entry.class?.name}</td>
                      <td className="px-6 py-4">{entry.subject?.name}</td>
                      <td className="px-6 py-4">{entry.teacher?.user?.name}</td>
                      <td className="px-6 py-4">{entry.room || 'N/A'}</td>
                    </tr>
                  ))}
                  {timetable?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No timetable entries found</td>
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
