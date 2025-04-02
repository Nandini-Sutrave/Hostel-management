import React, { useState,useEffect } from 'react';
import axios from "axios";
import { 
  Home, User, Clock, DollarSign, AlertCircle, 
  Bell, Menu, Edit, Save, X, Camera
} from 'lucide-react';

const Profile = () => {
  const [studentUser, setStudentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  

  // Mock student data
  // const [studentUser, setStudentUser] = useState({
  //   name: 'John Doe',
  //   email: 'john.doe@university.edu',
  //   phone: '+91 9876543210',
  //   profileImage: '/api/placeholder/200/200',
  //   roomNumber: '204',
  //   block: 'A',
  //   semester: '5th',
  //   course: 'Computer Science',
  //   admissionYear: '2022',
  //   rollNumber: 'CS2022045',
  //   address: '123 College Road, Bangalore',
  //   parentName: 'James Doe',
  //   parentPhone: '+91 9876543211',
  //   bloodGroup: 'O+',
  //   dateOfBirth: '2001-05-15',
  //   stats: {
  //     attendance: 92,
  //     outstandingFees: 5000,
  //     complaints: 1,
  //     messCredit: 2500
  //   }
  // });

  // Form state
  // const [formData, setFormData] = useState({...studentUser});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleSave = () => {
  //   setStudentUser({...formData});
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setFormData({...studentUser});
  //   setIsEditing(false);
  // };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/profile/67e8414d43e73a303472c00a'); // Replace with actual student ID
        setStudentUser(response.data);
        setFormData(response.data); // Initialize formData
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudentData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/student/${studentUser._id}`, formData);
      setStudentUser(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating student data:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  const handleCancel = () => {
    setFormData({ ...studentUser });
    setIsEditing(false);
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('profileImage', file);
  
    try {
      const response = await axios.put(`http://localhost:5000/api/student/${studentUser._id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStudentUser({ ...studentUser, profileImage: response.data.profileImage });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  if (!studentUser) return <p>Loading...</p>;

  // const menuItems = [
  //   { 
  //     icon: <Home />, 
  //     label: 'Dashboard', 
  //     section: 'dashboard',
  //     roles: ['student', 'warden'] 
  //   },
  //   { 
  //     icon: <User />, 
  //     label: 'Profile', 
  //     section: 'profile',
  //     roles: ['student', 'warden'] 
  //   },
  //   { 
  //     icon: <Clock />, 
  //     label: 'Attendance', 
  //     section: 'attendance',
  //     roles: ['student', 'warden'] 
  //   },
  //   { 
  //     icon: <DollarSign />, 
  //     label: 'Fees', 
  //     section: 'fees',
  //     roles: ['student', 'warden'] 
  //   },
  //   { 
  //     icon: <AlertCircle />, 
  //     label: 'Complaints', 
  //     section: 'complaints',
  //     roles: ['student', 'warden'] 
  //   },
  //   { 
  //     icon: <Bell />, 
  //     label: 'Noticeboard', 
  //     section: 'noticeboard',
  //     roles: ['student', 'warden'] 
  //   }
  // ];

  const renderProfileContent = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)} 
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
                src={studentUser.profileImage} 
                alt={studentUser.name} 
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                  <Camera size={20} />
                </button>
              )}
            </div>
            <h3 className="text-xl font-semibold">{studentUser.name}</h3>
            <p className="text-gray-600">{studentUser.rollNumber}</p>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                  <input
                    type="text"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
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
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-gray-800">{studentUser.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-800">{studentUser.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                  <p className="text-gray-800">{new Date(studentUser.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Blood Group</h4>
                  <p className="text-gray-800">{studentUser.bloodGroup}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-800">{studentUser.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Parent Name</h4>
                  <p className="text-gray-800">{studentUser.parentName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Parent Phone</h4>
                  <p className="text-gray-800">{studentUser.parentPhone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Academic & Hostel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Course</h4>
              <p className="text-lg font-semibold">{studentUser.course}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Semester</h4>
              <p className="text-lg font-semibold">{studentUser.semester}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Admission Year</h4>
              <p className="text-lg font-semibold">{studentUser.admissionYear}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Room Number</h4>
              <p className="text-lg font-semibold">{studentUser.roomNumber}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Block</h4>
              <p className="text-lg font-semibold">{studentUser.block}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Roll Number</h4>
              <p className="text-lg font-semibold">{studentUser.rollNumber}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      {/* <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
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
          {renderProfileContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;