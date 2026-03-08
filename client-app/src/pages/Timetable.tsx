import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useTimetable } from '../services/queries'
import { MdSchedule } from 'react-icons/md'

export default function Timetable() {
  const { data: timetable, isLoading } = useTimetable()

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <MdSchedule className="text-3xl text-purple-600" />
            <h1 className="text-3xl font-bold">Timetable</h1>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {!timetable || timetable.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No timetable available yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Teacher</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timetable.map((entry: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{entry.day}</td>
                        <td className="px-6 py-4 text-sm">{entry.time}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{entry.subject}</td>
                        <td className="px-6 py-4 text-sm">{entry.teacher}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{entry.room}</td>
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
