import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div><Link to="/dashboard" style={{ fontWeight: 'bold', fontSize: '18px' }}>Admin Portal</Link></div>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/fees">Fees</Link>
        <span style={{ marginLeft: '20px' }}>{user?.name}</span>
        <button onClick={logout} className="btn btn-danger" style={{ marginLeft: '12px' }}>Logout</button>
      </div>
    </nav>
  )
}
