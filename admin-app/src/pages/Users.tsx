import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useUsers, useVerifyUser, useDeleteUser } from '../services/queries'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function Users() {
  const { data: users, isLoading } = useUsers()
  const verifyUser = useVerifyUser()
  const deleteUser = useDeleteUser()
  const [message, setMessage] = useState('')

  const handleVerify = (userId: string) => {
    verifyUser.mutate(userId, {
      onSuccess: () => {
        setMessage('User verified successfully')
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  const handleDelete = (userId: string) => {
    if (!confirm('Delete this user?')) return
    deleteUser.mutate(userId, {
      onSuccess: () => {
        setMessage('User deleted successfully')
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">User Management</h1>
          {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b">All Users</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map((user: any) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {!user.isVerified && (
                        <button onClick={() => handleVerify(user._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Verify</button>
                      )}
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
