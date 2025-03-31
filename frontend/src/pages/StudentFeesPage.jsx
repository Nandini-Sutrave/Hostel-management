import React, { useState } from 'react';
import { Download, AlertCircle, Calendar, FileText, CreditCard, Filter, ArrowUpDown, DollarSign, Clock } from 'lucide-react';

const StudentFeesPage = () => {
  // Sample data - would be fetched from API in real app
  const [feesData, setFeesData] = useState({
    totalFees: 45000,
    paidFees: 30000,
    remainingFees: 15000,
    dueDate: '2025-04-15',
    paymentProgress: 66.67 // (paidFees / totalFees) * 100
  });

  const [fines, setFines] = useState([
    { id: 1, reason: 'Late Rent Payment', amount: 500, date: '2025-03-15', status: 'Pending' },
    { id: 2, reason: 'Room Damage', amount: 1000, date: '2025-02-10', status: 'Paid' },
    { id: 3, reason: 'Lost Key Replacement', amount: 350, date: '2025-01-20', status: 'Paid' },
    { id: 4, reason: 'Common Area Damage', amount: 800, date: '2025-03-22', status: 'Pending' }
  ]);

  const [payments, setPayments] = useState([
    { id: 'TXN00123', date: '2025-03-05', amount: 5000, status: 'Paid', method: 'Online Banking' },
    { id: 'TXN00092', date: '2025-02-01', amount: 15000, status: 'Paid', method: 'Credit Card' },
    { id: 'TXN00071', date: '2025-01-05', amount: 10000, status: 'Paid', method: 'UPI' },
    { id: 'TXN00043', date: '2024-12-10', amount: 15000, status: 'Failed', method: 'Debit Card' },
    { id: 'TXN00032', date: '2024-12-12', amount: 15000, status: 'Paid', method: 'Online Banking' }
  ]);

  const [timeFilter, setTimeFilter] = useState('all');

  // Filter payments based on selected time period
  const filteredPayments = () => {
    const now = new Date();
    
    switch(timeFilter) {
      case '3months':
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return payments.filter(payment => new Date(payment.date) >= threeMonthsAgo);
      case '6months':
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return payments.filter(payment => new Date(payment.date) >= sixMonthsAgo);
      default:
        return payments;
    }
  };

  // Calculate total pending fines
  const pendingFinesTotal = fines
    .filter(fine => fine.status === 'Pending')
    .reduce((total, fine) => total + fine.amount, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Student Portal</h2>
        </div>
        <nav className="p-2">
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Calendar className="w-5 h-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 bg-blue-50 text-blue-700 rounded">
                <CreditCard className="w-5 h-5 mr-2" />
                Fees & Fines
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <FileText className="w-5 h-5 mr-2" />
                Attendance
              </a>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Fees & Fines Management</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Section 1: Total Payable Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Total Payable Fees</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fees Summary Card */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg text-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Total Hostel Fees</h3>
                    <p className="text-3xl font-bold">₹{feesData.totalFees.toLocaleString()}</p>
                  </div>
                  <div className="bg-white bg-opacity-30 p-2 rounded-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payment Progress</span>
                    <span>{feesData.paymentProgress}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${feesData.paymentProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-xs opacity-80">Paid Amount</p>
                    <p className="font-semibold">₹{feesData.paidFees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Remaining</p>
                    <p className="font-semibold">₹{feesData.remainingFees.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <div>
                    <p className="text-xs opacity-80">Due Date</p>
                    <p className="font-semibold">{new Date(feesData.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
                <button className="w-full bg-white text-purple-700 py-2 rounded-md font-medium hover:bg-opacity-90 flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Fee Receipt
                </button>
              </div>
              
              {/* Pay Now Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Make a Payment</h3>
                
                {pendingFinesTotal > 0 && (
                  <div className="flex items-start mb-4 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-700 font-medium">Outstanding Fines</p>
                      <p className="text-sm text-red-600">You have ₹{pendingFinesTotal.toLocaleString()} in unpaid fines. These will be added to your payment.</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md"
                        placeholder="0.00"
                        defaultValue={feesData.remainingFees}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>Credit/Debit Card</option>
                      <option>Net Banking</option>
                      <option>UPI</option>
                      <option>Wallet</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
                  Pay Now
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Fines & Deductions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Fines & Deductions</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Current Fines</h3>
                {pendingFinesTotal > 0 && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Total Pending: ₹{pendingFinesTotal.toLocaleString()}
                  </span>
                )}
              </div>
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fine Reason
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fines.map((fine) => (
                    <tr key={fine.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fine.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{fine.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(fine.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          fine.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fine.status === 'Paid' ? '✅ Paid' : '❌ Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fine.status === 'Pending' ? (
                          <button className="text-blue-600 hover:text-blue-900">
                            Pay Now
                          </button>
                        ) : (
                          <button className="text-gray-600 hover:text-gray-900">
                            View Details
                          </button>
                        )}
                        {fine.status === 'Pending' && (
                          <button className="text-orange-600 hover:text-orange-900 ml-4">
                            Raise Dispute
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {fines.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No fines found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Payment History */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment History</h2>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Filter by time:</span>
                <select 
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                </select>
                
                <button className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments().map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status === 'Paid' ? '✅ Paid' : '❌ Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.status === 'Paid' ? (
                          <button className="text-blue-600 hover:text-blue-900 flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </button>
                        ) : (
                          <button className="text-orange-600 hover:text-orange-900">
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredPayments().length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No payment records found for the selected period
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentFeesPage;