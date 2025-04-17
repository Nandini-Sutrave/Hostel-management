

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Home, User, Clock, DollarSign, AlertCircle, 
//   LogIn, Bell, Package, MessageSquare, Menu,
//   Users, Shield, FileText, Settings
// } from 'lucide-react';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { useNavigate } from 'react-router-dom';

// // Register ChartJS components if chart.js is available
// if (typeof ChartJS !== 'undefined') {
//   ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
// }

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);
  
//   // Student state
//   const [studentUser, setStudentUser] = useState(null);
  
//   // Warden state
//   const [dashboardData, setDashboardData] = useState({
//     totalStudents: 0,
//     totalRooms: 0,
//     complaints: [],
//     wardenProfile: {}
//   });
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     // Get user role from localStorage
//     const role = localStorage.getItem("role");
//     setUserRole(role);
    
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
        
//         if (!token) {
//           throw new Error("No authentication token found");
//         }
        
//         // Fetch data based on user role
//         if (role === 'warden') {
//           await fetchWardenData(token);
//         } else {
//           await fetchStudentData(token);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
        
//         if (err.response && err.response.status === 403) {
//           setError("Not authorized to access this resource. Please log in again.");
//           setTimeout(() => navigate('/login'), 3000);
//         } else {
//           setError(err.message || "An error occurred while fetching profile data");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [navigate]);
  
//   const fetchStudentData = async (token) => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/students/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Fetched student:", data);
//       setStudentUser(data.data);
//     } catch (err) {
//       throw err;
//     }
//   };
  
//   const fetchWardenData = async (token) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/warden/dashboard', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("Fetched warden data:", response.data);
//       setDashboardData(response.data.data);
//     } catch (err) {
//       throw err;
//     }
//   };

//   // Render loading and error states
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <div className="text-xl font-semibold">Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
//         <div className="flex items-center">
//           <AlertCircle className="text-red-500 mr-2" />
//           <p className="text-red-500 font-medium">{error}</p>
//         </div>
//         <button 
//           onClick={() => navigate('/login')} 
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Return to Login
//         </button>
//       </div>
//     );
//   }

//   // Render Student Dashboard
//   if (userRole !== 'warden') {
//     // Student dashboard rendering
//     return renderStudentDashboard();
//   }
  
//   // Render Warden Dashboard
//   return renderWardenDashboard();
  
//   // Student Dashboard Component
//   function renderStudentDashboard() {
//     if (!studentUser) {
//       return <p className="text-center py-4">No student data available</p>;
//     }

//     const {
//       name,
//       profileImage,
//       roomNumber,
//       block,
//       semester,
//     } = studentUser;
    
//     return (
//       <div>
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center mb-6">
//             <img 
//               src={profileImage || '/default-profile.png'} 
//               alt={name} 
//               className="w-24 h-24 rounded-full mr-6 object-cover border-4 border-blue-500"
//               onError={(e) => { e.target.src = '/default-profile.png'; }}
//             />
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
//               <p className="text-gray-600">{semester} Semester</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-blue-100 p-4 rounded-lg">
//               <h3 className="text-sm font-semibold text-blue-800 mb-2">Room Details</h3>
//               <p className="text-lg font-bold text-blue-600">Room {roomNumber}, Block {block}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-white rounded-lg shadow-md p-5">
//             <h3 className="text-lg font-semibold mb-3">Recent Complaints</h3>
//             <p>No recent complaints</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-5">
//             <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
//             <p>No upcoming events</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-5">
//             <h3 className="text-lg font-semibold mb-3">Announcements</h3>
//             <p>No new announcements</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // Warden Dashboard Component
//   function renderWardenDashboard() {
//     // Calculate complaint statistics if available
//     const complaints = dashboardData.complaints || [];
//     const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
//     const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
//     const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;

//     // Prepare chart data
//     const complaintChartData = {
//       labels: ['Pending', 'In Progress', 'Resolved'],
//       datasets: [
//         {
//           data: [pendingComplaints, inProgressComplaints, resolvedComplaints],
//           backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
//           hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB']
//         }
//       ]
//     };

//     // Assume we have room occupancy data
//     const roomOccupancyData = {
//       labels: ['Occupied', 'Available'],
//       datasets: [
//         {
//           data: [
//             dashboardData.totalRooms - Math.floor(dashboardData.totalRooms * 0.2), // Simulated occupied rooms
//             Math.floor(dashboardData.totalRooms * 0.2) // Simulated available rooms
//           ],
//           backgroundColor: ['#4BC0C0', '#9966FF'],
//           hoverBackgroundColor: ['#4BC0C0', '#9966FF']
//         }
//       ]
//     };
    
//     return (
//       <div className="container mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Warden Dashboard</h1>
//             <p className="text-gray-600">Welcome back, {dashboardData.wardenProfile?.name || 'Warden'}</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="mb-6 border-b border-gray-200">
//           <ul className="flex flex-wrap -mb-px">
//             <li className="mr-2">
//               <button 
//                 className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Overview
//               </button>
//             </li>
//             <li className="mr-2">
//               <button 
//                 className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'complaints' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('complaints')}
//               >
//                 Complaints
//               </button>
//             </li>
//             <li className="mr-2">
//               <button 
//                 className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'rooms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('rooms')}
//               >
//                 Rooms
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Overview Tab Content */}
//         {activeTab === 'overview' && (
//           <div>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center">
//                   <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                     <Users className="w-8 h-8" />
//                   </div>
//                   <div className="ml-4">
//                     <h2 className="text-gray-600 text-sm">Total Students</h2>
//                     <p className="text-2xl font-bold text-gray-800">{dashboardData.totalStudents}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center">
//                   <div className="p-3 rounded-full bg-green-100 text-green-600">
//                     <Home className="w-8 h-8" />
//                   </div>
//                   <div className="ml-4">
//                     <h2 className="text-gray-600 text-sm">Total Rooms</h2>
//                     <p className="text-2xl font-bold text-gray-800">{dashboardData.totalRooms}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center">
//                   <div className="p-3 rounded-full bg-red-100 text-red-600">
//                     <AlertCircle className="w-8 h-8" />
//                   </div>
//                   <div className="ml-4">
//                     <h2 className="text-gray-600 text-sm">Pending Complaints</h2>
//                     <p className="text-2xl font-bold text-gray-800">{pendingComplaints}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Charts Section */}
//             {typeof Pie !== 'undefined' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <h2 className="text-lg font-semibold mb-4">Complaint Status</h2>
//                   <div className="h-64">
//                     <Pie data={complaintChartData} options={{ maintainAspectRatio: false }} />
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <h2 className="text-lg font-semibold mb-4">Room Occupancy</h2>
//                   <div className="h-64">
//                     <Pie data={roomOccupancyData} options={{ maintainAspectRatio: false }} />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Recent Activity */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-lg font-semibold mb-4">Recent Complaints</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {complaints.slice(0, 5).map((complaint, index) => (
//                       <tr key={complaint._id || index}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{complaint._id?.substring(0, 6) || index + 1}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.issue}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                             ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
//                               complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {complaint.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                     {complaints.length === 0 && (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No complaints found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Complaints Tab Content */}
//         {activeTab === 'complaints' && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">All Complaints</h3>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage and respond to student complaints</p>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {complaints.map((complaint, index) => (
//                     <tr key={complaint._id || index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{complaint._id?.substring(0, 6) || index + 1}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {complaint.student?.name || 'Unknown Student'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.issue}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
//                             complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                           {complaint.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <select 
//                           className="text-indigo-600 hover:text-indigo-900 bg-white border border-gray-300 rounded px-2 py-1"
//                           defaultValue={complaint.status}
//                           onChange={(e) => {
//                             // Handle status update
//                             console.log(`Update complaint ${complaint._id} status to ${e.target.value}`);
//                             // Here you would call your API to update the status
//                           }}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="in-progress">In Progress</option>
//                           <option value="resolved">Resolved</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                   {complaints.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No complaints found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Rooms Tab Content */}
//         {activeTab === 'rooms' && (
//           <div>
//             <div className="mb-6 flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Room Management</h2>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
//                 Add New Room
//               </button>
//             </div>
            
