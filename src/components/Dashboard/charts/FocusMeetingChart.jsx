import React from "react";

/**
 * FocusMeetingChart
 * Shows the ratio of Focus vs Meeting time (static placeholder).
 */
export default function FocusMeetingChart() {
  return (
    <div>
      <div className="relative w-40 h-40 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          {/* Focus Segment (60%) */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#6366F1"
            strokeWidth="3"
            strokeDasharray="60, 40"
          />
          {/* Meeting Segment (40%) */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#F472B6"
            strokeWidth="3"
            strokeDasharray="40, 60"
            strokeDashoffset="-60"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">100</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 mt-4 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-pink-400 mr-2" />
          <span>Meeting</span>
          <span className="font-semibold ml-1">40</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2" />
          <span>Focus</span>
          <span className="font-semibold ml-1">60</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Target: Meeting 30% | Focus 70%
      </p>
    </div>
  );
}
