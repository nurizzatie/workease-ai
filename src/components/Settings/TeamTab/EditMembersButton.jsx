import React from "react";
import { Pencil } from "lucide-react";

export default function EditMembersButton({ isEditing, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-1 px-3 py-1 text-sm text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
    >
      <Pencil className="w-4 h-4" />
      <span>{isEditing ? "Done" : "Edit Members"}</span>
    </button>
  );
}
