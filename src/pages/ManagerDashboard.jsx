import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardGrid from "../components/Dashboard/DashboardGrid";

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 md:p-8">
        <DashboardHeader />
        <DashboardGrid />
      </main>
    </div>
  );
}
