import React, { useState } from "react";
import PrivacySection from "./PrivacySection";

export default function PrivacyTab() {
  const [privacySettings, setPrivacySettings] = useState({
    teamHours: true,
    projectBreakdown: true,
    shareUsage: true,
    individualDetails: false,
    dataExport: false,
  });

  const handleToggle = (key) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Privacy Settings
      </h2>

      <div className="space-y-4">
        <PrivacySection
          title="Share aggregated team hours"
          description="Managers see total hours per project/team, never individual logs."
          isEnabled={privacySettings.teamHours}
          onToggle={() => handleToggle("teamHours")}
        />
        <PrivacySection
          title="Show project-level breakdown"
          description="When ON: Hours grouped by project (e.g., Project A – 120 hrs). When OFF: Only total hours shown. Keeps focus on outcomes, not tasks."
          isEnabled={privacySettings.projectBreakdown}
          onToggle={() => handleToggle("projectBreakdown")}
        />
        <PrivacySection
          title="Share Usage Insights with Team"
          description="Let aggregated, non-identifiable productivity stats be visible to team members (e.g., average task completion rate)."
          isEnabled={privacySettings.shareUsage}
          onToggle={() => handleToggle("shareUsage")}
        />
        <PrivacySection
          title="Show Individual Activity Details"
          description="When ON: Managers see individual activity categories (e.g., Meeting, Coding). When OFF: Only team-level data is shown. Recommended OFF for stronger privacy."
          isEnabled={privacySettings.individualDetails}
          onToggle={() => handleToggle("individualDetails")}
        />
        <PrivacySection
          title="Data Export Permissions"
          description="Enable or restrict team members from exporting project data outside the dashboard."
          isEnabled={privacySettings.dataExport}
          onToggle={() => handleToggle("dataExport")}
        />
      </div>
    </div>
  );
}
