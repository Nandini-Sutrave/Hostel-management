import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { Home, User, Clock, DollarSign, AlertCircle, Bell, Menu, LogOut } from "lucide-react"; // ✅ Added LogOut

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/" },
    { icon: <User />, label: "Profile", path: "/profile" },
    { icon: <Clock />, label: "Attendance", path: "/attendance" },
    { icon: <DollarSign />, label: "Fees", path: "/fees" },
    { icon: <AlertCircle />, label: "Complaints", path: "/complaints" },
    { icon: <Bell />, label: "Noticeboard", path: "/noticeboard" },
  ];

  return (
    <div className={`h-screen bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-20"}`}>
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold transition-all ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
            Hostel Hub
          </h1>
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded">
            <Menu />
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center p-4 hover:bg-blue-50 transition-all duration-300 ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"}`
              }
            >
              <span className="mr-4">{item.icon}</span>
              <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-red-600 hover:bg-red-50 transition-all duration-300 p-2 rounded"
        >
          <LogOut className="mr-4" />
          <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