//             <div className="bg-white rounded-lg shadow">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupants</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {/* Sample room data - in a real app, you would fetch this from the API */}
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A101</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Double</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                           Full
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
//                         <button className="text-gray-600 hover:text-gray-900">View</button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A102</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Single</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           Available
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
//                         <button className="text-gray-600 hover:text-gray-900">View</button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  LogIn, Bell, Package, MessageSquare, Menu,
  Users, Shield, FileText, Settings
} from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register ChartJS components if chart.js is available
if (typeof ChartJS !== 'undefined') {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
  // Student state
  const [studentUser, setStudentUser] = useState(null);
  
  // Warden state
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalRooms: 0,
    complaints: [],
    wardenProfile: {}
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("role");
    setUserRole(role);
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No authentication token found");
        }
        
        // Fetch data based on user role
        if (role === 'warden') {
          await fetchWardenData(token);
        } else {
          await fetchStudentData(token);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        
        if (err.response && err.response.status === 403) {
          setError("Not authorized to access this resource. Please log in again.");
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError(err.message || "An error occurred while fetching profile data");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);
  
  const fetchStudentData = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/students/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched student:", data);
      setStudentUser(data.data);
    } catch (err) {
      throw err;
    }
  };
  
  const fetchWardenData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/warden/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Fetched warden data:", response.data);
      setDashboardData(response.data.data);
    } catch (err) {
      throw err;
    }
  };

  // Render loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <AlertCircle className="text-red-500 mr-2" />
          <p className="text-red-500 font-medium">{error}</p>
        </div>
        <button 
          onClick={() => navigate('/login')} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Render Student Dashboard
  if (userRole !== 'warden') {
    // Student dashboard rendering
    return renderStudentDashboard();
  }
  
  // Render Warden Dashboard
  return renderWardenDashboard();
  
  // Student Dashboard Component
  function renderStudentDashboard() {
    if (!studentUser) {
      return <p className="text-center py-4">No student data available</p>;
    }

    const {
      name,
      profileImage,
      roomNumber,
      block,
      semester,
    } = studentUser;
    
    return (
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <img 
              src={profileImage || '/default-profile.png'} 
              alt={name} 
              className="w-24 h-24 rounded-full mr-6 object-cover border-4 border-blue-500"
              onError={(e) => { e.target.src = '/default-profile.png'; }}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <p className="text-gray-600">{semester} Semester</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Room Details</h3>
              <p className="text-lg font-bold text-blue-600">Room {roomNumber}, Block {block}</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold mb-3">Recent Complaints</h3>
            <p>No recent complaints</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
            <p>No upcoming events</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold mb-3">Announcements</h3>
            <p>No new announcements</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Warden Dashboard Component
  function renderWardenDashboard() {
    // Calculate complaint statistics if available
    const complaints = dashboardData.complaints || [];
    const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
    const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;

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
    
    return (
      <div className="container mx-auto">
        {/* Header Section - Updated for better visibility against dark background */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white bg-opacity-90 p-4 rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Warden Dashboard</h1>
            <p className="text-blue-600">Welcome back, {dashboardData.wardenProfile?.name || 'Warden'}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-blue-500">Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Navigation Tabs - Updated with higher contrast */}
        <div className="mb-6 border-b border-gray-200 bg-white bg-opacity-90 rounded-t-lg">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button 
                className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'complaints' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
                onClick={() => setActiveTab('complaints')}
              >
                Complaints
              </button>
            </li>
            <li className="mr-2">
              <button 
                className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'rooms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
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
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-blue-600 text-sm font-bold">Total Students</h2>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.totalStudents}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <Home className="w-8 h-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-green-600 text-sm font-bold">Total Rooms</h2>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.totalRooms}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-red-600 text-sm font-bold">Pending Complaints</h2>
                    <p className="text-2xl font-bold text-gray-800">{pendingComplaints}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {typeof Pie !== 'undefined' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-blue-700">Complaint Status</h2>
                  <div className="h-64">
                    <Pie data={complaintChartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-blue-700">Room Occupancy</h2>
                  <div className="h-64">
                    <Pie data={roomOccupancyData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-blue-700">Recent Complaints</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.slice(0, 5).map((complaint, index) => (
                      <tr key={complaint._id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">#{complaint._id?.substring(0, 6) || index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.issue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                              complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(complaint.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {complaints.length === 0 && (
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
              <h3 className="text-lg leading-6 font-medium text-blue-700">All Complaints</h3>
              <p className="mt-1 max-w-2xl text-sm text-blue-500">Manage and respond to student complaints</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complaints.map((complaint, index) => (
                    <tr key={complaint._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">#{complaint._id?.substring(0, 6) || index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {complaint.student?.name || 'Unknown Student'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                            complaint.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
                  {complaints.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No complaints found</td>
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
            <div className="mb-6 flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700">Room Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Add New Room
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Room No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Block</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Occupants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample room data - in a real app, you would fetch this from the API */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A101</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">A</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Double</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2</td>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">A</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Single</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0</td>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Dashboard;