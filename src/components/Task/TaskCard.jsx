import React, { useState } from "react";
import { Calendar, Pencil, Trash2 } from "lucide-react"; // Updated imports

// Helper object to get colors based on project name
const projectColors = {
  "Project Alpha": "bg-indigo-100 text-indigo-700",
  "Project Beta": "bg-amber-100 text-amber-700",
  "Project Gamma": "bg-green-100 text-green-700",
  default: "bg-gray-100 text-gray-700",
};

export default function TaskCard({ task, onDateChange, onEdit, onDelete }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (e) => {
    onDateChange?.(task, e.target.value);
    setShowDatePicker(false);
  };

  const colorClass = projectColors[task.project] || projectColors.default;

  return (
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition relative"> {/* Added relative for positioning */}
      {/* ✨ Edit Button - Top Right */}
      <button
        onClick={() => onEdit?.(task)}
        className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-blue-500 transition opacity-0 group-hover:opacity-100 focus:opacity-100" // Smaller, top-right, hover-visible
        title="Edit Task"
      >
        <Pencil className="w-4 h-4" /> {/* Smaller icon size */}
      </button>

      {/* Title */}
      <h3 className="font-medium text-gray-800 pr-8">{task.title}</h3> {/* Added pr-8 to prevent title overlapping the icon */}

      {/* Project Tag */}
      <span
        className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded ${colorClass}`}
      >
        {task.project}
      </span>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 mt-3 space-x-2">
        <Calendar className="w-4 h-4" />
        <span>{task.date}</span>
      </div>

      {/* Members */}
      <div className="flex items-center space-x-2 mt-3">
        {task.members.map((m) => (
          <div
            key={m} // Use member initial as key (assuming unique)
            className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold"
          >
            {m}
          </div>
        ))}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end items-center mt-4 text-gray-400 space-x-3">
        {/* 📅 Change Date */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="p-1 rounded-full hover:text-indigo-500 transition"
            title="Change Date"
          >
            <Calendar className="w-5 h-5" />
          </button>
          {showDatePicker && (
            <input
              type="date"
              value={task.date} // Set current date
              onChange={handleDateChange}
              className="absolute top-8 right-0 z-10 border border-gray-300 rounded-lg p-1 text-xs bg-white shadow-sm"
            />
          )}
        </div>

        {/* Delete Button - Moved to bottom actions */}
        <button
          onClick={() => onDelete?.(task)}
          className="p-1 rounded-full hover:text-red-500 transition"
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

