import React, { useState,UseEffect } from 'react';
//import axios from "axios";
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  LogIn, Bell, Package, MessageSquare, Menu 
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock student data
  const studentUser = {
    name: 'John Doe',
    profileImage: '/api/placeholder/200/200',
    roomNumber: '204',
    block: 'A',
    semester: '5th',
    course: 'Computer Science',
    stats: {
      attendance: 92,
      outstandingFees: 5000,
      complaints: 1,
      messCredit: 2500
    }
  };

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

  const renderStudentDetails = () => {
    const { name, profileImage, roomNumber, block, semester, course, stats } = studentUser;
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
            <p className="text-gray-600">{course} - {semester} Semester</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Room Details</h3>
            <p className="text-lg font-bold text-blue-600">Room {roomNumber}, Block {block}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
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
          </div>
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
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar Navigation
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
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