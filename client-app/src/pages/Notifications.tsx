import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { MdNotifications } from 'react-icons/md'

export default function Notifications() {
  const notifications = [
    { id: 1, title: 'Fee Payment Received', message: 'Your payment of 2345 RWF has been confirmed', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Assignment Due', message: 'Mathematics assignment is due tomorrow', time: '5 hours ago', type: 'warning' },
    { id: 3, title: 'Grade Updated', message: 'Your Science grade has been updated', time: '1 day ago', type: 'info' }
  ]

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <MdNotifications className="text-3xl text-purple-600" />
            <h1 className="text-3xl font-bold">Notifications</h1>
          </div>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${
                notif.type === 'success' ? 'border-green-500' :
                notif.type === 'warning' ? 'border-yellow-500' :
                'border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{notif.title}</h3>
                    <p className="text-gray-600 text-sm">{notif.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
