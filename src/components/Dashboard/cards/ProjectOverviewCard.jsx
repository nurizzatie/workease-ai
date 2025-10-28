import React from "react";
import Card from "../Card";

export default function ProjectOverviewCard() {
  return (
    <Card title="Project Overview">
      <div className="flex items-center justify-around">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831" fill="#10B981" />
            <path d="M18 2.0845 a15.9155 15.9155 0 0 1 13.78 23.87" fill="#F59E0B" />
            <path
              d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831"
              fill="#EF4444"
              transform="rotate(270 18 18)"
            />
            <circle cx="18" cy="18" r="8" fill="white" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-800">10</span>
            <span className="text-xs text-gray-500">Projects</span>
          </div>
        </div>

        <ul className="space-y-1 text-xs">
          <li className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Done</span>
          </li>
          <li className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>Ongoing</span>
          </li>
          <li className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Cancelled</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}
