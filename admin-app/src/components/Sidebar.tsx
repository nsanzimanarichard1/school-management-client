import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { MdDashboard, MdPeople, MdSchool, MdPerson, MdCheckCircle, MdPayment, MdSchedule, MdBook, MdNotifications, MdSettings, MdLogout, MdArrowBack } from 'react-icons/md'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
    { path: '/students', label: 'Students', icon: MdPeople },
    { path: '/teachers', label: 'Teachers', icon: MdSchool },
    { path: '/parents', label: 'Parents', icon: MdPerson },
    { path: '/classes', label: 'Classes', icon: MdBook },
    { path: '/subjects', label: 'Subjects', icon: MdBook },
    { path: '/grades', label: 'Grades', icon: MdCheckCircle },
    { path: '/attendance', label: 'Attendance', icon: MdCheckCircle },
    { path: '/timetable', label: 'Timetable', icon: MdSchedule },
    { path: '/fees', label: 'Finance', icon: MdPayment },
    { path: '/approvals', label: 'Approvals', icon: MdNotifications },
    { path: '/settings', label: 'Settings', icon: MdSettings }
  ]

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg overflow-y-auto">
      <div className="p-6 flex items-center gap-2">
        <MdSchool className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-600">SchoolHub</h1>
      </div>
      {location.pathname !== '/dashboard' && (
        <div className="px-4 mb-2">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
            <MdArrowBack /> Back
          </button>
        </div>
      )}
      <div className="px-4 mb-4">
        <p className="text-xs text-gray-500 uppercase mb-2">Menu</p>
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`}
            >
              <Icon className="mr-3 text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
        <div className="px-4 my-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Other</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <MdLogout className="mr-3 text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  )
}
