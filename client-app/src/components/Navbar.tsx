import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold">School Portal</Link>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/fees" className="hover:text-gray-300">Fees</Link>
            <Link to="/academics" className="hover:text-gray-300">Academics</Link>
            <span className="text-gray-300">{user?.name}</span>
            <button onClick={logout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
