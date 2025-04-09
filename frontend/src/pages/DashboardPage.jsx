import React, { useState,useEffect } from 'react';
import axios from "axios";
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  LogIn, Bell, Package, MessageSquare, Menu 
} from 'lucide-react';

const Dashboard = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  // State for fetched data
  const [studentUser, setStudentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from backend
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token"); // 👈 get token from localStorage
  
        const { data } = await axios.get("http://localhost:5000/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 add token to headers
          },
        });
        console.log("Fetched student:", data);

        setStudentUser(data.data);
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentData();
  }, []);
  

  

  const renderStudentDetails = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!studentUser) return <p>No student data available</p>;

    const {
      name,
      email,
      profileImage,
      roomNumber,
      block,
      semester,
      year,
      branch,
      phone,
      gender,
      bloodGroup
    } = studentUser;
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <img 
            src={profileImage} 
            alt={name} 
            className="w-24 h-24 rounded-full mr-6 object-cover border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">{semester} Semester</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Room Details</h3>
            <p className="text-lg font-bold text-blue-600">Room {roomNumber}, Block {block}</p>
          </div>
          {/* <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800 mb-2">Attendance</h3>
            <p className="text-lg font-bold text-green-600">{stats.attendance}%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">Mess Credit</h3>
            <p className="text-lg font-bold text-yellow-600">₹{stats.messCredit}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Outstanding Fees</h3>
            <p className="text-lg font-bold text-red-600">₹{stats.outstandingFees}</p>
          </div> */}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div>
            {renderStudentDetails()}
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
      default:
        return <div className="bg-white p-6 rounded-lg">Section {activeSection} content</div>;
    }
  };

  return (
    <div className="flex min-h-screen">


      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;