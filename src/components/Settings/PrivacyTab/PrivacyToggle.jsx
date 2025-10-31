import React from "react";

export default function PrivacyToggle({ isEnabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition ${
        isEnabled ? "bg-purple-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
