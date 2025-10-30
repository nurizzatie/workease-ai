import React from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  title,
  tasks,
  onDateChange,
  onEdit, // Added
  onDelete, // Added
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Simplified header, or you can hardcode colors based on title */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold 
            ${title === "To Do" && "bg-indigo-50 text-indigo-600"}
            ${title === "In Progress" && "bg-blue-50 text-blue-600"}
            ${title === "Done" && "bg-green-50 text-green-600"}
          `}
        >
          {title}
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-4 flex-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id} // Use unique ID for key
              task={task}
              onDateChange={onDateChange}
              onEdit={onEdit} // Pass prop down
              onDelete={onDelete} // Pass prop down
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-4">No tasks yet</p>
        )}
      </div>
    </div>
  );
}

