import React from "react";
import Card from "./Card";
import ProductivityChart from "./charts/ProductivityChart";
import FocusMeetingChart from "./charts/FocusMeetingChart";
import BurnoutRiskGauge from "./charts/BurnoutRiskGauge";
import ProjectMilestoneHeatmap from "./charts/ProjectMilestoneHeatmap";

/**
 * DashboardGrid
 * Arranges all dashboard cards in a responsive grid layout.
 */
const DashboardGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* Productivity Trend */}
    <Card title="Productivity Trend" className="md:col-span-2">
      <ProductivityChart />
    </Card>

    {/* Focus vs Meeting Ratio */}
    <Card title="Focus vs Meeting">
      <FocusMeetingChart />
    </Card>

    {/* Burnout Risk */}
    <Card title="Burnout Risk Alert">
      <BurnoutRiskGauge />
    </Card>

    {/* Project Milestones */}
    <Card title="Project Milestones" className="md:col-span-2">
      <ProjectMilestoneHeatmap />
    </Card>
  </div>
);

export default DashboardGrid;
