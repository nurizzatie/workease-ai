import React from "react";
import Card from "../Card";

export default function ThisWeekActivityCard() {
  return (
    <Card title="This Week’s Activity">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-gray-800">100 hrs logged</p>
          <p className="text-sm text-gray-500">-2hrs vs last week</p>
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          See Details
        </button>
      </div>
    </Card>
  );
}
