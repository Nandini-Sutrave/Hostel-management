// import React, { useState,useEffect } from 'react';
// import axios from "axios";
// import { 
//   Home, User, Clock, DollarSign, AlertCircle, 
//   Bell, Menu, Edit, Save, X, Camera
// } from 'lucide-react';

// const Profile = () => {
//   const [studentUser, setStudentUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

  

//   // Mock student data
//   // const [studentUser, setStudentUser] = useState({
//   //   name: 'John Doe',
//   //   email: 'john.doe@university.edu',
//   //   phone: '+91 9876543210',
//   //   profileImage: '/api/placeholder/200/200',
//   //   roomNumber: '204',
//   //   block: 'A',
//   //   semester: '5th',
//   //   course: 'Computer Science',
//   //   admissionYear: '2022',
//   //   rollNumber: 'CS2022045',
//   //   address: '123 College Road, Bangalore',
//   //   parentName: 'James Doe',
//   //   parentPhone: '+91 9876543211',
//   //   bloodGroup: 'O+',
//   //   dateOfBirth: '2001-05-15',
//   //   stats: {
//   //     attendance: 92,
//   //     outstandingFees: 5000,
//   //     complaints: 1,
//   //     messCredit: 2500
//   //   }
//   // });

//   // Form state
//   // const [formData, setFormData] = useState({...studentUser});

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value
//   //   });
//   // };

//   // const handleSave = () => {
//   //   setStudentUser({...formData});
//   //   setIsEditing(false);
//   // };

//   // const handleCancel = () => {
//   //   setFormData({...studentUser});
//   //   setIsEditing(false);
//   // };

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // 👈 get token from localStorage
  
//         const { data } = await axios.get("http://localhost:5000/api/students/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`, // 👈 add token to headers
//           },
//         });
//         console.log("Fetched student:", data);

//         setStudentUser(data.data);
       
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchStudentData();
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/student/${studentUser._id}`, formData);
//       setStudentUser(formData);
//       setIsEditing(false);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating student data:', error);
//       alert('Failed to update profile. Please try again.');
//     }
//   };
  
//   const handleCancel = () => {
//     setFormData({ ...studentUser });
//     setIsEditing(false);
//   };
//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
    
//     const formData = new FormData();
//     formData.append('profileImage', file);
  
//     try {
//       const response = await axios.put(`http://localhost:5000/api/student/${studentUser._id}/upload`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setStudentUser({ ...studentUser, profileImage: response.data.profileImage });
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };
  

//   if (!studentUser) return <p>Loading...</p>;

//   // const menuItems = [
//   //   { 
//   //     icon: <Home />, 
//   //     label: 'Dashboard', 
//   //     section: 'dashboard',
//   //     roles: ['student', 'warden'] 
//   //   },
//   //   { 
//   //     icon: <User />, 
//   //     label: 'Profile', 
//   //     section: 'profile',
//   //     roles: ['student', 'warden'] 
//   //   },
//   //   { 
//   //     icon: <Clock />, 
//   //     label: 'Attendance', 
//   //     section: 'attendance',
//   //     roles: ['student', 'warden'] 
//   //   },
//   //   { 
//   //     icon: <DollarSign />, 
//   //     label: 'Fees', 
//   //     section: 'fees',
//   //     roles: ['student', 'warden'] 
//   //   },
//   //   { 
//   //     icon: <AlertCircle />, 
//   //     label: 'Complaints', 
//   //     section: 'complaints',
//   //     roles: ['student', 'warden'] 
//   //   },
//   //   { 
//   //     icon: <Bell />, 
//   //     label: 'Noticeboard', 
//   //     section: 'noticeboard',
//   //     roles: ['student', 'warden'] 
//   //   }
//   // ];

//   const renderProfileContent = () => {
//     return (
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
//           {!isEditing ? (
//             <button 
//               onClick={() => setIsEditing(true)} 
//               className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               <Edit size={16} />
//               Edit Profile
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <button 
//                 onClick={handleSave} 
//                 className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//               >
//                 <Save size={16} />
//                 Save
//               </button>
//               <button 
//                 onClick={handleCancel} 
//                 className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//               >
//                 <X size={16} />
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col md:flex-row gap-8 mb-8">
//           <div className="flex flex-col items-center">
//             <div className="relative mb-4">
//               <img 
//                 src={`http://localhost:5000${studentUser?.profileImage}`} 
//                 alt={studentUser.name} 
//                 className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
//               />
//               {isEditing && (
//                 <button className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
//                   <Camera size={20} />
//                 </button>
//               )}
//             </div>
//             <h3 className="text-xl font-semibold">{studentUser.name}</h3>
//             <p className="text-gray-600">{studentUser.rollNumber}</p>
//           </div>

//           <div className="flex-1">
//             {isEditing ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Phone</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Blood Group</label>
//                   <input
//                     type="text"
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
//                   <input
//                     type="text"
//                     name="parentName"
//                     value={formData.guardianName}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Guardian Phone</label>
//                   <input
//                     type="text"
//                     name="parentPhone"
//                     value={formData.guardianPhone}
//                     onChange={handleInputChange}
//                     className="mt-1 p-2 w-full border rounded-md"
//                   />
//                 </div>
//                 <div>
//                 <input 
//   type="file" 
//   accept="image/*" 
//   onChange={handleImageChange} 
//   className="hidden" 
//   id="profileImageUpload"
// />
// <label htmlFor="profileImageUpload" className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 cursor-pointer">
//   <Camera size={20} />
  
// </label>

//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Email</h4>
//                   <p className="text-gray-800">{studentUser.email}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Phone</h4>
//                   <p className="text-gray-800">{studentUser.phone}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
//                   <p className="text-gray-800">{new Date(studentUser.dateOfBirth).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Blood Group</h4>
//                   <p className="text-gray-800">{studentUser.bloodGroup}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Address</h4>
//                   <p className="text-gray-800">{studentUser.address}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Guardian Name</h4>
//                   <p className="text-gray-800">{studentUser.guardianName}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Guardian Phone</h4>
//                   <p className="text-gray-800">{studentUser.guardianPhone}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="border-t pt-6">
//           <h3 className="text-xl font-semibold mb-4">Academic & Hostel Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-blue-700">Branch</h4>
//               <p className="text-lg font-semibold">{studentUser.branch}</p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-blue-700">Semester</h4>
//               <p className="text-lg font-semibold">{studentUser.semester}</p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-blue-700">Year</h4>
//               <p className="text-lg font-semibold">{studentUser.year}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-green-700">Room Number</h4>
//               <p className="text-lg font-semibold">{studentUser.roomNumber}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-green-700">Block</h4>
//               <p className="text-lg font-semibold">{studentUser.block}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-green-700">Roll Number</h4>
//               <p className="text-lg font-semibold">{studentUser.rollNumber}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar Navigation */}
//       {/* <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className={`text-xl font-bold transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
//             Hostel Hub
//           </h1>
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="p-2 hover:bg-gray-100 rounded"
//           >
//             <Menu />
//           </button>
//         </div>
//         <nav className="mt-4">
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveSection(item.section)}
//               className={`w-full flex items-center p-4 hover:bg-blue-50 ${
//                 activeSection === item.section 
//                   ? 'bg-blue-100 text-blue-600' 
//                   : 'text-gray-600'
//               }`}
//             >
//               <span className="mr-4">{item.icon}</span>
//               <span className={`transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </nav>
//       </div> */}

//       {/* Main Content Area */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="max-w-4xl mx-auto">
//           {renderProfileContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  Bell, Menu, Edit, Save, X, Camera
} from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token with proper format - make sure it's not including "Bearer" already
        const rawToken = localStorage.getItem("token");
        const token = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
        
        if (!token || token === "Bearer null" || token === "Bearer undefined") {
          throw new Error("Authentication token not found. Please log in again.");
        }
        
        // First, check the user role from JWT or stored role
        let role = localStorage.getItem("role");
        if (!role) {
          // If role isn't stored, you might need to fetch it or determine from token
          // For now, default to student
          role = "student";
        }
        setUserRole(role);
        
        let endpoint;
        if (role === "warden") {
          endpoint = "http://localhost:5000/api/warden/dashboard";
        } else {
          endpoint = "http://localhost:5000/api/students/profile";
        }
        
        console.log("Making request to:", endpoint);
        console.log("With auth token:", token);
        
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
        });
        
        console.log("Fetched user data:", response.data);
        
        if (role === "warden") {
          setUser(response.data.data.wardenProfile);
          setFormData({...response.data.data.wardenProfile});
        } else {
          setUser(response.data.data);
          setFormData({...response.data.data});
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response) {
          // Request was made and server responded with an error status
          console.error("Response error data:", err.response.data);
          console.error("Response error status:", err.response.status);
          
          if (err.response.status === 403) {
            setError("Not authorized to access this profile. Please check your login credentials.");
          } else {
            setError(`Server error: ${err.response.data.message || err.message}`);
          }
        } else if (err.request) {
          // Request was made but no response received
          setError("No response from server. Please check your connection.");
        } else {
          // Something happened in setting up the request
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
      
      let endpoint;
      
      if (userRole === "warden") {
        endpoint = `http://localhost:5000/api/wardens/${user._id}`;
      } else {
        endpoint = `http://localhost:5000/api/students/${user._id}`;
      }
      
      await axios.put(endpoint, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      
      setUser(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };
  
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const imageFormData = new FormData();
    imageFormData.append('profileImage', file);
  
    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
      
      let endpoint;
      
      if (userRole === "warden") {
        endpoint = `http://localhost:5000/api/wardens/${user._id}/upload`;
      } else {
        endpoint = `http://localhost:5000/api/students/${user._id}/upload`;
      }
      
      const response = await axios.put(endpoint, imageFormData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      });
      
      setUser({ ...user, profileImage: response.data.profileImage });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading profile data...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h2 className="text-lg font-semibold text-red-600 mb-3">Error Loading Profile</h2>
        <p className="text-sm text-red-700">{error}</p>
        <button 
          onClick={() => window.location.href = '/login'} 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
  
  if (!user) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
        <h2 className="text-lg font-semibold text-yellow-600 mb-3">No Profile Data</h2>
        <p className="text-sm text-yellow-700">No user profile information could be found. You may need to complete your profile setup.</p>
      </div>
    </div>
  );

  const renderWardenProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Warden Profile</h2>
          {!isEditing ? (
            <button 
              onClick={() => {
                setIsEditing(true);
                setFormData({...user});
              }} 
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Save size={16} />
                Save
              </button>
              <button 
                onClick={handleCancel} 
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "/api/placeholder/200/200"} 
                alt={user.name || "Warden profile"} 
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />
              {isEditing && (
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    id="profileImageUpload"
                  />
                  <label htmlFor="profileImageUpload" className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 cursor-pointer">
                    <Camera size={20} />
                  </label>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold">{user.name || "Warden"}</h3>
            <p className="text-gray-600">{user.employeeId || "Staff ID not set"}</p>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-gray-800">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-800">{user.phone || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Employee ID</h4>
                  <p className="text-gray-800">{user.employeeId || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Department</h4>
                  <p className="text-gray-800">{user.department || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-800">{user.address || "Not provided"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Hostel Management Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Total Students</h4>
              <p className="text-lg font-semibold">{user.stats?.totalStudents || "N/A"}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Pending Complaints</h4>
              <p className="text-lg font-semibold">{user.stats?.pendingComplaints || "N/A"}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Pending Leaves</h4>
              <p className="text-lg font-semibold">{user.stats?.pendingLeaves || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          {!isEditing ? (
            <button 
              onClick={() => {
                setIsEditing(true);
                setFormData({...user});
              }} 
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Save size={16} />
                Save
              </button>
              <button 
                onClick={handleCancel} 
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "/api/placeholder/200/200"} 
                alt={user.name || "Student profile"} 
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />
              {isEditing && (
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    id="profileImageUpload"
                  />
                  <label htmlFor="profileImageUpload" className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 cursor-pointer">
                    <Camera size={20} />
                  </label>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold">{user.name || "Student"}</h3>
            <p className="text-gray-600">{user.rollNumber || "Roll # not assigned"}</p>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth?.substring(0, 10) || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Phone</label>
                  <input
                    type="text"
                    name="guardianPhone"
                    value={formData.guardianPhone || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-gray-800">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-800">{user.phone || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                  <p className="text-gray-800">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Blood Group</h4>
                  <p className="text-gray-800">{user.bloodGroup || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-800">{user.address || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Guardian Name</h4>
                  <p className="text-gray-800">{user.guardianName || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Guardian Phone</h4>
                  <p className="text-gray-800">{user.guardianPhone || "Not provided"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Academic & Hostel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Branch</h4>
              <p className="text-lg font-semibold">{user.branch || "Not assigned"}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Semester</h4>
              <p className="text-lg font-semibold">{user.semester || "Not assigned"}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Year</h4>
              <p className="text-lg font-semibold">{user.year || "Not assigned"}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Room Number</h4>
              <p className="text-lg font-semibold">{user.roomNumber || "Not assigned"}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Block</h4>
              <p className="text-lg font-semibold">{user.block || "Not assigned"}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Roll Number</h4>
              <p className="text-lg font-semibold">{user.rollNumber || "Not assigned"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {userRole === "warden" ? renderWardenProfile() : renderStudentProfile()}
        </div>
      </div>
    </div>
  );
};

export default Profile;