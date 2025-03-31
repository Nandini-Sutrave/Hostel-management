import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Clock, DollarSign, AlertCircle, Bell, Menu } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/" },
    { icon: <User />, label: "Profile", path: "/profile" },
    { icon: <Clock />, label: "Attendance", path: "/attendance" },
    { icon: <DollarSign />, label: "Fees", path: "/fees" },
    { icon: <AlertCircle />, label: "Complaints", path: "/complaints" },
    { icon: <Bell />, label: "Noticeboard", path: "/noticeboard" },
  ];

  return (
    <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className={`text-xl font-bold transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
          Hostel Hub
        </h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded">
          <Menu />
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center p-4 hover:bg-blue-50 ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"}`
            }
          >
            <span className="mr-4">{item.icon}</span>
            <span className={`transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
