import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useFeeBalance, useFeeHistory, useDeposit, useWithdraw } from '../services/queries'

export default function FeeManagement() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const { data: balanceData } = useFeeBalance()
  const { data: history } = useFeeHistory()
  const deposit = useDeposit()
  const withdraw = useWithdraw()

  const balance = balanceData?.balance || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    
    if (type === 'deposit') {
      deposit.mutate(numAmount, {
        onSuccess: () => setAmount('')
      })
    } else {
      withdraw.mutate(numAmount, {
        onSuccess: () => setAmount('')
      })
    }
  }

  const isLoading = deposit.isPending || withdraw.isPending
  const error = deposit.error || withdraw.error
  const isSuccess = deposit.isSuccess || withdraw.isSuccess

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Fee Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Current Balance</h3>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600">{balance} RWF</h3>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Make Transaction</h3>
            {isSuccess && <div className="alert alert-success">Transaction successful!</div>}
            {error && <div className="alert alert-error">{(error as any).response?.data?.message || 'Transaction failed'}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as 'deposit' | 'withdraw')}>
                  <option value="deposit">Deposit (Payment)</option>
                  <option value="withdraw">Withdraw (Refund)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount (RWF)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
          {!history || history.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.amount} RWF</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
