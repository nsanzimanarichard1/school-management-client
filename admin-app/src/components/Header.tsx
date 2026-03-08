import { useAuth } from '../utils/AuthContext'
import { MdSearch, MdNotifications, MdMessage } from 'react-icons/md'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="relative flex-1 max-w-md">
          <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
          <input
            type="search"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <MdMessage className="text-2xl text-gray-600" />
          </button>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <MdNotifications className="text-2xl text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 ml-4">
            <div>
              <p className="font-semibold text-sm text-right">{user?.name}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
