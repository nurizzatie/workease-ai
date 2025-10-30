import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import NewMessageModal from "./NewMessageModal";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function InboxHeader() {
  const [showModal, setShowModal] = useState(false);

  const handleAddMessage = async ({ subject, content }) => {
    try {
      await addDoc(collection(db, "messages"), {
        sender: "System Admin",
        subject,
        content,
        status: "Sent",
        date: serverTimestamp(),
        createdAt: serverTimestamp(),
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
          <p className="text-sm text-gray-500">
            View and manage all employee requests
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-48 sm:w-64"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <button
            title="Filter messages"
            className="p-2.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 transition"
          >
            <Filter size={18} />
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-1 transition"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">New</span>
          </button>
        </div>
      </header>

      {showModal && (
        <NewMessageModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMessage}
        />
      )}
    </>
  );
}
