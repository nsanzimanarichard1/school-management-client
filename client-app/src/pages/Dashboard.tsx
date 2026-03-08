import { useFeeBalance, useFeeHistory, useAttendance } from '../services/queries'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { MdAccountBalanceWallet, MdCheckCircle, MdAssignment, MdNotifications, MdArrowUpward, MdArrowDownward, MdEvent, MdScience, MdPeople } from 'react-icons/md'

export default function Dashboard() {
  const { data: balanceData } = useFeeBalance()
  const { data: historyData } = useFeeHistory()
  const { data: attendanceData } = useAttendance()

  const balance = balanceData?.balance || 0
  const isLowBalance = balanceData?.isLowBalance || false
  const transactions = historyData?.transactions || []
  const attendance = attendanceData || []

  const stats = [
    { label: 'Fee Balance', value: `${balance} RWF`, color: 'bg-orange-100', icon: MdAccountBalanceWallet, textColor: 'text-orange-600' },
    { label: 'Attendance', value: `${attendance.length}`, color: 'bg-green-100', icon: MdCheckCircle, textColor: 'text-green-600' },
    { label: 'Assignments', value: '15', color: 'bg-blue-100', icon: MdAssignment, textColor: 'text-blue-600' },
    { label: 'Notifications', value: '87', color: 'bg-purple-100', icon: MdNotifications, textColor: 'text-purple-600' }
  ]

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-20">
          <h3 className="text-xl font-bold mb-6">Overview</h3>
          
          {isLowBalance && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">⚠️ Low fee balance! Current balance: {balance} RWF</p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className={`${stat.color} rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`text-3xl ${stat.textColor}`} />
                  </div>
                  <h4 className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</h4>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-bold mb-4">Recent Transactions</h4>
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No transactions yet</p>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((tx: any) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'DEPOSIT' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {tx.type === 'DEPOSIT' ? 
                            <MdArrowDownward className="text-green-600" /> : 
                            <MdArrowUpward className="text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm">{tx.description}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount} RWF
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tx.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-bold mb-4">Upcoming Events</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Mathematics Exam</p>
                    <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                  <MdAssignment className="text-2xl text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Science Project Due</p>
                    <p className="text-xs text-gray-500">Friday, 5:00 PM</p>
                  </div>
                  <MdScience className="text-2xl text-purple-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Parent-Teacher Meeting</p>
                    <p className="text-xs text-gray-500">Next Monday, 2:00 PM</p>
                  </div>
                  <MdPeople className="text-2xl text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
