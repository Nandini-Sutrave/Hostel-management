import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-20 md:ml-64 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;