import React from "react";
import Card from "../Card";

export default function AIProductivityTipCard() {
  return (
    <Card title="AI Productivity Tip">
      <p className="text-sm text-gray-600 mb-4">
        You have 23% fewer interruptions on Tuesdays. Consider scheduling deep work then.
      </p>
      <button className="w-full text-sm font-medium text-indigo-600 hover:text-indigo-800">
        Schedule Deep Work
      </button>
    </Card>
  );
}
