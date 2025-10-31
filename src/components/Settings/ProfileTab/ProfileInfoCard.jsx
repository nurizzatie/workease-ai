import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfileInfoCard({ userId, profileData, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId) {
      toast.error("User not found");
      return;
    }

    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, formData);
      toast.success("Profile updated successfully ✨");
      setIsEditing(false);
      if (onProfileUpdate) onProfileUpdate(userId);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    if (profileData) setFormData(profileData);
    setIsEditing(false);
  };

  // Avoid rendering before data is ready
  if (!profileData) {
    return (
      <div className="p-6 border border-gray-100 rounded-2xl bg-white text-gray-500">
        Loading profile information...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-800 text-lg">
          Personal Information
        </h3>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 transition"
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* First Name */}
        <div>
          <label className="block text-gray-500 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${
              isEditing
                ? "border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                : "border-transparent bg-gray-50"
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-500 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${
              isEditing
                ? "border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                : "border-transparent bg-gray-50"
            }`}
          />
        </div>

        {/* Role (Read-only) */}
        <div>
          <label className="block text-gray-500 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            disabled
            className="w-full px-3 py-2 border border-transparent bg-gray-50 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-500 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded-md ${
              isEditing
                ? "border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                : "border-transparent bg-gray-50"
            }`}
          />
        </div>

        {/* Email (Read-only) */}
        <div className="md:col-span-2">
          <label className="block text-gray-500 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            disabled
            className="w-full px-3 py-2 border border-transparent bg-gray-50 rounded-md cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
