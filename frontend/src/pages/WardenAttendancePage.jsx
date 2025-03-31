import React, { useState } from 'react';
import { Calendar, Clock, FileText, Download, Users, CheckSquare, Search, Filter, Bell } from 'lucide-react';

const WardenAttendancePage = () => {
  // Sample data - would be fetched from API in real app
  const [studentsData, setStudentsData] = useState([
    { id: 1, name: 'John Smith', rollNumber: 'A001', room: '101', course: 'Computer Science', year: '2nd' },
    { id: 2, name: 'Emily Johnson', rollNumber: 'A002', room: '103', course: 'Electrical Engineering', year: '3rd' },
    { id: 3, name: 'Michael Williams', rollNumber: 'A003', room: '105', course: 'Mechanical Engineering', year: '1st' },
    { id: 4, name: 'Jessica Brown', rollNumber: 'A004', room: '107', course: 'Civil Engineering', year: '4th' },
    { id: 5, name: 'Daniel Jones', rollNumber: 'A005', room: '109', course: 'Computer Science', year: '2nd' },
  ]);

  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Attendance tracking state
  const [attendance, setAttendance] = useState({});

  // Initialize attendance if not set
  const initializeAttendance = () => {
    const initialAttendance = {};
    studentsData.forEach(student => {
      if (!attendance[student.id]) {
        initialAttendance[student.id] = { status: 'Present', remarks: '' };
      }
    });
    setAttendance(prev => ({ ...prev, ...initialAttendance }));
  };

  // Initialize attendance on component mount and when date changes
  React.useEffect(() => {
    initializeAttendance();
  }, [attendanceDate, studentsData]);

  // Handle attendance status change
  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  // Handle remarks change
  const handleRemarksChange = (studentId, remarks) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks }
    }));
  };

  // Submit attendance for the day
  const submitAttendance = () => {
    // This would make an API call in a real application
    console.log('Submitting attendance for', attendanceDate, ':', attendance);
    alert('Attendance submitted successfully!');
  };

  // Leave applications management
  const [leaveApplications, setLeaveApplications] = useState([
    { 
      id: 1, 
      studentName: 'John Smith', 
      rollNumber: 'A001', 
      room: '101',
      startDate: '2025-03-03', 
      endDate: '2025-03-03', 
      reason: 'Medical', 
      document: 'med_cert.pdf',
      status: 'Pending' 
    },
    { 
      id: 2, 
      studentName: 'Emily Johnson', 
      rollNumber: 'A002',
      room: '103', 
      startDate: '2025-03-15', 
      endDate: '2025-03-17', 
      reason: 'Family function', 
      document: 'invitation.pdf',
      status: 'Pending' 
    },
    { 
      id: 3, 
      studentName: 'Michael Williams', 
      rollNumber: 'A003',
      room: '105', 
      startDate: '2025-03-10', 
      endDate: '2025-03-12', 
      reason: 'Medical', 
      document: 'med_cert.pdf',
      status: 'Approved' 
    },
  ]);

  // Handle leave application approval/rejection
  const updateLeaveStatus = (id, status) => {
    setLeaveApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
  };

  // Filter students based on search and filters
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = filterCourse === '' || student.course === filterCourse;
    const matchesYear = filterYear === '' || student.year === filterYear;
    
    return matchesSearch && matchesCourse && matchesYear;
  });

  // Get unique courses and years for filters
  const courses = [...new Set(studentsData.map(student => student.course))];
  const years = [...new Set(studentsData.map(student => student.year))];

  // Statistics
  const [statistics, setStatistics] = useState({
    totalStudents: studentsData.length,
    presentToday: 42,
    absentToday: 5,
    onLeaveToday: 3,
    pendingLeaves: leaveApplications.filter(app => app.status === 'Pending').length
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Warden Portal</h2>
        </div>
        <nav className="p-2">
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 bg-blue-50 text-blue-700 rounded">
                <Calendar className="w-5 h-5 mr-2" />
                Attendance Management
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <FileText className="w-5 h-5 mr-2" />
                Leave Applications
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Users className="w-5 h-5 mr-2" />
                Student Directory
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Hostel Attendance & Leave Management</h1>
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Warden</span>
              <span className="text-gray-600">Jane Wilson</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Dashboard Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {/* Attendance Summary Cards */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                <p className="text-3xl font-bold text-blue-600">{statistics.totalStudents}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
                <p className="text-3xl font-bold text-green-600">{statistics.presentToday}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Absent Today</h3>
                <p className="text-3xl font-bold text-red-600">{statistics.absentToday}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">On Leave</h3>
                <p className="text-3xl font-bold text-yellow-600">{statistics.onLeaveToday}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Pending Leaves</h3>
                <p className="text-3xl font-bold text-orange-600">{statistics.pendingLeaves}</p>
              </div>
            </div>
          </section>

          {/* Attendance Marking Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mark Attendance</h2>
              
              <div className="flex space-x-2">
                <input 
                  type="date" 
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button 
                  className="flex items-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
                  onClick={submitAttendance}
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Submit Attendance
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or roll number"
                    className="pl-10 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <button 
                    className="w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-200"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCourse('');
                      setFilterYear('');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Students Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course & Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.room}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.course}</div>
                        <div className="text-sm text-gray-500">{student.year} Year</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={attendance[student.id]?.status || 'Present'}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Leave">On Leave</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Add remarks"
                          className="border rounded-md px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={attendance[student.id]?.remarks || ''}
                          onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Leave Applications Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Leave Applications</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaveApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                            <div className="text-sm text-gray-500">{application.rollNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.room}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {application.document ? (
                          <a href="#" className="hover:underline">View Document</a>
                        ) : (
                          <span className="text-gray-400">No document</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {application.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button 
                              className="bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200"
                              onClick={() => updateLeaveStatus(application.id, 'Approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                              onClick={() => updateLeaveStatus(application.id, 'Rejected')}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {leaveApplications.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No leave applications</td>
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

export default WardenAttendancePage;