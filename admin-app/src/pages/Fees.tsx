import { useQuery } from '@tanstack/react-query'
import { MdPayment, MdAccountBalance, MdHistory, MdTrendingUp } from 'react-icons/md'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { api } from '../api/client'

export default function Fees() {
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await api.get('/api/fees/history')
      return res.data.data || { transactions: [], totalDeposits: 0, totalWithdrawals: 0 }
    }
  })

  const { data: stats } = useQuery({
    queryKey: ['feeStats'],
    queryFn: async () => {
      const res = await api.get('/api/admin/dashboard/stats')
      return res.data.data || {}
    }
  })

  const txList = transactions?.transactions || []
  const totalDeposits = transactions?.totalDeposits || 0
  const totalWithdrawals = transactions?.totalWithdrawals || 0
  const balance = totalDeposits - totalWithdrawals

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Fee Management</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Balance</p>
                  <h3 className="text-2xl font-bold">{balance.toLocaleString()} RWF</h3>
                </div>
                <MdAccountBalance className="text-4xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Deposits</p>
                  <h3 className="text-2xl font-bold">{totalDeposits.toLocaleString()} RWF</h3>
                </div>
                <MdTrendingUp className="text-4xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Withdrawals</p>
                  <h3 className="text-2xl font-bold">{totalWithdrawals.toLocaleString()} RWF</h3>
                </div>
                <MdPayment className="text-4xl text-red-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Transactions</p>
                  <h3 className="text-2xl font-bold">{txList.length}</h3>
                </div>
                <MdHistory className="text-4xl text-purple-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 border-b">All Transactions</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {txList.map((tx: any, idx: number) => (
                  <tr key={tx.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{tx.amount.toLocaleString()} RWF</td>
                    <td className="px-6 py-4">{tx.description || tx.reason || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${tx.status === 'completed' ? 'bg-green-100 text-green-800' : tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {txList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
