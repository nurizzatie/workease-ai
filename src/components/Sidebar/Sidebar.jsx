import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Inbox, CheckSquare, Settings, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import logo from "../../assets/workease-logo.png";
import { getAuth, signOut } from "firebase/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { icon: <LayoutGrid size={20} />, text: "Dashboard", path: "/manager" },
    { icon: <Inbox size={20} />, text: "Inbox", path: "/inbox", alertCount: 2 },
    { icon: <CheckSquare size={20} />, text: "Task", path: "/task" },
    { icon: <Settings size={20} />, text: "Settings", path: "/settings" },
  ];

  return (
    <aside className="fixed h-screen w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col justify-between">
      {/* Logo + User Info */}
      <div>
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="WorkEase AI Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="font-semibold text-lg text-gray-800">
                WorkEase{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-purple-400">
                  AI
                </span>
              </h1>
              <p className="text-xs text-gray-500">johndoe@works.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path; 
              return (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  active={isActive} 
                  alertCount={item.alertCount}
                  onClick={() => navigate(item.path)}
                />
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
