import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { MdDashboard, MdGrade, MdCheckCircle, MdSchedule, MdPayment, MdNotifications, MdPerson, MdLogout, MdSchool } from 'react-icons/md'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
    { path: '/grades', label: 'My Grades', icon: MdGrade },
    { path: '/attendance', label: 'Attendance', icon: MdCheckCircle },
    { path: '/timetable', label: 'Timetable', icon: MdSchedule },
    { path: '/fees', label: 'Fees & Payments', icon: MdPayment },
    { path: '/notifications', label: 'Notifications', icon: MdNotifications },
    { path: '/profile', label: 'Profile', icon: MdPerson }
  ]

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-6 flex items-center gap-2">
        <MdSchool className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-600">Academy</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white' : ''
              }`}
            >
              <Icon className="mr-3 text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={logout}
          className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
        >
          <MdLogout className="mr-3 text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  )
}
