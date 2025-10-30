import React, { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TaskColumn from "../components/Task/TaskColumn";
import ProgressOverview from "../components/Task/ProgressOverview";
import AssignModal from "../components/Task/AssignModal";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";

// Dummy data
const initialTasks = {
  todo: [
    {
      id: "t1",
      title: "Design System Documentation",
      project: "Project Alpha",
      date: "Oct 15, 2025",
      members: ["DW", "ST"],
      status: "todo",
    },
    {
      id: "t2",
      title: "Database Schema Review",
      project: "Project Beta",
      date: "Oct 18, 2025",
      members: ["DW", "AR"],
      status: "todo",
    },
  ],
  inProgress: [
    {
      id: "t3",
      title: "User Research Analysis",
      project: "Project Beta",
      date: "Oct 12, 2025",
      members: ["DW", "PN"],
      status: "inProgress",
    },
    {
      id: "t4",
      title: "Mobile App Prototyping",
      project: "Project Alpha",
      date: "Oct 20, 2025",
      members: ["DW", "JT"],
      status: "inProgress",
    },
  ],
  done: [
    {
      id: "t5",
      title: "Landing Page Wireframes",
      project: "Project Gamma",
      date: "Oct 8, 2025",
      members: ["DW", "ST"],
      status: "done",
    },
  ],
};

// --- MOVED project constants here ---
// Now they can be accessed by the whole component
const projects = ["Project Alpha", "Project Beta", "Project Gamma"];
const projectColors = {
  "Project Alpha": "bg-indigo-500",
  "Project Beta": "bg-amber-500",
  "Project Gamma": "bg-green-500",
};
// ---

export default function ManagerTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressData = useMemo(() => {
    const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.done];

    return projects.map((project) => {
      const tasksForProject = allTasks.filter((t) => t.project === project);
      const doneTasks = tasksForProject.filter((t) => t.status === "done");

      const total = tasksForProject.length;
      const doneCount = doneTasks.length;

      // Calculate percentage, handling division by zero
      const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

      return {
        project: project,
        percent: percent,
        color: projectColors[project] || "bg-gray-500",
      };
    });
  }, [tasks]);

  const handleDateChange = (task, newDate) => {
    const columnKey = task.status; // e.g., "todo"

    setTasks((prev) => {
      const updatedColumn = prev[columnKey].map((t) =>
        t.id === task.id ? { ...t, date: newDate } : t
      );

      return {
        ...prev,
        [columnKey]: updatedColumn, // Only update the one column
      };
    });
    toast.success("📅 Deadline updated!");
  };

  // --- Open modal for editing ---
  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // --- New Delete Task Handler ---
  const handleDeleteTask = (task) => {
    // We could add a confirmation modal here, but for simplicity, we'll delete directly
    const columnKey = task.status;
    setTasks((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].filter((t) => t.id !== task.id),
    }));
    toast.success("🗑️ Task deleted");
  };

  // --- This function now handles Create AND Edit ---
  const handleSaveModal = (data) => {
    // Check if we are in "create" mode (no task was selected)
    if (!selectedTask) {
      // This is a NEW TASK
      const { title, project, date, members } = data;

      if (!title || !project || !date || !members.length) {
        toast.error("Please fill out all fields to assign a new task.");
        return;
      }

      // If it's a new project, add it to our list (for the dropdown)
      if (!projects.includes(project)) {
        projects.push(project);
      }

      const newTask = {
        id: crypto.randomUUID(), // Create a unique ID
        title,
        project,
        date,
        members,
        status: "todo", // New tasks always go to "To Do"
      };

      // Add the new task to the 'todo' list
      setTasks((prev) => ({
        ...prev,
        todo: [newTask, ...prev.todo],
      }));

      toast.success("✅ Task assigned successfully!");
    } else {
      // --- This is an EXISTING TASK (Edit Mode) ---
      const { title, project, date, members } = data;
      const columnKey = selectedTask.status; // Get status from the task saved in state

      setTasks((prev) => {
        const updatedColumn = prev[columnKey].map((t) =>
          t.id === selectedTask.id
            ? { ...t, title, project, date, members } // Update all fields
            : t
        );
        return {
          ...prev,
          [columnKey]: updatedColumn,
        };
      });
      toast.success("✅ Task updated successfully!");
    }

    // Close modal and reset state
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  // ---

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-6">
        {/* Header */}
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Team Tasks</h1>
            <p className="text-gray-500">
              Assign, track, and manage tasks without intrusive monitoring.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedTask(null); // Make sure we're in "create" mode
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Assign Task
          </button>
        </header>

        {/* Board */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To Do"
              tasks={tasks.todo}
              onDateChange={handleDateChange}
              onEdit={handleOpenEditModal} // Pass new prop
              onDelete={handleDeleteTask} // Pass new prop
            />

            <TaskColumn
              title="In Progress"
              tasks={tasks.inProgress}
              onDateChange={handleDateChange}
              onEdit={handleOpenEditModal} // Pass new prop
              onDelete={handleDeleteTask} // Pass new prop
            />

            <TaskColumn
              title="Done"
              tasks={tasks.done}
              onDateChange={handleDateChange}
              onEdit={handleOpenEditModal} // Pass new prop
              onDelete={handleDeleteTask} // Pass new prop
            />
          </div>

          {/* This now receives the new dynamic 'progressData' */}
          <ProgressOverview data={progressData} />
        </section>

        

        <footer className="mt-10 bg-purple-50/60 rounded-2xl py-4 px-6 flex items-center gap-3 text-gray-600 text-sm italic border border-purple-100">
      <Shield className="text-purple-500 w-5 h-5" />
      <p>
        Task tracking shows assignments and deadlines only.{" "}
        <span className="not-italic text-gray-500">
          Not personal activity logs.
        </span>
      </p>
    </footer>
      </main>

      {/* --- Modal props are now correct --- */}
      <AssignModal
        open={isModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveModal}
        existingProjects={projects}
      />
    </div>
  );
}

