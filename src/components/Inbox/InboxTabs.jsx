import React from "react";

export default function InboxTabs({ activeTab, onTabChange }) {
  const tabs = ["All", "Archived", "Sent", "Draft", "Starred", "Trash"];

  return (
    <div role="tablist" className="flex space-x-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={`pb-2 font-medium transition ${
            activeTab === tab
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
