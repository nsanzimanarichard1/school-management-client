import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MdGrade, MdPerson, MdBook, MdEdit, MdDelete } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'
import { useState } from 'react'

export default function Grades() {
  const queryClient = useQueryClient()
  const [editingGrade, setEditingGrade] = useState<any>(null)

  const { data: grades, isLoading } = useQuery({
    queryKey: ['allGrades'],
    queryFn: async () => {
      const res = await api.get('/api/admin/grades')
      return res.data.data || []
    }
  })

  if (isLoading) return <div>Loading...</div>

  const totalGrades = grades?.length || 0
  const avgGrade = grades?.length > 0 
    ? (grades.reduce((sum: number, g: any) => sum + g.score, 0) / grades.length).toFixed(2)
    : 0
  const passCount = grades?.filter((g: any) => g.score >= 50)?.length || 0

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await api.patch(`/api/admin/grades/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allGrades'] })
      setEditingGrade(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/grades/${id}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['allGrades'] })
  })

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Grades Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Grades</p>
                  <h3 className="text-2xl font-bold">{totalGrades}</h3>
                </div>
                <MdGrade className="text-4xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Average Score</p>
                  <h3 className="text-2xl font-bold">{avgGrade}%</h3>
                </div>
                <MdBook className="text-4xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pass Rate</p>
                  <h3 className="text-2xl font-bold">{totalGrades > 0 ? ((passCount / totalGrades) * 100).toFixed(1) : 0}%</h3>
                </div>
                <MdPerson className="text-4xl text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b">All Grades</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {grades?.map((grade: any, idx: number) => (
                  <tr key={grade.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{grade.student?.user?.name}</td>
                    <td className="px-6 py-4">{grade.student?.class?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{grade.subject?.name}</td>
                    <td className="px-6 py-4 font-semibold">{grade.score}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        grade.score >= 80 ? 'bg-green-100 text-green-800' :
                        grade.score >= 60 ? 'bg-blue-100 text-blue-800' :
                        grade.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {grade.score >= 80 ? 'A' : grade.score >= 60 ? 'B' : grade.score >= 50 ? 'C' : 'F'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{grade.teacher?.user?.name}</td>
                    <td className="px-6 py-4">{new Date(grade.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => setEditingGrade(grade)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1">
                        <MdEdit /> Edit
                      </button>
                      <button onClick={() => deleteMutation.mutate(grade.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                        <MdDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {grades?.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No grades found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {editingGrade && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Grade</h2>
                <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate({ id: editingGrade.id, data: { score: editingGrade.score } }); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Score</label>
                    <input type="number" min="0" max="100" value={editingGrade.score} onChange={(e) => setEditingGrade({ ...editingGrade, score: parseFloat(e.target.value) })} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
                    <button type="button" onClick={() => setEditingGrade(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
