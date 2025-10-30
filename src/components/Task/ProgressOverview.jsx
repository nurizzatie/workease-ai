import React from "react";

export default function ProgressOverview({ data }) {
  return (
    <aside className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-100 max-w-sm w-full h-fit">
      <h2 className="font-semibold text-gray-700 mb-4">Team Progress Overview</h2>
      <div className="space-y-5">
        {data.map((item, i) => (
          <ProgressBar key={i} label={item.project} percent={item.percent} color={item.color} />
        ))}
      </div>
    </aside>
  );
}

function ProgressBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
