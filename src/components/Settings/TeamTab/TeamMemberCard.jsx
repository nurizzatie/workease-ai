import React from "react";
import { Minus } from "lucide-react";

export default function TeamMemberCard({ member, isEditing, onRemove }) {
  return (
    <div className="relative border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition bg-white">
      {isEditing && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-red-100 text-red-600 rounded-full p-1 transition"
        >
          <Minus className="w-4 h-4" />
        </button>
      )}

      <img
        src={member.avatar}
        alt={member.name}
        className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
      />
      <h4 className="font-semibold text-gray-800">{member.name}</h4>
      <p className="text-sm text-purple-600 mb-2">{member.role}</p>
      <p className="text-sm text-gray-600">{member.email}</p>
      <p className="text-sm text-gray-500">{member.phone}</p>
    </div>
  );
}
