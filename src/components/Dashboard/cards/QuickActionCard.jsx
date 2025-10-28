import React from "react";
import Card from "../Card";
import { FileDown, RefreshCw, Link, Calendar } from "lucide-react";

export default function QuickActionCard() {
  return (
    <div className="flex flex-col space-y-6">
      {/* Quick Action */}
      <Card title="Quick Action">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Sarah</span> applying for a leave request.
            <button className="float-right text-xs text-indigo-600 font-medium">
              Download docs
            </button>
          </p>
          <div className="flex space-x-2">
            <button className="flex-1 text-sm font-medium bg-green-100 text-green-700 py-1.5 rounded-md hover:bg-green-200">
              Approve
            </button>
            <button className="flex-1 text-sm font-medium bg-red-100 text-red-700 py-1.5 rounded-md hover:bg-red-200">
              Reject
            </button>
          </div>
        </div>
        <button className="text-xs text-gray-500 hover:text-gray-700 mt-2 float-right">
          See More
        </button>
      </Card>

      {/* Export Dashboard */}
      <Card title="Export Dashboard">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <FileDown size={18} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">PDF</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <FileDown size={18} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">CSV</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <FileDown size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Excel</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            <RefreshCw size={18} className="text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Refresh</span>
          </button>
        </div>
      </Card>

      {/* Integrations */}
      <Card title="Integrations">
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
            <Link size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Jira</span>
          </button>
          <button className="flex items-center space-x-2 p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
            <Calendar size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Google Calendar</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
