import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'
import { MdPerson, MdEmail, MdSchool } from 'react-icons/md'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <MdPerson className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <MdEmail className="text-2xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <MdSchool className="text-2xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-medium">{user?.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${user?.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium">{user?.verified ? 'Verified' : 'Pending Verification'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
