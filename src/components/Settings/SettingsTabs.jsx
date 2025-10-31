import React, { useState } from "react";
import ProfileTab from "./ProfileTab/ProfileTab";
import TeamTab from "./TeamTab/TeamTab";
import PrivacyTab from "./PrivacyTab/PrivacyTab";
import SettingsLayout from "./SettingsLayout";

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile", "Team", "Privacy"];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Team":
        return <TeamTab />;
      case "Privacy":
        return <PrivacyTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <SettingsLayout
      title="Settings"
      subtitle="Manage your account setting and preferences"
    >
      {/* Tabs container */}
      <div className="flex space-x-6 border-b border-gray-200">
        <div role="tablist" className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
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
      </div>

      {/* Active tab content */}
      <div className="mt-6">{renderActiveTab()}</div>
    </SettingsLayout>
  );
}
