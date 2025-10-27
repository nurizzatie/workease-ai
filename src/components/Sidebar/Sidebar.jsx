import React, { useState } from "react";
import { LayoutGrid, Inbox, CheckSquare, Settings, KanbanSquare } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { icon: <LayoutGrid size={20} />, text: "Dashboard" },
    { icon: <Inbox size={20} />, text: "Inbox", alertCount: 2 },
    { icon: <CheckSquare size={20} />, text: "Task" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];

  return (
    <aside className="fixed h-screen w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo + User Info */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <KanbanSquare size={24} />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-gray-800">WorkEase</h1>
            <p className="text-xs text-gray-500">johndoe@worke.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <SidebarItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              active={item.text === activeItem}
              alertCount={item.alertCount}
              onClick={() => setActiveItem(item.text)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
