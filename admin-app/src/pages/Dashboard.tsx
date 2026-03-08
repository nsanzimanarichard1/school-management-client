import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { MdPeople, MdSchool, MdPerson, MdTrendingUp, MdTrendingDown } from 'react-icons/md'

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await api.get('/api/admin/dashboard/stats')
      return res.data.data
    }
  })

  const statCards = [
    { label: 'Students', value: stats?.totalStudents || 0, change: '+15%', color: 'bg-purple-100', icon: MdPeople, textColor: 'text-purple-600', trend: 'up' },
    { label: 'Teachers', value: stats?.totalTeachers || 0, change: '+3%', color: 'bg-yellow-100', icon: MdSchool, textColor: 'text-yellow-600', trend: 'down' },
    { label: 'Staffs', value: stats?.totalStaff || 0, change: '+3%', color: 'bg-purple-200', icon: MdPerson, textColor: 'text-purple-700', trend: 'down' },
    { label: 'Awards', value: stats?.totalAwards || 0, change: '+5%', color: 'bg-yellow-200', icon: MdTrendingUp, textColor: 'text-yellow-700', trend: 'up' }
  ]

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? MdTrendingUp : MdTrendingDown
              return (
                <div key={idx} className={`${stat.color} rounded-2xl p-6 relative`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      <TrendIcon className="inline mr-1" />{stat.change}
                    </span>
                    <button className="text-gray-400">⋯</button>
                  </div>
                  <h4 className={`text-4xl font-bold ${stat.textColor} mb-2`}>{stat.value.toLocaleString()}</h4>
                  <p className="text-sm text-gray-700">{stat.label}</p>
                  <Icon className={`absolute bottom-4 right-4 text-5xl ${stat.textColor} opacity-20`} />
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Students</h3>
                <button className="text-gray-400">⋯</button>
              </div>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#E0E7FF" strokeWidth="12"/>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#60A5FA" strokeWidth="12" strokeDasharray="180 251" transform="rotate(-90 50 50)"/>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#FCD34D" strokeWidth="12" strokeDasharray="71 251" strokeDashoffset="-180" transform="rotate(-90 50 50)"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">{stats?.totalStudents || 0}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span className="text-sm">Male: {stats?.maleStudents || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm">Female: {stats?.femaleStudents || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Attendance</h3>
                <select className="text-sm border rounded px-2 py-1">
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Present</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Absent</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '5%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
