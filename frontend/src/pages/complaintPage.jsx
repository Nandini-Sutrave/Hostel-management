// // StudentComplaintPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentComplaintPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [subcategory, setSubcategory] = useState('');

//   useEffect(() => {
//     fetchMyComplaints();
//   }, []);

//   const fetchMyComplaints = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token'); // Assuming you store auth token in localStorage
//       const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setComplaints(response.data.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch complaints. Please try again.');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Clear any previous error messages
//     setError(null);
    
//     if (!category || !description.trim()) {
//       setError('Please select a category and provide a description');
//       return;
//     }

//     let fullDescription = description;
//     if (subcategory) {
//       fullDescription = `[${subcategory}] ${description}`;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/complaints', 
//         { 
//           category, 
//           description: fullDescription
//         }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
      
//       // Reset form fields
//       setCategory('');
//       setDescription('');
//       setSubcategory('');
      
//       // Show success message
//       setSuccessMessage('Complaint submitted successfully!');
//       setTimeout(() => setSuccessMessage(''), 3000);
      
//       // Refresh complaints list
//       fetchMyComplaints();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to submit complaint. Please try again.');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Resolved':
//         return 'text-green-600';
//       case 'In Progress':
//         return 'text-blue-600';
//       default:
//         return 'text-yellow-600'; // Pending
//     }
//   };

//   const getSubcategoryOptions = () => {
//     switch(category) {
//       case 'Plumbing':
//         return (
//           <>
//             <option value="">-- Select Specific Issue --</option>
//             <option value="Water Supply">Water Supply Issues</option>
//             <option value="Leakage">Water Leakage</option>
//             <option value="Tap/Faucet">Tap/Faucet Problems</option>
//             <option value="Drainage">Drainage Issues</option>
//             <option value="Toilet">Toilet Problems</option>
//             <option value="Shower">Shower Problems</option>
//           </>
//         );
//       case 'Electricity':
//         return (
//           <>
//             <option value="">-- Select Specific Issue --</option>
//             <option value="Power Outage">Power Outage</option>
//             <option value="Light Fixture">Light Fixture Issues</option>
//             <option value="Fan">Fan Problems</option>
//             <option value="Socket/Switch">Socket/Switch Issues</option>
//             <option value="Appliance">Electrical Appliance Problems</option>
//           </>
//         );
//       case 'Cleaning':
//         return (
//           <>
//             <option value="">-- Select Specific Issue --</option>
//             <option value="Room Cleaning">Room Cleaning Issues</option>
//             <option value="Bathroom Cleaning">Bathroom Cleaning Issues</option>
//             <option value="Common Area">Common Area Cleaning</option>
//             <option value="Pest Control">Pest Control</option>
//           </>
//         );
//       case 'Other':
//         return (
//           <>
//             <option value="">-- Select Specific Issue --</option>
//             <option value="Furniture">Furniture Repair</option>
//             <option value="Lock/Key">Lock/Key Issues</option>
//             <option value="Window">Window Problems</option>
//             <option value="Door">Door Problems</option>
//             <option value="Internet">Internet/WiFi Issues</option>
//             <option value="Security">Security Concerns</option>
//             <option value="Noise">Noise Complaints</option>
//             <option value="Food">Food/Mess Issues</option>
//             <option value="Other">Other Issues</option>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   // Helper function to parse subcategory from description if it exists
//   const parseComplaint = (complaint) => {
//     if (!complaint.description) return { subcategory: "", description: "" };
    
//     const match = complaint.description.match(/^\[(.*?)\]\s+(.*)/);
//     if (match) {
//       return {
//         subcategory: match[1],
//         description: match[2]
//       };
//     }
//     return {
//       subcategory: "",
//       description: complaint.description
//     };
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Hostel Complaint System</h1>
      
//       {/* Complaint Form */}
//       <div className="bg-white shadow-md rounded p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4">Submit New Complaint</h2>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
        
//         {successMessage && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {successMessage}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//               Complaint Category
//             </label>
//             <select
//               id="category"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setSubcategory(''); // Reset subcategory when category changes
//               }}
//               required
//             >
//               <option value="">-- Select Category --</option>
//               <option value="Plumbing">Plumbing</option>
//               <option value="Electricity">Electricity</option>
//               <option value="Cleaning">Cleaning</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
          
