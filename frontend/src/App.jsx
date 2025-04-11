// //import { useState } from 'react'
// import React from "react";
// import Dashboard from "./pages/DashboardPage";
// import Profile from "./pages/Profile";
// import './App.css'
// import StudentAttendancePage from "./pages/StudentAttendancePage";
// import WardenAttendancePage from "./pages/WardenAttendancePage";
// import StudentFeesPage from "./pages/StudentFeesPage";
// import RoomAllocationApp from "./pages/RoomAllocationApp";
// // import WardenDashboard from "./pages/WardenDashboard";



// function App() {
  
//   return (
//     <div className="App">
//       {/* <Dashboard /> */}
//       {/* <Profile/> */}
//       {/* <WardenDashboard /> */}
//       <StudentAttendancePage/>
//       {/* <WardenAttendancePage/> */}
//       {/* <StudentFeesPage/> */}
//       {/* <RoomAllocationApp/> */}
      
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import StudentFeesPage from "./pages/StudentFeesPage";
// import Complaints from "./pages/Complaints";
// import Noticeboard from "./pages/Noticeboard";
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
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<WardenDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<WardenAttendance />} />
            <Route path="/fees" element={<StudentFeesPage />} />
            {/* <Route path="/complaints" element={<Complaints />} />
            <Route path="/noticeboard" element={<Noticeboard />} /> */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
