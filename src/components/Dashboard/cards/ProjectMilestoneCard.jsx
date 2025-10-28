import React from "react";
import Card from "../Card";
import ProjectMilestoneHeatmap from "../charts/ProjectMilestoneHeatmap";

export default function ProjectMilestoneCard({ className }) {
  return (
    <Card
      title="Project Milestones"
      headerControls={
        <div className="flex items-center text-sm font-medium bg-gray-100 rounded-lg p-0.5">
          <button className="px-3 py-1 rounded-md">Timeline View</button>
          <button className="px-3 py-1 rounded-md bg-white shadow-sm">
            Heatmap View
          </button>
        </div>
      }
      className={className}
    >
      <ProjectMilestoneHeatmap />
      <div className="flex justify-end space-x-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span><strong>5</strong> on track</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span><strong>2</strong> at risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span><strong>1</strong> delayed</span>
        </div>
      </div>
    </Card>
  );
}
