import React, { useState } from 'react';
import { Calendar, Clock, FileText, Download, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Home, User, DollarSign, AlertCircle, 
  LogIn, Bell, Package, MessageSquare, Menu 
} from 'lucide-react';
const StudentAttendancePage = () => {
  // Sample data - would be fetched from API in real app
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('attendance');
  const menuItems = [
    { 
      icon: <Home />, 
      label: 'Dashboard', 
      section: 'dashboard',
      roles: ['student', 'warden'] 
    },
    { 
      icon: <User />, 
      label: 'Profile', 
      section: 'profile',
      roles: ['student', 'warden'] 
    },
    { 
      icon: <Clock />, 
      label: 'Attendance', 
      section: 'attendance',
      roles: ['student', 'warden'] 
    },
    { 
      icon: <DollarSign />, 
      label: 'Fees', 
      section: 'fees',
      roles: ['student', 'warden'] 
    },
    { 
      icon: <AlertCircle />, 
      label: 'Complaints', 
      section: 'complaints',
      roles: ['student', 'warden'] 
    },
    { 
      icon: <Bell />, 
      label: 'Noticeboard', 
      section: 'noticeboard',
      roles: ['student', 'warden'] 
    }
  ];
  const [attendanceData, setAttendanceData] = useState({
    totalPercentage: 85,
    presentDays: 51,
    absentDays: 6,
    leavesTaken: 3
  });

  const [monthlyData, setMonthlyData] = useState([
    { name: 'Jan', attendance: 92 },
    { name: 'Feb', attendance: 88 },
    { name: 'Mar', attendance: 85 },
  ]);

  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: '1st March', status: 'Present', remarks: '-' },
    { date: '2nd March', status: 'Absent', remarks: 'Sick' },
    { date: '3rd March', status: 'Leave', remarks: 'Approved' },
    { date: '4th March', status: 'Present', remarks: '-' },
    { date: '5th March', status: 'Present', remarks: '-' },
    { date: '6th March', status: 'Present', remarks: '-' },
    { date: '7th March', status: 'Present', remarks: '-' },
  ]);

  const [leaveApplications, setLeaveApplications] = useState([
    { id: 1, startDate: '2025-03-03', endDate: '2025-03-03', reason: 'Medical', status: 'Approved', document: 'med_cert.pdf' },
    { id: 2, startDate: '2025-03-15', endDate: '2025-03-17', reason: 'Family function', status: 'Pending', document: '' },
  ]);

  const [newLeaveApplication, setNewLeaveApplication] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    document: null
  });

  // Form handlers
  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    setNewLeaveApplication(prev => ({ ...prev, document: e.target.files[0] }));
  };

  const submitLeaveApplication = (e) => {
    e.preventDefault();
    // API call would go here
    alert('Leave application submitted successfully!');
    setNewLeaveApplication({
      startDate: '',
      endDate: '',
      reason: '',
      document: null
    });
  };

  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Present':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">✅ Present</span>;
      case 'Absent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">❌ Absent</span>;
      case 'Leave':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">🏖 Leave</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getLeaveStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">✅ Approved</span>;
      case 'Rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">❌ Rejected</span>;
      case 'Pending':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">⏳ Pending</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    // <div className="flex h-screen bg-gray-50">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-white shadow-md">
    //     <div className="p-4 border-b">
    //       <h2 className="text-xl font-semibold">Student Portal</h2>
    //     </div>
    //     <nav className="p-2">
    //       <ul>
    //         <li className="mb-1">
    //           <a href="#" className="flex items-center p-2 bg-blue-50 text-blue-700 rounded">
    //             <Calendar className="w-5 h-5 mr-2" />
    //             Attendance
    //           </a>
    //         </li>
    //         <li className="mb-1">
    //           <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
    //             <FileText className="w-5 h-5 mr-2" />
    //             Leave Management
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>

    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      {/* <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Hostel Hub
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center p-4 hover:bg-blue-50 ${
                activeSection === item.section 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <span className="mr-4">{item.icon}</span>
              <span className={`transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Attendance & Leave Management</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Attendance Summary Cards */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Attendance</h3>
                <p className="text-3xl font-bold text-blue-600">{attendanceData.totalPercentage}%</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Present Days</h3>
                <p className="text-3xl font-bold text-green-600">{attendanceData.presentDays}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Absent Days</h3>
                <p className="text-3xl font-bold text-red-600">{attendanceData.absentDays}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Leaves Taken</h3>
                <p className="text-3xl font-bold text-yellow-600">{attendanceData.leavesTaken}</p>
              </div>
            </div>
            
            {/* Monthly Trend Chart */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Monthly Attendance Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Attendance Records Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Attendance Records</h2>
              
              <div className="flex space-x-2">
                <select 
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option>January 2025</option>
                  <option>February 2025</option>
                  <option>March 2025</option>
                </select>
                
                <button className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-100">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceRecords.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Leave Application Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Leave Applications</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leave Application Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Apply for Leave</h3>
                
                <form onSubmit={submitLeaveApplication}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input 
                          type="date" 
                          name="startDate"
                          value={newLeaveApplication.startDate}
                          onChange={handleLeaveFormChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input 
                          type="date" 
                          name="endDate"
                          value={newLeaveApplication.endDate}
                          onChange={handleLeaveFormChange}
                          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                      <select 
                        name="reason"
                        value={newLeaveApplication.reason}
                        onChange={handleLeaveFormChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select reason</option>
                        <option value="Medical">Medical</option>
                        <option value="Family Emergency">Family Emergency</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Document (Optional)
                      </label>
                      <input 
                        type="file" 
                        name="document"
                        onChange={handleFileUpload}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload medical certificate or supporting documents (PDF, JPG, PNG)
                      </p>
                    </div>
                    
                    <div>
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Leave Status */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium">Leave Status</h3>
                </div>
                
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaveApplications.map((leave) => (
                      <tr key={leave.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {getLeaveStatusBadge(leave.status)}
                        </td>
                      </tr>
                    ))}
                    {leaveApplications.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No leave applications found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              {/* Notification Card */}
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Your attendance is below 85% this month. Please ensure regular attendance.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Notification Card */}
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Your leave application for March 3rd has been approved by the warden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendancePage;