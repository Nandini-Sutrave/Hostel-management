// pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Common User fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: '',
    gender: '',
    profileImage: null,
    
    // Student specific fields
    roomNumber: '',
    block: '',
    semester: '',
    year: '',
    branch: '',
    dateOfBirth: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    bloodGroup: '',
    
    // Warden specific fields
    joiningDate: '',
    department: '',
  });
  
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      
      // Create preview URL for image
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.role || !formData.phone || !formData.gender) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setError('');
      setStep(2);
    }
  };

  const validateStep2 = () => {
    if (formData.role === 'student') {
      if (!formData.roomNumber || !formData.block || !formData.semester) {
        setError('Please fill in all required fields');
        return false;
      }
    } else if (formData.role === 'warden') {
      if (!formData.department) {
        setError('Please fill in all required fields');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    try {
      const data = new FormData();

for (const key in formData) {
  // Skip student-only fields if role is warden
  if (key === 'confirmPassword') continue;
  if (
    formData.role === 'warden' &&
    [
      'roomNumber',
      'block',
      'semester',
      'year',
      'branch',
      'dateOfBirth',
      'address',
      'guardianName',
      'guardianPhone',
      'bloodGroup'
    ].includes(key)
  ) {
    continue;
  }

  // Skip warden-only fields if role is student
  if (
    formData.role === 'student' &&
    ['joiningDate', 'department'].includes(key)
  ) {
    continue;
  }

  if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
    data.append(key, formData[key]);
  }
}

      for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      

      const response = await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      toast.error(msg);
    }
  };

  // Progress indicator calculation
  const progressPercentage = step === 1 ? 50 : 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-blue-100">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">HMS</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2">Hostel Management System</h2>
        <h3 className="text-lg font-medium text-center text-gray-600 mb-6">Create New Account</h3>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Step indicator */}
        <div className="flex justify-between mb-6 text-sm font-medium">
          <div className={`flex items-center ${step === 1 ? 'text-blue-600' : 'text-blue-400'}`}>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
              1
            </div>
            Basic Info
          </div>
          <div className={`flex items-center ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            {formData.role === 'student' ? 'Student Details' : 'Warden Details'}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {step === 1 ? (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Role <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    id="student"
                    name="role"
                    type="radio"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="student" className="ml-2 block text-gray-700">
                    Student
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="warden"
                    name="role"
                    type="radio"
                    value="warden"
                    checked={formData.role === 'warden'}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="warden" className="ml-2 block text-gray-700">
                    Warden
                  </label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="profileImage">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <input
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-blue-200 rounded-lg py-2 px-3"
                    id="profileImage"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                {previewImage && (
                  <div className="flex-shrink-0">
                    <img 
                      src={previewImage} 
                      alt="Profile Preview" 
                      className="h-16 w-16 object-cover rounded-full border-2 border-blue-300"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all w-full flex items-center justify-center"
              >
                <span>Next Step</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.role === 'student' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="roomNumber">
                      Room Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="roomNumber"
                      type="text"
                      name="roomNumber"
                      placeholder="Enter room number"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="block">
                      Block <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="block"
                      type="text"
                      name="block"
                      placeholder="Enter block"
                      value={formData.block}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div >
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="semester">
                      Semester <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="semester"
                      type="text"
                      name="semester"
                      placeholder="Enter semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                 
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="year">
                      Year
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="year"
                      type="number"
                      name="year"
                      placeholder="Enter year"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="branch">
                      Branch
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="branch"
                      type="text"
                      name="branch"
                      placeholder="Enter branch"
                      value={formData.branch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dateOfBirth">
                      Date of Birth
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bloodGroup">
                      Blood Group
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="bloodGroup"
                      type="text"
                      name="bloodGroup"
                      placeholder="Enter blood group"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guardianName">
                      Guardian Name
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="guardianName"
                      type="text"
                      name="guardianName"
                      placeholder="Enter guardian's name"
                      value={formData.guardianName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guardianPhone">
                      Guardian Phone Number
                    </label>
                    <input
                      className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      id="guardianPhone"
                      type="tel"
                      name="guardianPhone"
                      placeholder="Enter guardian's phone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="department">
                    Department <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    id="department"
                    type="text"
                    name="department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="joiningDate">
                    Joining Date
                  </label>
                  <input
                    className="shadow-sm border border-blue-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    id="joiningDate"
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            <div className="flex items-center justify-between space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-300 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all w-1/2 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all w-1/2 flex items-center justify-center"
              >
                <span>Register</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-6 pt-4 border-t border-blue-100">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;