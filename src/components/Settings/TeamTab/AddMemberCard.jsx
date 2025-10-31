import React from "react";
import { Plus } from "lucide-react";

export default function AddMemberCard({ onAdd }) {
  return (
    <button
      onClick={() =>
        onAdd({
          id: Date.now(),
          name: "New Member",
          role: "Unassigned",
          email: "new@works.com",
          phone: "-",
          avatar: "/avatars/default.png",
        })
      }
      className="flex flex-col items-center justify-center border border-dashed border-purple-300 rounded-2xl hover:border-purple-500 p-6 bg-purple-50 hover:bg-purple-100 transition"
    >
      <Plus className="w-10 h-10 text-purple-400 mb-2" />
      <span className="text-purple-600 font-medium">Add Member</span>
    </button>
  );
}
