import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee" element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
          } />
        <Route path="/manager" element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
