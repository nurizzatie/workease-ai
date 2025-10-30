import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import toast from "react-hot-toast";

export async function handlePermanentDelete(selectedMessages, setSelectedMessages) {
  console.log("🔥 handlePermanentDelete function reached.");

  if (!selectedMessages || selectedMessages.length === 0) {
    console.warn("⚠️ No messages selected.");
    toast.error("No messages selected.");
    return;
  }

  // Log Firestore check
  console.log("📋 Messages to delete:", selectedMessages);

  // Toast confirmation box
  toast.custom((t) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-80">
      <p className="text-gray-800 font-semibold mb-1">
        Permanently delete {selectedMessages.length} message(s)?
      </p>
      <p className="text-xs text-gray-500 mb-3">This action cannot be undone.</p>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            console.log("❌ Cancel delete clicked");
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            console.log("🗑️ Confirm delete clicked");
            try {
              await Promise.all(
                selectedMessages.map(async (id) => {
                  console.log("Deleting document:", id);
                  await deleteDoc(doc(db, "messages", id));
                })
              );
              toast.success("Messages permanently deleted!");
              console.log("✅ Successfully deleted from Firestore.");
              setSelectedMessages([]);
            } catch (err) {
              console.error("❌ Firestore delete error:", err);
              toast.error("Failed to delete messages.");
            } finally {
              toast.dismiss(t.id);
            }
          }}
          className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  ));
}
