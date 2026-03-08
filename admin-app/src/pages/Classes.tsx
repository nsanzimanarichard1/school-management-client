import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useClasses, useTeachers, useCreateClass, useDeleteClass } from '../services/queries'
import { classSchema, type ClassInput } from '../schemas/auth'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/client'
import { MdEdit, MdAdd } from 'react-icons/md'

export default function Classes() {
  const { data: classes } = useClasses()
  const { data: teachers } = useTeachers()
  const createClass = useCreateClass()
  const deleteClass = useDeleteClass()
  const [showForm, setShowForm] = useState(false)
  const [editingClass, setEditingClass] = useState<any>(null)
  const [formData, setFormData] = useState<ClassInput>({ name: '', grade: '', teacherId: '' })
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await api.patch(`/api/admin/classes/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      setEditingClass(null)
      setMessage('Class updated successfully')
      setTimeout(() => setMessage(''), 3000)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = classSchema.safeParse(formData)
    if (!result.success) return
    
    createClass.mutate(formData, {
      onSuccess: () => {
        setMessage('Class created successfully')
        setShowForm(false)
        setFormData({ name: '', grade: '', teacherId: '' })
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full pt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Class Management</h1>
            <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center gap-2 shadow-lg">
              <MdAdd className="text-xl" /> Add New Class
            </button>
          </div>
          {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Class</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Class Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Grade</label>
                    <input type="text" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Assign Teacher</label>
                    <select value={formData.teacherId} onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })} className="w-full border rounded px-3 py-2">
                      <option value="">Select Teacher</option>
                      {teachers?.map((t: any) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Class</button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classes?.map((cls: any, index: number) => (
                  <tr key={cls._id || cls.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{cls.name}</td>
                    <td className="px-6 py-4">{cls.grade}</td>
                    <td className="px-6 py-4">{cls.teacher?.user?.name || 'Not assigned'}</td>
                    <td className="px-6 py-4">{cls._count?.students || 0}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => setEditingClass(cls)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1">
                        <MdEdit /> Edit
                      </button>
                      <button onClick={() => deleteClass.mutate(cls._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingClass && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Class</h2>
                <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate({ id: editingClass._id, data: { name: editingClass.name, teacherId: editingClass.teacherId } }); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Class Name</label>
                    <input type="text" value={editingClass.name} onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Teacher</label>
                    <select value={editingClass.teacherId || ''} onChange={(e) => setEditingClass({ ...editingClass, teacherId: e.target.value })} className="w-full border rounded px-3 py-2">
                      <option value="">Select Teacher</option>
                      {teachers?.map((t: any) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
                    <button type="button" onClick={() => setEditingClass(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
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
