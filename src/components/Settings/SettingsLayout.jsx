import React from "react";

export default function SettingsLayout({ title, subtitle, children }) {
  return (
    <div>
      {/* Header section (outside the white card) */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
      </header>

      {/* Content section (white card area) */}
      <section>
        {children}
      </section>
    </div>
  );
}
