import React, { useState, useRef } from "react";
import { X, Paperclip, Link as LinkIcon, Send, Minus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import toast from "react-hot-toast";

export default function NewMessageModal({
  onClose,
  onSubmit,
  defaultRecipient = "",
  defaultSubject = "",
  defaultContent = "",
}) {
  // 🪄 Prefill states when replying
  const [to, setTo] = useState(defaultRecipient);
  const [subject, setSubject] = useState(defaultSubject);
  const [content, setContent] = useState(defaultContent);
  const [attachment, setAttachment] = useState(null);
  const [attachmentURL, setAttachmentURL] = useState(null);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const textAreaRef = useRef(null);
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // ✅ Sync props if they change dynamically
  React.useEffect(() => {
    setTo(defaultRecipient);
    setSubject(defaultSubject);
    setContent(defaultContent);
  }, [defaultRecipient, defaultSubject, defaultContent]);

  // ✅ Upload file to Firebase Storage
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setAttachment(file);
      const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setAttachmentURL(downloadURL);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !content) {
      toast.error("Please fill in subject and message!");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        sender: "System Admin",
        subject,
        content,
        attachmentURL: attachmentURL || null,
        status: "Sent",
        date: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      toast.success("Message sent successfully!");
      setTo("");
      setSubject("");
      setContent("");
      setAttachment(null);
      setAttachmentURL(null);
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - modalRef.current.offsetLeft,
      y: e.clientY - modalRef.current.offsetTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    modalRef.current.style.left = `${e.clientX - dragStart.current.x}px`;
    modalRef.current.style.top = `${e.clientY - dragStart.current.y}px`;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleApplyLink = () => {
    if (!linkText || !linkUrl) {
      setShowLinkPopup(false);
      return;
    }

    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = content.substring(0, start);
    const after = content.substring(end);
    const markdownLink = `[${linkText}](${linkUrl})`;

    const newContent = before + markdownLink + after;
    setContent(newContent);

    setShowLinkPopup(false);
    setLinkText("");
    setLinkUrl("");

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + markdownLink.length;
    }, 0);
  };

  const handleSaveDraft = async () => {
    if (!subject && !content) {
      alert("Nothing to save yet!");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        sender: "System Admin",
        subject: subject || "(No Subject)",
        content: content || "",
        attachmentURL: attachmentURL || null,
        status: "Draft",
        date: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={modalRef}
        className={`absolute bottom-6 right-6 bg-white rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden w-full max-w-2xl transition-all ${
          isMinimized ? "h-12" : "h-auto"
        }`}
        style={{ cursor: "default" }}
      >
        <div
          className="flex items-center justify-between bg-indigo-100 px-4 py-2 cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <h3 className="font-medium text-gray-800">New Message</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-600 hover:text-gray-800"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <input
                type="email"
                placeholder="Recipients"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full text-sm border-b border-gray-300 focus:border-indigo-500 outline-none pb-1"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-sm border-b border-gray-300 focus:border-indigo-500 outline-none pb-1"
              />
            </div>

            <div>
              <textarea
                ref={textAreaRef}
                placeholder="Write your message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>

            {content && (
              <div className="border border-gray-100 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-medium text-gray-500 mb-1">Preview:</p>
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {props.children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {attachmentURL && (
              <p className="text-xs text-gray-500">
                Uploaded file:{" "}
                <a
                  href={attachmentURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {attachment?.name || "View file"}
                </a>
              </p>
            )}

            {showLinkPopup && (
              <div className="absolute bottom-28 left-10 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-72">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Type or paste a link"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleApplyLink}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer text-gray-500 hover:text-indigo-600" title="Attach file">
                  <Paperclip size={18} />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowLinkPopup(!showLinkPopup)}
                  className="text-gray-500 hover:text-indigo-600"
                  title="Insert link"
                >
                  <LinkIcon size={18} />
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Save as Draft
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition"
                >
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
