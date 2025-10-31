import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";



export default function ProfileHeader({ name, position, avatarUrl }) {
  const [avatar, setAvatar] = useState(avatarUrl || null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleRemoveAvatar = () => setAvatar(null);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6">
      <div className="flex items-center space-x-5">
        <div className="relative group">
          <img
            src={avatar || require("../../../assets/default-avatar.png")}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-gray-200 object-cover transition"
          />
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full text-white shadow hover:bg-indigo-700 cursor-pointer transition"
          >
            <Plus className="w-4 h-4" />
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-sm">{position}</p>
        </div>
      </div>

      {avatar && (
        <button
          onClick={handleRemoveAvatar}
          className="mt-4 sm:mt-0 flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition"
        >
          <Trash2 className="w-4 h-4" />
          Remove Image
        </button>
      )}
    </div>
  );
}
