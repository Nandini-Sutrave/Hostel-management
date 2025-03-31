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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import StudentFeesPage from "./pages/StudentFeesPage";
//import Complaints from "./pages/Complaints";
//import Noticeboard from "./pages/Noticeboard";
import Sidebar from "./pages/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<StudentAttendancePage />} />
            <Route path="/fees" element={<StudentFeesPage />} />
            {/* <Route path="/complaints" element={<Complaints />} />
            <Route path="/noticeboard" element={<Noticeboard />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
