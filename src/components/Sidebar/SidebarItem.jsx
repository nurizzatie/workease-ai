import React from "react";

export default function SidebarItem({ icon, text, active = false, alertCount, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`relative flex items-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "hover:bg-gray-50 text-gray-600"
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
      {alertCount && (
        <span className="absolute right-4 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center justify-center">
          {alertCount}
        </span>
      )}
    </li>
  );
}
