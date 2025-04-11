import { useState, useEffect } from 'react';

export default function WardenAttendancePage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [summary, setSummary] = useState({ present: 0, absent: 0, leave: 0 });
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Format current date for header display
  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Fetch students data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // This would be replaced with actual API call
        // const response = await fetch('/api/students');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockStudents = [
          { id: 'CS101', name: 'Akash Mehta', roomNumber: 'A-101', status: null },
          { id: 'CS102', name: 'Priya Shah', roomNumber: 'A-102', status: null },
          { id: 'CS103', name: 'Riya Verma', roomNumber: 'A-103', status: null },
          { id: 'CS104', name: 'Rahul Kumar', roomNumber: 'A-101', status: null },
          { id: 'CS105', name: 'Sneha Gupta', roomNumber: 'A-104', status: null },
          { id: 'CS106', name: 'Vijay Singh', roomNumber: 'A-102', status: null },
          { id: 'CS107', name: 'Neha Sharma', roomNumber: 'A-103', status: null },
          { id: 'CS108', name: 'Karan Patel', roomNumber: 'A-105', status: null },
          { id: 'CS109', name: 'Ananya Desai', roomNumber: 'A-104', status: null },
          { id: 'CS110', name: 'Raj Malhotra', roomNumber: 'A-106', status: null },
        ];
        
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        
        // Extract unique room numbers for filter dropdown
        const uniqueRooms = [...new Set(mockStudents.map(student => student.roomNumber))];
        setRooms(uniqueRooms);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search query and room filter
  useEffect(() => {
    let result = students;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.id.toLowerCase().includes(query)
      );
    }
    
    // Apply room filter
    if (roomFilter) {
      result = result.filter(student => student.roomNumber === roomFilter);
    }
    
    setFilteredStudents(result);
  }, [searchQuery, roomFilter, students]);

  // Update summary whenever student statuses change
  useEffect(() => {
    const newSummary = filteredStudents.reduce(
      (acc, student) => {
        if (student.status === 'present') acc.present += 1;
        else if (student.status === 'absent') acc.absent += 1;
        else if (student.status === 'leave') acc.leave += 1;
        return acc;
      },
      { present: 0, absent: 0, leave: 0 }
    );
    
    setSummary(newSummary);
  }, [filteredStudents]);

  // Handle marking attendance for a student
  const markAttendance = async (studentId, status) => {
    try {
      // Update local state
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return { ...student, status };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      // This would be replaced with actual API call
      // await fetch('/api/attendance/mark', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ studentId, date: currentDate, status }),
      // });
      
      // Show success notification
      setNotificationMessage(`Marked ${status} for ${studentId}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  // Handle submitting all attendance data
  const submitAllAttendance = async () => {
    try {
      // Filter out students with no status set
      const attendanceData = students
        .filter(student => student.status !== null)
        .map(student => ({
          studentId: student.id,
          date: currentDate,
          status: student.status
        }));
      
      if (attendanceData.length === 0) {
        setNotificationMessage('No attendance marked to submit');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
        return;
      }
      
      // This would be replaced with actual API call
      // await fetch('/api/attendance/submit-batch', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ attendanceRecords: attendanceData }),
      // });
      
      // Show success notification
      setNotificationMessage('All attendance submitted successfully');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setNotificationMessage('Failed to submit attendance');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Bar */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Warden Panel - Attendance Management</h1>
          <div className="flex items-center">
            <span className="hidden md:inline mr-2">Date:</span>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="bg-blue-700 text-white px-3 py-1 rounded border border-blue-400"
            />
          </div>
        </div>
      </header>
      
      {/* Search & Filter Toolbar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search by Name or Roll Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="md:w-64">
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Rooms</option>
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-6 right-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50">
            {notificationMessage}
          </div>
        )}
        
        {/* Tabular View */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.roomNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => markAttendance(student.id, 'present')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              student.status === 'present'
                                ? 'bg-green-500 text-white'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, 'absent')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              student.status === 'absent'
                                ? 'bg-red-500 text-white'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, 'leave')}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              student.status === 'leave'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Mobile Card View - Only shows on small screens */}
        <div className="md:hidden space-y-4">
          {filteredStudents.map((student) => (
            <div key={`mobile-${student.id}`} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-500">
                    Roll No: {student.id} | Room: {student.roomNumber}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-3 gap-2">
                <button
                  onClick={() => markAttendance(student.id, 'present')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${
                    student.status === 'present'
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => markAttendance(student.id, 'absent')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${
                    student.status === 'absent'
                      ? 'bg-red-500 text-white'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  Absent
                </button>
                <button
                  onClick={() => markAttendance(student.id, 'leave')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${
                    student.status === 'leave'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  Leave
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fixed Bottom Bar with Summary */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-md">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Present: {summary.present}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span className="text-sm">Absent: {summary.absent}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-sm">Leave: {summary.leave}</span>
            </div>
          </div>
          <button
            onClick={submitAllAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            SUBMIT ATTENDANCE
          </button>
        </div>
      </div>
    </div>
  );
}