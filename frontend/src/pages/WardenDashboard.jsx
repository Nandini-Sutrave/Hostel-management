import React, { useState } from 'react';
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  Bell, Menu, Users, Tool, FileText, CheckSquare,
  BarChart2, Settings
} from 'lucide-react';

const WardenDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock warden data
  const wardenUser = {
    name: 'Dr. Robert Wilson',
    profileImage: '/api/placeholder/200/200',
    position: 'Chief Warden',
    department: 'Computer Science',
    blocks: ['A', 'B'],
    stats: {
      totalStudents: 450,
      pendingComplaints: 8,
      maintenanceRequests: 12,
      vacantRooms: 25
    }
  };

  const menuItems = [
    { 
      icon: <Home />, 
      label: 'Dashboard', 
      section: 'dashboard',
      roles: ['warden'] 
    },
    { 
      icon: <Users />, 
      label: 'Students', 
      section: 'students',
      roles: ['warden'] 
    },
    { 
      icon: <CheckSquare />, 
      label: 'Attendance', 
      section: 'attendance',
      roles: ['warden'] 
    },
    { 
      icon: <DollarSign />, 
      label: 'Fees', 
      section: 'fees',
      roles: ['warden'] 
    },
    { 
      icon: <AlertCircle />, 
      label: 'Complaints', 
      section: 'complaints',
      roles: ['warden'] 
    },
    { 
      icon: <Tool />, 
      label: 'Maintenance', 
      section: 'maintenance',
      roles: ['warden'] 
    },
    { 
      icon: <Bell />, 
      label: 'Notices', 
      section: 'notices',
      roles: ['warden'] 
    },
    { 
      icon: <Settings />, 
      label: 'Settings', 
      section: 'settings',
      roles: ['warden']
    }
  ];

  const renderWardenDetails = () => {
    const { name, profileImage, position, department, blocks, stats } = wardenUser;
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
            <p className="text-gray-600">{position} - {department} Department</p>
            <p className="text-gray-500">Managing Blocks: {blocks.join(', ')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Total Students</h3>
            <p className="text-lg font-bold text-blue-600">{stats.totalStudents}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-800 mb-2">Vacant Rooms</h3>
            <p className="text-lg font-bold text-green-600">{stats.vacantRooms}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">Maintenance Requests</h3>
            <p className="text-lg font-bold text-yellow-600">{stats.maintenanceRequests}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Pending Complaints</h3>
            <p className="text-lg font-bold text-red-600">{stats.pendingComplaints}</p>
          </div>
        </div>
      </div>
    );
  };

  // Mock data for recent activity
  const recentStudentActivity = [
    { id: 1, student: "Amit Kumar", room: "A-204", activity: "Complaint Filed", time: "2 hours ago" },
    { id: 2, student: "Sara Singh", room: "B-112", activity: "Fee Payment", time: "5 hours ago" },
    { id: 3, student: "Raj Patel", room: "A-307", activity: "Leave Application", time: "Yesterday" },
    { id: 4, student: "Priya Sharma", room: "B-119", activity: "Room Change Request", time: "Yesterday" }
  ];

  // Mock data for pending complaints
  const pendingComplaints = [
    { id: "C001", student: "Amit Kumar", room: "A-204", issue: "Water leakage", priority: "High", date: "2025-03-28" },
    { id: "C002", student: "Meera Desai", room: "B-112", issue: "Electrical fault", priority: "Medium", date: "2025-03-27" },
    { id: "C003", student: "Vikram Reddy", room: "A-118", issue: "Furniture damage", priority: "Low", date: "2025-03-25" }
  ];

  // Mock data for notices
  const recentNotices = [
    { id: "N001", title: "Maintenance Schedule", date: "2025-03-29" },
    { id: "N002", title: "Fee Payment Deadline", date: "2025-03-27" },
    { id: "N003", title: "Hostel Day Celebration", date: "2025-03-25" }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div>
            {renderWardenDetails()}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  Pending Complaints
                </h3>
                <div className="space-y-3">
                  {pendingComplaints.map(complaint => (
                    <div key={complaint.id} className="border-b pb-2">
                      <div className="flex justify-between">
                        <p className="font-medium">{complaint.student}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Room {complaint.room} - {complaint.issue}</p>
                      <p className="text-xs text-gray-500">{complaint.date}</p>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium hover:underline">
                    View All Complaints
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentStudentActivity.map(activity => (
                    <div key={activity.id} className="border-b pb-2">
                      <p className="font-medium">{activity.student}</p>
                      <p className="text-sm text-gray-600">
                        Room {activity.room} - {activity.activity}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium hover:underline">
                    View All Activity
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-yellow-500" />
                  Recent Notices
                </h3>
                <div className="space-y-3">
                  {recentNotices.map(notice => (
                    <div key={notice.id} className="border-b pb-2">
                      <p className="font-medium">{notice.title}</p>
                      <p className="text-xs text-gray-500">Posted on {notice.date}</p>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium hover:underline">
                    Post New Notice
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg flex items-center justify-center">
                    <Users className="mr-2 h-5 w-5" />
                    <span>View Students</span>
                  </button>
                  <button className="bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg flex items-center justify-center">
                    <CheckSquare className="mr-2 h-5 w-5" />
                    <span>Take Attendance</span>
                  </button>
                  <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-lg flex items-center justify-center">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Generate Report</span>
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg flex items-center justify-center">
                    <Tool className="mr-2 h-5 w-5" />
                    <span>Maintenance</span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold mb-3">Block Occupancy</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Block A (92%)</span>
                      <span className="text-sm text-gray-500">138/150</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "92%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Block B (85%)</span>
                      <span className="text-sm text-gray-500">153/180</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "85%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Total (88%)</span>
                      <span className="text-sm text-gray-500">291/330</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "88%"}}></div>
                    </div>
                  </div>
                </div>
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
      {/* Sidebar Navigation */}
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;