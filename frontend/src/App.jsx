import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import StudentFeesPage from "./pages/StudentFeesPage";
import CombinedComplaintPage from "./pages/complaintPage";
import NoticePage from "./pages/noticePage";
import WardenDashboard from "./pages/WardenDashboard";
import WardenAttendance from "./pages/WardenAttendance";
import Sidebar from "./pages/Sidebar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout wrapping all authenticated pages
const AppLayout = () => (
  <div className="flex min-h-screen">
    {/* Sidebar fixed */}
    <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg z-50">
      <Sidebar />
    </div>

    {/* Main content with left margin */}
    <div
      className="flex-1 ml-64 p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('bg7.jpg')" }} // or your actual image path
    >
      <Outlet />
    </div>
  </div>
);

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");
  
  useEffect(() => {
    // Get user role from localStorage or decode from JWT token
    const role = localStorage.getItem("role") || "student"; // Default to student if not set
    setUserRole(role);
  }, []);

  // If user data is still loading, show a loading indicator
  if (isAuthenticated && userRole === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            {/* Dynamic Dashboard based on user role */}
            <Route path="/dashboard" element={<DashboardPage/>} />
            
            <Route path="/profile" element={<Profile />} />
            
            
            
                <Route path="/attendance" element={<WardenAttendance />} />
              
            
          
                <Route path="/fees" element={<StudentFeesPage />} />
             
            
            
            {/* Common routes for both roles */}
            <Route path="/complaints" element={<CombinedComplaintPage />} />
            <Route path="/noticeboard" element={<NoticePage />} />
            
            {/* Default route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch any other paths and redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <>
            {/* If not logged in, redirect everything to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;