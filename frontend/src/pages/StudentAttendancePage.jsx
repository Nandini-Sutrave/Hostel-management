import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaCalendarTimes, FaCalendarWeek } from 'react-icons/fa';

const StudentAttendancePage = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'Medical'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/student/attendance');
      setAttendanceData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(leaveForm.startDate) > new Date(leaveForm.endDate)) {
      setSubmitMessage({
        type: 'error',
        text: 'End date cannot be before start date'
      });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      await axios.post('/api/student/leaves', leaveForm);
      setSubmitMessage({
        type: 'success',
        text: 'Leave application submitted successfully'
      });
      
      // Reset form
      setLeaveForm({
        startDate: '',
        endDate: '',
        reason: '',
        type: 'Medical'
      });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to submit leave application'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAttendanceStats = () => {
    if (!attendanceData || attendanceData.length === 0) return { present: 0, absent: 0, leave: 0, percentage: 0 };

    const present = attendanceData.filter(record => record.status === 'Present').length;
    const absent = attendanceData.filter(record => record.status === 'Absent').length;
    const leave = attendanceData.filter(record => record.status === 'Leave').length;
    const total = present + absent + leave;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, leave, percentage };
  };

  const stats = calculateAttendanceStats();
  
  // Get current month's attendance
  const getCurrentMonthAttendance = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <h1 className="text-2xl font-bold">Student Portal</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">Attendance Management</h2>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`pb-4 font-medium ${
                activeTab === 'attendance'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              View Attendance
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`pb-4 font-medium ${
                activeTab === 'apply'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Apply for Leave
            </button>
          </div>
        </div>

        {/* Attendance View Tab */}
        {activeTab === 'attendance' && (
          <div>
            {/* Attendance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FaCalendarCheck className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold">{stats.percentage}%</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FaCalendarCheck className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Present Days</p>
                    <h3 className="text-2xl font-bold">{stats.present}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                    <FaCalendarTimes className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Absent Days</p>
                    <h3 className="text-2xl font-bold">{stats.absent}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                    <FaCalendarWeek className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Leave Days</p>
                    <h3 className="text-2xl font-bold">{stats.leave}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Month Attendance */}
            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium">Current Month Attendance</h3>
              </div>

              {loading ? (
                <div className="p-6 text-center">Loading attendance data...</div>
              ) : getCurrentMonthAttendance().length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getCurrentMonthAttendance().map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.status === 'Present'
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'Absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">No attendance records for the current month</div>
              )}
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium">Attendance History</h3>
              </div>

              {loading ? (
                <div className="p-6 text-center">Loading attendance data...</div>
              ) : attendanceData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {attendanceData.map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.status === 'Present'
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'Absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">No attendance records found</div>
              )}
            </div>
          </div>
        )}

        {/* Apply for Leave Tab */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-6">Apply for Leave</h3>
            
            {submitMessage && (
              <div className={`p-4 mb-6 rounded-md ${
                submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleLeaveSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type
                  </label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  >
                    <option value="Medical">Medical Leave</option>
                    <option value="Family">Family Emergency</option>
                    <option value="Personal">Personal Leave</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave
                  </label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Please provide details about your leave request"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
            
            <div className="mt-8 border-t pt-6">
              <h4 className="text-md font-medium mb-4">Leave Application Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Applications must be submitted at least 2 days before the leave date (except for emergencies)</li>
                <li>Medical leaves require supporting documents to be submitted upon return</li>
                <li>Students with attendance below 75% may have their leave requests scrutinized more carefully</li>
                <li>Leave during examination periods is generally not approved except in emergency situations</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendancePage;