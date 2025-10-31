import React from "react";
import PrivacyToggle from "./PrivacyToggle";

export default function PrivacySection({ title, description, isEnabled, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition bg-white">
      <div>
        <h3 className="text-gray-800 font-medium">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xl">{description}</p>
      </div>
      <PrivacyToggle isEnabled={isEnabled} onToggle={onToggle} />
    </div>
  );
}
