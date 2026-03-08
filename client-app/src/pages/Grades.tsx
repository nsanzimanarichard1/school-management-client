import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useGrades } from '../services/queries'
import { MdGrade } from 'react-icons/md'

export default function Grades() {
  const { data: grades, isLoading } = useGrades()

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <MdGrade className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold">My Grades</h1>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {!grades || grades.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No grades available yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Marks</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Term</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {grades.map((grade: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{grade.subject}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
                            {grade.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{grade.marks}/100</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{grade.term}</td>
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
