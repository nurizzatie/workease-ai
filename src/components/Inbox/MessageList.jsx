import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import NewMessageModal from "../Inbox/NewMessageModal";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Archive, Trash, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { handlePermanentDelete } from "../../utils/handlePermanentDelete";

export default function MessageList({ activeTab }) {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📨 Reply modal states
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyData, setReplyData] = useState(null);

  const handleReply = (data) => {
    setReplyData(data);
    setShowReplyModal(true);
  };

  // 🧭 Match tab to Firestore status
  const getStatusFilter = () => {
    switch (activeTab) {
      case "Archived":
        return "Archived";
      case "Draft":
        return "Draft";
      case "Trash":
        return "Trash";
      case "Starred":
        return "Starred";
      case "Sent":
        return "Sent";
      case "All":
      default:
        return null;
    }
  };

  // 🔄 Fetch messages (real-time listener)
  useEffect(() => {
    let unsub;
    const loadMessages = async () => {
      try {
        setLoading(true);
        const base = collection(db, "messages");

        let q;
        if (activeTab === "All") {
          q = query(base, where("status", "!=", "Trash"));
        } else {
          const status = getStatusFilter();
          q = status === null ? query(base) : query(base, where("status", "==", status));
        }

        const timeout = setTimeout(async () => {
          const snap = await getDocs(q);
          const fallbackData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setMessages(fallbackData);
          setLoading(false);
        }, 3000);

        unsub = onSnapshot(
          q,
          (snapshot) => {
            clearTimeout(timeout);
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setMessages(data);
            setLoading(false);
          },
          (err) => {
            clearTimeout(timeout);
            console.error("Firestore listener error:", err);
            setError("Failed to load messages");
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError("Failed to load messages");
        setLoading(false);
      }
    };

    loadMessages();
    return () => unsub && unsub();
  }, [activeTab]);

  // ✅ Select / deselect single
  const handleSelect = (id, isSelected) => {
    setSelectedMessages((prev) =>
      isSelected ? [...prev, id] : prev.filter((msgId) => msgId !== id)
    );
  };

  // ✅ Select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMessages(messages.map((msg) => msg.id));
    } else {
      setSelectedMessages([]);
    }
  };

  // ✅ Expand message
  const toggleExpand = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  // ✅ Bulk status update
  const updateMessageStatus = async (newStatus) => {
    if (selectedMessages.length === 0) {
      toast.error("No messages selected.");
      return;
    }

    const updates = selectedMessages.map((id) =>
      updateDoc(doc(db, "messages", id), { status: newStatus })
    );
    await Promise.all(updates);
    toast.success(`Moved ${selectedMessages.length} message(s) to ${newStatus}`);
    setSelectedMessages([]);
  };

  // 🧠 Loading and error UI
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (loading) return <p className="text-sm text-gray-500 mt-4">Loading messages...</p>;

  // 🧩 Render
  return (
    <div>
      {/* Toolbar for bulk actions */}
      {selectedMessages.length > 0 && (
        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg mb-3">
          <p className="text-sm text-gray-600">
            {selectedMessages.length} selected
          </p>
          <div className="flex items-center space-x-3 text-gray-600">
            {activeTab !== "Trash" ? (
              <>
                <button
                  onClick={() => updateMessageStatus("Starred")}
                  className="hover:text-indigo-600"
                  title="Star"
                >
                  <Star size={18} />
                </button>
                <button
                  onClick={() => updateMessageStatus("Archived")}
                  className="hover:text-indigo-600"
                  title="Archive"
                >
                  <Archive size={18} />
                </button>
                <button
                  onClick={() => updateMessageStatus("Trash")}
                  className="hover:text-red-600"
                  title="Move to Trash"
                >
                  <Trash size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  console.log("🧨 Delete Permanently button clicked!");
                  handlePermanentDelete(selectedMessages, setSelectedMessages);
                }}
                className="text-red-600 hover:text-red-800 font-medium flex items-center space-x-1"
                title="Delete Permanently"
              >
                <Trash2 size={18} />
                <span className="text-sm">Delete Permanently</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Select all */}
      {messages.length > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="checkbox"
            checked={selectedMessages.length === messages.length && messages.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-600">Select All</span>
        </div>
      )}

      {/* Message list */}
      <div className="space-y-3 mt-4">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-6">
            No messages found in "{activeTab}".
          </p>
        ) : (
          messages.map((msg) => (
            <MessageCard
              key={msg.id}
              {...msg}
              expanded={expandedMessage === msg.id}
              onToggle={() => toggleExpand(msg.id)}
              selected={selectedMessages.includes(msg.id)}
              onSelect={handleSelect}
              onReply={handleReply} // ✅ Pass reply handler
            />
          ))
        )}
      </div>

      {/* ✅ Reply modal */}
      {showReplyModal && (
        <NewMessageModal
          onClose={() => setShowReplyModal(false)}
          onSubmit={() => setShowReplyModal(false)}
          defaultRecipient={replyData?.recipient}
          defaultSubject={replyData?.subject}
          defaultContent={replyData?.content}
        />
      )}
    </div>
  );
}
