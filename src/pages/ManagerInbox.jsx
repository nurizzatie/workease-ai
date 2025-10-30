import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar"; 
import InboxHeader from "../components/Inbox/InboxHeader";
import InboxTabs from "../components/Inbox/InboxTabs";
import MessageList from "../components/Inbox/MessageList";

export default function ManagerInbox() {
  const [activeTab, setActiveTab] = useState("Open");

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6">
        <InboxHeader />
        <InboxTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-4">
          <MessageList activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
