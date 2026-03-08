import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MdPerson, MdSchool, MdCheckCircle, MdWarning, MdEdit, MdDelete, MdAdd } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'

export default function Students() {
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: 'student123', phone: '', parentEmail: '' })
  const queryClient = useQueryClient()

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await api.get('/api/admin/students')
      return res.data.data || []
    }
  })

  const { data: stats } = useQuery({
    queryKey: ['student-stats'],
    queryFn: async () => {
      const res = await api.get('/api/admin/dashboard/stats')
      return res.data.data || {}
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/api/admin/students', formData)
      queryClient.invalidateQueries({ queryKey: ['students'] })
      setShowForm(false)
      setFormData({ name: '', email: '', password: 'student123', phone: '', parentEmail: '' })
    } catch (error) {
      console.error(error)
    }
  }

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await api.patch(`/api/admin/students/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      setEditingStudent(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/students/${id}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] })
  })

  const handleEdit = (student: any) => {
    setEditingStudent(student)
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({ id: editingStudent.id, data: editingStudent })
  }

  if (isLoading) return <div>Loading...</div>

  const sortedStudents = students ? [...students].reverse() : []
  const totalStudents = students?.length || 0
  const verifiedStudents = students?.filter((s: any) => s.verified)?.length || 0
  const pendingStudents = totalStudents - verifiedStudents

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Student Management</h1>
            <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center gap-2 shadow-lg">
              <MdAdd className="text-xl" /> Add New Student
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <h3 className="text-2xl font-bold">{totalStudents}</h3>
                </div>
                <MdPerson className="text-4xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Verified</p>
                  <h3 className="text-2xl font-bold">{verifiedStudents}</h3>
                </div>
                <MdCheckCircle className="text-4xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending</p>
                  <h3 className="text-2xl font-bold">{pendingStudents}</h3>
                </div>
                <MdWarning className="text-4xl text-yellow-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Classes</p>
                  <h3 className="text-2xl font-bold">{stats?.totalClasses || 0}</h3>
                </div>
                <MdSchool className="text-4xl text-purple-500" />
              </div>
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ">Create Student</button>
                    <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No students found. Click "Add New Student" to create one.
                    </td>
                  </tr>
                ) : (
                  sortedStudents.map((student: any) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{student.user?.name || '-'}</td>
                    <td className="px-6 py-4">{student.user?.email || '-'}</td>
                    <td className="px-6 py-4">{student.user?.phone || '-'}</td>
                    <td className="px-6 py-4">{student.class?.name || 'Not assigned'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${student.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {student.verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(student)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1">
                        <MdEdit /> Edit
                      </button>
                      <button onClick={() => deleteMutation.mutate(student.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                        <MdDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          {editingStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Student</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={editingStudent.email} onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
                    <button type="button" onClick={() => setEditingStudent(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
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
