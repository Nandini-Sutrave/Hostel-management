


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Home, AlertCircle, LogOut, ClipboardList } from 'lucide-react';

const WardenDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const dashboardRes = await axios.get('http://localhost:5000/api/warden/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const studentsRes = await axios.get('http://localhost:5000/api/warden/students', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDashboardData(dashboardRes.data.data);
        setStudents(studentsRes.data.data);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  const { totalStudents, totalRooms, complaints = [],  wardenProfile={} } = dashboardData || {};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Warden Dashboard</h1>

      {/* Warden Profile */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {wardenProfile.name || "Warden"}</h2>
        <p className="text-gray-600">Email: {wardenProfile.email}</p>
        <p className="text-gray-600">Department: {wardenProfile.department}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <Users className="text-blue-600 mr-2" />
            <span className="text-xl font-bold">{totalStudents}</span>
          </div>
          <p className="text-blue-800">Total Students</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <Home className="text-green-600 mr-2" />
            <span className="text-xl font-bold">{totalRooms}</span>
          </div>
          <p className="text-green-800">Total Rooms</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <AlertCircle className="text-red-600 mr-2" />
            <span className="text-xl font-bold">{complaints.length}</span>
          </div>
          <p className="text-red-800">Pending Complaints</p>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="bg-indigo-600 text-white p-3 rounded-lg shadow hover:bg-indigo-700">
          <ClipboardList className="inline-block mr-2" /> Assign Room
        </button>
        <button className="bg-green-600 text-white p-3 rounded-lg shadow hover:bg-green-700">
          <Users className="inline-block mr-2" /> View Students
        </button>
        <button className="bg-yellow-600 text-white p-3 rounded-lg shadow hover:bg-yellow-700">
          <Home className="inline-block mr-2" /> Room Status
        </button>
        <button className="bg-red-600 text-white p-3 rounded-lg shadow hover:bg-red-700">
          <LogOut className="inline-block mr-2" /> Logout
        </button>
      </div> */}

      {/* Recent Complaints */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
        {complaints.length === 0 ? (
          <p>No complaints right now.</p>
        ) : (
          <ul className="divide-y">
            {complaints.slice(0, 5).map((c) => (
              <li key={c._id} className="py-3">
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-gray-500">
                  {c.student?.name || "Unknown"} - {c.student?.roomNumber || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">{c.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Leave Requests */}
      {/* <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Leave Requests</h2>
        {leaveRequests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <ul className="divide-y">
            {leaveRequests.slice(0, 5).map((leave) => (
              <li key={leave._id} className="py-3">
                <p className="font-medium">{leave.student?.name || "Unknown"}</p>
                <p className="text-sm text-gray-500">
                  From {leave.fromDate} to {leave.toDate}
                </p>
                <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Students List */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Room</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{s.studentId}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.year}</td>
                  <td className="px-4 py-2">{s.currentRoom || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
