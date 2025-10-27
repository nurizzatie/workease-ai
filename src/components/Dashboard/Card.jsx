import React from "react";

const Card = ({ title, headerControls, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {title && (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {headerControls}
      </div>
    )}
    {children}
  </div>
);

export default Card;
