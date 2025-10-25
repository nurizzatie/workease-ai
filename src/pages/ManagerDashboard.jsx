import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ManagerDashboard = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-semibold text-purple-600">Manager Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to WorkEase AI 👋</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "/"; // redirect to login page
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export default ManagerDashboard;
