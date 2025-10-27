import React from "react";
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from "lucide-react";

const DashboardHeader = () => (
  <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manager Dashboard</h1>
    <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
        <Calendar size={16} className="text-gray-400" />
        <span>Dec 1, 2024 - Dec 31, 2024</span>
      </div>
      <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
        <ChevronRight size={18} />
      </button>
      <button className="flex items-center space-x-1.5 p-1.5 pr-2.5 rounded-md hover:bg-gray-100 text-gray-500 border-l border-gray-200 ml-2">
        <span className="text-sm font-medium text-gray-700 ml-2">All</span>
        <ChevronDown size={16} />
      </button>
    </div>
  </div>
);

export default DashboardHeader;
