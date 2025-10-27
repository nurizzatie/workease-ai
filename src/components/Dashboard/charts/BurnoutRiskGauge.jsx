import React from "react";

/**
 * BurnoutRiskGauge
 * Displays burnout or balance level indicator.
 */
export default function BurnoutRiskGauge() {
  return (
    <div className="relative w-40 h-20 mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 36 18">
        {/* Background Arc */}
        <path
          d="M 2 16 A 16 16 0 0 1 34 16"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Data Arc */}
        <path
          d="M 2 16 A 16 16 0 0 1 34 16"
          fill="none"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="30, 70"
        />
      </svg>
      <div className="absolute bottom-0 w-full flex justify-center">
        <button className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
          Balance
        </button>
      </div>
    </div>
  );
}
