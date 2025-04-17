


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Users, Home, AlertCircle, LogOut, ClipboardList } from 'lucide-react';

// const WardenDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const dashboardRes = await axios.get('http://localhost:5000/api/warden/dashboard', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const studentsRes = await axios.get('http://localhost:5000/api/warden/students', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         console.log("Student response:", studentsRes.data);
//         console.log("Student list in state:", students);

//         setDashboardData(dashboardRes.data.data);
//         setStudents(studentsRes.data.data);
//       } catch (err) {
//         setError(err.message || 'Something went wrong.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (error) return <div className="text-red-500 p-6">{error}</div>;

//   const { totalStudents, totalRooms, complaints = [],  wardenProfile={} } = dashboardData || {};

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-white">Warden Dashboard</h1>

//       {/* Warden Profile */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Welcome, {wardenProfile.name || "Warden"}</h2>
//         <p className="text-gray-600">Email: {wardenProfile.email}</p>
//         <p className="text-gray-600">Department: {wardenProfile.department}</p>
//       </div>

//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-blue-100 p-6 rounded-lg shadow">
//           <div className="flex items-center mb-2">
//             <Users className="text-blue-600 mr-2" />
//             <span className="text-xl font-bold">{totalStudents}</span>
//           </div>
//           <p className="text-blue-800">Total Students</p>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg shadow">
//           <div className="flex items-center mb-2">
//             <Home className="text-green-600 mr-2" />
//             <span className="text-xl font-bold">{totalRooms}</span>
//           </div>
//           <p className="text-green-800">Total Rooms</p>
//         </div>
//         <div className="bg-red-100 p-6 rounded-lg shadow">
//           <div className="flex items-center mb-2">
//             <AlertCircle className="text-red-600 mr-2" />
//             <span className="text-xl font-bold">{complaints.length}</span>
//           </div>
//           <p className="text-red-800">Pending Complaints</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <button className="bg-indigo-600 text-white p-3 rounded-lg shadow hover:bg-indigo-700">
//           <ClipboardList className="inline-block mr-2" /> Assign Room
//         </button>
//         <button className="bg-green-600 text-white p-3 rounded-lg shadow hover:bg-green-700">
//           <Users className="inline-block mr-2" /> View Students
//         </button>
//         <button className="bg-yellow-600 text-white p-3 rounded-lg shadow hover:bg-yellow-700">
//           <Home className="inline-block mr-2" /> Room Status
//         </button>
//         <button className="bg-red-600 text-white p-3 rounded-lg shadow hover:bg-red-700">
//           <LogOut className="inline-block mr-2" /> Logout
//         </button>
//       </div> */}

//       {/* Recent Complaints */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
//         {complaints.length === 0 ? (
//           <p>No complaints right now.</p>
//         ) : (
//           <ul className="divide-y">
//             {complaints.slice(0, 5).map((c) => (
//               <li key={c._id} className="py-3">
//                 <p className="font-medium">{c.title}</p>
//                 <p className="text-sm text-gray-500">
//                   {c.student?.name || "Unknown"} - {c.student?.roomNumber || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">{c.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Recent Leave Requests */}
//       {/* <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Recent Leave Requests</h2>
//         {leaveRequests.length === 0 ? (
//           <p>No leave requests found.</p>
//         ) : (
//           <ul className="divide-y">
//             {leaveRequests.slice(0, 5).map((leave) => (
//               <li key={leave._id} className="py-3">
//                 <p className="font-medium">{leave.student?.name || "Unknown"}</p>
//                 <p className="text-sm text-gray-500">
//                   From {leave.fromDate} to {leave.toDate}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div> */}

//       {/* Students List */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Student List</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left table-auto">
//             <thead>
//               <tr className="border-b">
//                 <th className="px-4 py-2">ID</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Year</th>
//                 <th className="px-4 py-2">Room</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.slice(0, 5).map((s) => (
//                 <tr key={s._id} className="border-b hover:bg-gray-100">
//                   <td className="px-4 py-2">{s.studentId}</td>
//                   <td className="px-4 py-2">{s.name}</td>
//                   <td className="px-4 py-2">{s.year}</td>
//                   <td className="px-4 py-2">{s.currentRoom || "N/A"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WardenDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const WardenDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalRooms: 0,
    complaints: [],
    wardenProfile: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/warden/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate complaint statistics
  const pendingComplaints = dashboardData.complaints.filter(c => c.status === 'pending').length;
  const resolvedComplaints = dashboardData.complaints.filter(c => c.status === 'resolved').length;
  const inProgressComplaints = dashboardData.complaints.filter(c => c.status === 'in-progress').length;

  // Prepare chart data
  const complaintChartData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [pendingComplaints, inProgressComplaints, resolvedComplaints],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB']
      }
    ]
  };

  // Assume we have room occupancy data
  const roomOccupancyData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [
          dashboardData.totalRooms - Math.floor(dashboardData.totalRooms * 0.2), // Simulated occupied rooms
          Math.floor(dashboardData.totalRooms * 0.2) // Simulated available rooms
        ],
        backgroundColor: ['#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#4BC0C0', '#9966FF']
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Warden Dashboard</h1>
          <p className="text-gray-600">Welcome back, {dashboardData.wardenProfile?.name || 'Warden'}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'complaints' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('complaints')}
            >
              Complaints
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'rooms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
          </li>
        </ul>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Total Students</h2>
                  <p className="text-2xl font-bold text-gray-800">{dashboardData.totalStudents}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Total Rooms</h2>
                  <p className="text-2xl font-bold text-gray-800">{dashboardData.totalRooms}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Pending Complaints</h2>
                  <p className="text-2xl font-bold text-gray-800">{pendingComplaints}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Complaint Status</h2>
              <div className="h-64">
                <Pie data={complaintChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Room Occupancy</h2>
              <div className="h-64">
                <Pie data={roomOccupancyData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Complaints</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.complaints.slice(0, 5).map((complaint, index) => (
                    <tr key={complaint._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{complaint._id?.substring(0, 6) || index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                            complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {dashboardData.complaints.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No complaints found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Complaints Tab Content */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">All Complaints</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage and respond to student complaints</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.complaints.map((complaint, index) => (
                  <tr key={complaint._id || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{complaint._id?.substring(0, 6) || index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {complaint.student?.name || 'Unknown Student'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.issue}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{complaint.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                          complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select 
                        className="text-indigo-600 hover:text-indigo-900 bg-white border border-gray-300 rounded px-2 py-1"
                        defaultValue={complaint.status}
                        onChange={(e) => {
                          // Handle status update
                          console.log(`Update complaint ${complaint._id} status to ${e.target.value}`);
                          // Here you would call your API to update the status
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {dashboardData.complaints.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No complaints found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rooms Tab Content */}
      {activeTab === 'rooms' && (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Room Management</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Add New Room
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Sample room data - in a real app, you would fetch this from the API */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A101</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Double</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Full
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A102</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Single</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">B201</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">B</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Double</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Partial
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardenDashboard;