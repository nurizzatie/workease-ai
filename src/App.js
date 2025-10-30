import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import { Toaster } from "react-hot-toast";
import ManagerInbox from "./pages/ManagerInbox";
import ManagerTasks from "./pages/ManagerTasks";

function App() {
  return (
    <Router>
      {/* ✅ Add the toaster here so it’s always available */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <ManagerInbox />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/tasks" 
          element={<ManagerTasks />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
