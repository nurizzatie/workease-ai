import React, { useState, useEffect } from "react";

export default function AssignModal({
  open,
  onClose,
  onSave,
  task,
  existingProjects = [],
}) {
  // Check if we are in "Create" mode
  const isCreateMode = !task;

  // State for all fields
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");
  const [members, setMembers] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  // This effect resets the form when opening/closing or switching modes
  useEffect(() => {
    if (open) {
      if (isCreateMode) {
        // Reset fields for "Create" mode
        setTitle("");
        setProject("");
        setDate("");
        setMembers([]);
      } else {
        // Populate ALL fields for "Edit" mode
        setTitle(task.title || "");
        setProject(task.project || "");
        setDate(task.date || "");
        setMembers(task.members || []);
      }
    }
  }, [open, task, isCreateMode]);

  if (!open) return null;

  const handleSave = () => {
    // Pass all data back for BOTH modes
    onSave({ title, project, date, members });
  };

  // Helper to convert string back to array
  const handleMemberChange = (e) => {
    setMembers(e.target.value.split(",").map((m) => m.trim().toUpperCase()));
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {isCreateMode ? "Assign New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* These fields show in BOTH modes now, just populated in Edit mode */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design new landing page"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-600">
              Project
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder="Type or select a project"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg max-h-40 overflow-y-auto shadow-lg">
                {existingProjects.length > 0 ? (
                  existingProjects
                    .filter((p) =>
                      p.toLowerCase().includes(project.toLowerCase())
                    )
                    .map((p) => (
                      <div
                        key={p}
                        className="p-2 hover:bg-indigo-50 cursor-pointer text-sm"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setProject(p);
                          setShowSuggestions(false);
                        }}
                      >
                        {p}
                      </div>
                    ))
                ) : (
                  <div className="p-2 text-gray-500 text-sm">
                    No recent projects found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.T_VARIABLE)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Team Members (initials)
            </label>
            <input
              type="text"
              value={members.join(", ")}
              onChange={handleMemberChange}
              placeholder="e.g. DW, ST, AR"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isCreateMode ? "Assign Task" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

