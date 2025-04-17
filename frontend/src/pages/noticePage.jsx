// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Notice component to display individual notices
// const NoticeItem = ({ notice, userRole, onDelete }) => {
//   const formattedDate = new Date(notice.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <div className="flex justify-between items-start">
//         <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
//         {userRole === 'warden' && (
//           <button 
//             onClick={() => onDelete(notice._id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </button>
//         )}
//       </div>
//       <p className="text-gray-600 mt-2">{notice.message}</p>
//       <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
//         <span>{formattedDate}</span>
//       </div>
//     </div>
//   );
// };

// // Create Notice Form for wardens
// const CreateNoticeForm = ({ onNoticeCreated }) => {
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!title.trim() || !message.trim()) {
//       setError('Title and message are required');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
//       const response = await axios.post('http://localhost:5000/api/notices', { title, message });
      
//       if (response.data.success) {
//         setTitle('');
//         setMessage('');
//         onNoticeCreated(response.data.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create notice');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Notice</h2>
//       {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Notice Title"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
//           <textarea
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             placeholder="Notice Content"
//           ></textarea>
//         </div>
        
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Posting...' : 'Post Notice'}
//         </button>
//       </form>
//     </div>
//   );
// };

// // Main Notice Page Component
// const NoticePage = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [userRole, setUserRole] = useState(null); // In a real app, get this from auth context

//   // For demo purposes, allowing role selection
//   const [selectedRole, setSelectedRole] = useState('student');
  
//   useEffect(() => {
//     setUserRole(selectedRole);
//   }, [selectedRole]);

//   const fetchNotices = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/notices');
//       if (response.data.success) {
//         setNotices(response.data.data);
//       }
//     } catch (err) {
//       setError('Failed to fetch notices');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const handleDelete = async (noticeId) => {
//     if (window.confirm('Are you sure you want to delete this notice?')) {
//       try {
//         const response = await axios.delete(`http://localhost:5000/api/notices/${noticeId}`);
//         if (response.data.success) {
//           setNotices(notices.filter(notice => notice._id !== noticeId));
//         }
//       } catch (err) {
//         alert('Failed to delete notice');
//         console.error(err);
//       }
//     }
//   };

//   const handleNoticeCreated = (newNotice) => {
//     setNotices([newNotice, ...notices]);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Hostel Notices</h1>
        
//         {/* Role Toggle (for demo purposes) */}
//         <div className="flex items-center space-x-2">
//           <span className="text-gray-700">View as:</span>
//           <select 
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-1"
//           >
//             <option value="student">Student</option>
//             <option value="warden">Warden</option>
//           </select>
//         </div>
//       </div>

//       {userRole === 'warden' && (
//         <CreateNoticeForm onNoticeCreated={handleNoticeCreated} />
//       )}

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">
//           {notices.length > 0 ? 'All Notices' : 'No notices available'}
//         </h2>
        
//         {loading ? (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : error ? (
//           <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
//         ) : (
//           <div>
//             {notices.map((notice) => (
//               <NoticeItem 
//                 key={notice._id} 
//                 notice={notice} 
//                 userRole={userRole}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoticePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user role from localStorage
  const userRole = localStorage.getItem('role');
  const isWarden = userRole === 'warden';
  
  useEffect(() => {
    fetchNotices();
  }, []);
  
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/notices', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotices(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notices. Please try again later.');
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setError('Title and message are required');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/notices', 
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Reset form and refresh notices
      setTitle('');
      setMessage('');
      setError(null);
      fetchNotices();
    } catch (err) {
      setError('Failed to create notice. Please try again.');
      console.error('Error creating notice:', err);
    }
  };
  
  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notices/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Refresh notices after deletion
        fetchNotices();
      } catch (err) {
        setError('Failed to delete notice. Please try again.');
        console.error('Error deleting notice:', err);
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notice Board</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Only show the form for wardens */}
      {isWarden && (
        <div className="bg-white shadow-md rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Notice</h2>
          <form onSubmit={handleCreateNotice}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter notice title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Enter notice content"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Post Notice
            </button>
          </form>
        </div>
      )}
      
      {/* Notices list - shown to both wardens and students */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">All Notices</h2>
        
        {loading ? (
          <p className="text-center py-4">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No notices available</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="border rounded p-4 relative">
                <h3 className="text-lg font-medium">{notice.title}</h3>
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{notice.message}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {new Date(notice.createdAt).toLocaleString()}
                </div>
                
                {/* Delete button only for wardens */}
                {isWarden && (
                  <button
                    onClick={() => handleDeleteNotice(notice._id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    aria-label="Delete notice"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticePage;