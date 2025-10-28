import React from "react";
import Card from "./Card";
import ProductivityChart from "./charts/ProductivityChart";
import FocusMeetingChart from "./charts/FocusMeetingChart";
import BurnoutRiskGauge from "./charts/BurnoutRiskGauge";

import ThisWeekActivityCard from "./cards/ThisWeekActivityCard";
import ProjectOverviewCard from "./cards/ProjectOverviewCard";
import AIProductivityTipCard from "./cards/AIProductivityTipCard";
import ProjectMilestoneCard from "./cards/ProjectMilestoneCard";
import QuickActionCard from "./cards/QuickActionCard";

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* ===== Row 1 ===== */}
      <Card title="Productivity Trend" className="lg:col-span-3">
        <ProductivityChart />
      </Card>

      <Card title="Focus vs Meeting">
        <FocusMeetingChart />
      </Card>

      {/* ===== Row 2 ===== */}
      <ThisWeekActivityCard />
      <Card title="Burnout Risk Alert">
        <BurnoutRiskGauge />
        <p className="text-center text-xs text-gray-500 mt-2">
          Based on hours and meeting load
        </p>
      </Card>
      <ProjectOverviewCard />
      <AIProductivityTipCard />

      {/* ===== Row 3 ===== */}
      <ProjectMilestoneCard className="lg:col-span-3" />
      <QuickActionCard />
    </div>
  );
}
