import React from "react";

/**
 * ProjectMilestoneHeatmap
 * Visualizes milestones across project phases.
 */
export default function ProjectMilestoneHeatmap() {
  const phases = ["Research", "User Flow", "Prototype", "Design", "Testing"];
  const days = Array.from({ length: 31 });
  const colors = ["bg-gray-100", "bg-indigo-100", "bg-indigo-200", "bg-indigo-400"];

  return (
    <div className="flex">
      <div className="flex flex-col justify-between text-xs text-gray-500 py-2 pr-4">
        {phases.map((phase) => (
          <span key={phase}>{phase}</span>
        ))}
      </div>
      <div className="grid grid-cols-31 gap-1 flex-1">
        {phases.map((phase, r) => (
          <React.Fragment key={phase}>
            {days.map((_, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-full h-4 rounded-sm ${
                  colors[Math.floor(Math.random() * colors.length)]
                }`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
