import React from "react";

/**
 * ProductivityChart
 * Displays productivity trend over time (static placeholder).
 */
export default function ProductivityChart() {
  return (
    <div className="h-64 w-full">
      <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
        {/* Gradient background */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d="M 0 60 L 50 70 L 100 80 L 150 100 L 200 120 L 250 130 L 300 135 L 350 140 L 400 145 L 450 150 L 470 152"
          fill="url(#areaGradient)"
          stroke="none"
        />

        {/* Line path */}
        <path
          d="M 0 60 L 50 70 L 100 80 L 150 100 L 200 120 L 250 130 L 300 135 L 350 140 L 400 145 L 450 150 L 470 152"
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* Dots */}
        <circle cx="0" cy="60" r="3" fill="#6366F1" />
        <circle cx="150" cy="100" r="3" fill="#6366F1" />
        <circle cx="250" cy="130" r="3" fill="#6366F1" />
        <circle cx="350" cy="140" r="3" fill="#6366F1" />
        <circle cx="470" cy="152" r="3" fill="#6366F1" />
      </svg>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 mt-2">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded-full" />
          <span>2025</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-0.5 bg-indigo-500 rounded-full" />
          <span>Task</span>
        </div>
      </div>
    </div>
  );
}
