import React, { useState } from "react";
import InboxTabs from "./InboxTabs";
import MessageList from "./MessageList";

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <InboxTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <MessageList activeTab={activeTab} />
    </div>
  );
}