//           {category && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
//                 Specific Issue
//               </label>
//               <select
//                 id="subcategory"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//               >
//                 {getSubcategoryOptions()}
//               </select>
//             </div>
//           )}
          
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Complaint Description
//             </label>
//             <textarea
//               id="description"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               rows="5"
//               placeholder="Provide detailed description of your complaint"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
          
//           <div className="flex items-center justify-end">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Submit Complaint
//             </button>
//           </div>
//         </form>
//       </div>
      
//       {/* My Complaints List */}
//       <div className="bg-white shadow-md rounded p-6">
//         <h2 className="text-xl font-semibold mb-4">My Complaints</h2>
        
//         {loading ? (
//           <p className="text-center py-4">Loading complaints...</p>
//         ) : complaints.length === 0 ? (
//           <p className="text-center py-4 text-gray-500">You haven't submitted any complaints yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 text-left">Category</th>
//                   <th className="py-3 px-6 text-left">Specific Issue</th>
//                   <th className="py-3 px-6 text-left">Description</th>
//                   <th className="py-3 px-6 text-center">Status</th>
//                   <th className="py-3 px-6 text-center">Submitted On</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-600 text-sm">
//                 {complaints.map((complaint) => {
//                   const { subcategory, description } = parseComplaint(complaint);
//                   return (
//                     <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-50">
//                       <td className="py-3 px-6 text-left font-medium">
//                         {complaint.category || "Uncategorized"}
//                       </td>
//                       <td className="py-3 px-6 text-left">
//                         {subcategory || "-"}
//                       </td>
//                       <td className="py-3 px-6 text-left">
//                         {description.length > 70
//                           ? `${description.substring(0, 70)}...`
//                           : description}
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         <span className={`font-semibold ${getStatusColor(complaint.status)}`}>
//                           {complaint.status}
//                         </span>
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         {new Date(complaint.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentComplaintPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CombinedComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [userRole, setUserRole] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('role');
    setUserRole(role);
    
    // Fetch appropriate complaints based on role
    if (role === 'student') {
      fetchMyComplaints();
    } else if (role === 'warden') {
      fetchAllComplaints();
    }
  }, []);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComplaints(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch complaints. Please try again.');
      setLoading(false);
    }
  };

  const fetchAllComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/complaints', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComplaints(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch complaints. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous error messages
    setError(null);
    
    if (!category || !description.trim()) {
      setError('Please select a category and provide a description');
      return;
    }

    let fullDescription = description;
    if (subcategory) {
      fullDescription = `[${subcategory}] ${description}`;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/complaints', 
        { 
          category, 
          description: fullDescription
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Reset form fields
      setCategory('');
      setDescription('');
      setSubcategory('');
      
      // Show success message
      setSuccessMessage('Complaint submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh complaints list
      fetchMyComplaints();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit complaint. Please try again.');
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedComplaint || !newStatus) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/complaints/${selectedComplaint._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update the complaint in the local state
      setComplaints(complaints.map(complaint => 
        complaint._id === selectedComplaint._id 
          ? { ...complaint, status: newStatus } 
          : complaint
      ));

      // Show success message
      setSuccessMessage('Complaint status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Reset selected complaint and new status
      setSelectedComplaint(null);
      setNewStatus('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update complaint status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved':
        return 'text-green-600';
      case 'In Progress':
        return 'text-blue-600';
      default:
        return 'text-yellow-600'; // Pending
    }
  };

  const getSubcategoryOptions = () => {
    switch(category) {
      case 'Plumbing':
        return (
          <>
            <option value="">-- Select Specific Issue --</option>
            <option value="Water Supply">Water Supply Issues</option>
            <option value="Leakage">Water Leakage</option>
            <option value="Tap/Faucet">Tap/Faucet Problems</option>
            <option value="Drainage">Drainage Issues</option>
            <option value="Toilet">Toilet Problems</option>
            <option value="Shower">Shower Problems</option>
          </>
        );
      case 'Electricity':
        return (
          <>
            <option value="">-- Select Specific Issue --</option>
            <option value="Power Outage">Power Outage</option>
            <option value="Light Fixture">Light Fixture Issues</option>
            <option value="Fan">Fan Problems</option>
            <option value="Socket/Switch">Socket/Switch Issues</option>
            <option value="Appliance">Electrical Appliance Problems</option>
          </>
        );
      case 'Cleaning':
        return (
          <>
            <option value="">-- Select Specific Issue --</option>
            <option value="Room Cleaning">Room Cleaning Issues</option>
            <option value="Bathroom Cleaning">Bathroom Cleaning Issues</option>
            <option value="Common Area">Common Area Cleaning</option>
            <option value="Pest Control">Pest Control</option>
          </>
        );
      case 'Other':
        return (
          <>
            <option value="">-- Select Specific Issue --</option>
            <option value="Furniture">Furniture Repair</option>
            <option value="Lock/Key">Lock/Key Issues</option>
            <option value="Window">Window Problems</option>
            <option value="Door">Door Problems</option>
            <option value="Internet">Internet/WiFi Issues</option>
            <option value="Security">Security Concerns</option>
            <option value="Noise">Noise Complaints</option>
            <option value="Food">Food/Mess Issues</option>
            <option value="Other">Other Issues</option>
          </>
        );
      default:
        return null;
    }
  };

  // Helper function to parse subcategory from description if it exists
  const parseComplaint = (complaint) => {
    if (!complaint.description) return { subcategory: "", description: "" };
    
    const match = complaint.description.match(/^\[(.*?)\]\s+(.*)/);
    if (match) {
      return {
        subcategory: match[1],
        description: match[2]
      };
    }
    return {
      subcategory: "",
      description: complaint.description
    };
  };

  // Filter complaints based on current filters
  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hostel Complaint System</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Student Form - Only show if user is a student */}
      {userRole === 'student' && (
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit New Complaint</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Complaint Category
              </label>
              <select
                id="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory(''); // Reset subcategory when category changes
                }}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electricity">Electricity</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {category && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                  Specific Issue
                </label>
                <select
                  id="subcategory"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  {getSubcategoryOptions()}
                </select>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Complaint Description
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                placeholder="Provide detailed description of your complaint"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Warden Status Update Modal */}
      {userRole === 'warden' && selectedComplaint && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Update Complaint Status</h3>
            <p className="mb-2"><span className="font-semibold">Category:</span> {selectedComplaint.category}</p>
            <p className="mb-4"><span className="font-semibold">Description:</span> {parseComplaint(selectedComplaint).description}</p>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                New Status
              </label>
              <select
                id="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!newStatus}
                className={`font-bold py-2 px-4 rounded ${newStatus ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-blue-300 text-gray-100 cursor-not-allowed'}`}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Complaints List - Different views based on role */}
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-4">
          {userRole === 'student' ? 'My Complaints' : 'All Complaints'}
        </h2>
        
        {/* Filters - Show only for warden */}
        {userRole === 'warden' && (
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Filter by Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Filter by Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electricity">Electricity</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )}
        
        {loading ? (
          <p className="text-center py-4">Loading complaints...</p>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            {userRole === 'student' 
              ? "You haven't submitted any complaints yet." 
              : "No complaints found matching the current filters."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  {userRole === 'warden' && (
                    <th className="py-3 px-6 text-left">Student</th>
                  )}
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Specific Issue</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Submitted On</th>
                  {userRole === 'warden' && (
                    <th className="py-3 px-6 text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredComplaints.map((complaint) => {
                  const { subcategory, description } = parseComplaint(complaint);
                  return (
                    <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-50">
                      {userRole === 'warden' && (
                        <td className="py-3 px-6 text-left">
                          {complaint.student?.name || 'Unknown'} 
                          {complaint.student?.rollNumber ? `(${complaint.student.rollNumber})` : ''}
                        </td>
                      )}
                      <td className="py-3 px-6 text-left font-medium">
                        {complaint.category || "Uncategorized"}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {subcategory || "-"}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {description.length > 50
                          ? `${description.substring(0, 50)}...`
                          : description}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`font-semibold ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      {userRole === 'warden' && (
                        <td className="py-3 px-6 text-center">
                          <button
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setNewStatus(complaint.status);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                          >
                            Update Status
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedComplaintPage;