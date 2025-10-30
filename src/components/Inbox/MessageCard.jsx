import React from "react";
import { ChevronDown, ChevronUp, Paperclip, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function MessageCard({
  id,
  sender,
  recipient,
  subject,
  content,
  attachmentURL,
  status,
  date,
  expanded,
  onToggle,
  selected,
  onSelect,
  onReply,
}) {
  // ✅ Determine file type based on extension
  const getFileType = (url) => {
    if (!url) return null;
    const ext = url.split("?")[0].split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    return "file";
  };

  const fileType = getFileType(attachmentURL);

  return (
    <div
      className={`bg-white border rounded-xl shadow-sm transition-all duration-300 ${expanded ? "p-5 border-indigo-300" : "p-4"
        }`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center cursor-pointer" onClick={onToggle}>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelect(id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{sender}</h4>
            <p className="text-sm text-gray-500 truncate w-64">{subject}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {expanded ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Expanded View */}
      {expanded && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Recipient:</span> {recipient || "System Admin"}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-medium">Date:</span>{" "}
            {date?.seconds
              ? new Date(date.seconds * 1000).toLocaleString()
              : "Unknown"}
          </p>

          <div className="text-sm text-gray-700 leading-relaxed mb-3">
            <ReactMarkdown>{content || "No content available."}</ReactMarkdown>
          </div>

          {/* ✅ Attachment Section */}
          <div className="border-t border-gray-200 pt-3 mt-3 flex items-start space-x-2">
            <Paperclip size={16} className="text-gray-500 mt-1" />
            {attachmentURL ? (
              <div>
                {fileType === "image" && (
                  <a
                    href={attachmentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-32 h-32 overflow-hidden rounded-md border border-gray-200"
                  >
                    <img
                      src={attachmentURL}
                      alt="Attachment"
                      className="object-cover w-full h-full"
                    />
                  </a>
                )}
                {fileType === "pdf" && (
                  <a
                    href={attachmentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:underline"
                  >
                    <FileText size={16} className="mr-1" />
                    Open PDF
                  </a>
                )}
                {fileType === "file" && (
                  <a
                    href={attachmentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:underline"
                  >
                    <FileText size={16} className="mr-1" />
                    Download File
                  </a>
                )}
              </div>
            ) : (
              <span className="text-gray-400 text-sm italic">No attachments</span>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end space-x-3 text-sm pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReply({
                  recipient: sender || "Unknown Sender",
                  subject: subject?.startsWith("Re:") ? subject : `Re: ${subject}`,
                 
                });
              }}
              className="text-indigo-600 hover:underline"
            >
              Reply
            </button>
            <button className="text-gray-500 hover:underline">Move to Archive</button>
          </div>

        </div>
      )}
    </div>
  );
}
