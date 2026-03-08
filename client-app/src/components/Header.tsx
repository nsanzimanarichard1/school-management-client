import { useAuth } from '../utils/AuthContext'
import { MdSearch, MdNotifications } from 'react-icons/md'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hello {user?.name?.split(' ')[0]} 👋</h2>
          <p className="text-sm text-gray-500">Let's learn something new today!</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <MdNotifications className="text-2xl text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
