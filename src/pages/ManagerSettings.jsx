import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import SettingsTabs from "../components/Settings/SettingsTabs";

export default function ManagerSettings() {
  return (
    <div className="min-h-screen bg-white-50 font-sans flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-6">
        <main className="mt-4">
          <SettingsTabs />
        </main>
        </div>
    </div>
  );
}