#!/usr/bin/env node
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your Firebase config here 👇
const firebaseConfig = {
  apiKey: "AIzaSyDNYnzHUPdVToLbQEKjM59yC6Ab9XQmCVU",
  authDomain: "workease-ai.firebaseapp.com",
  projectId: "workease-ai",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleMessages = [
  {
    sender: "HR Department",
    recipient: "System Admin",
    subject: "Leave Application Approval",
    content: "Your leave for **3 days** has been approved by the HR Department.",
    status: "Sent",
  },
  {
    sender: "IT Support",
    recipient: "System Admin",
    subject: "System Downtime Notice",
    content: "Dashboard maintenance tonight from 2 AM to 5 AM.",
    status: "Archived",
  },
  {
    sender: "Finance Team",
    recipient: "System Admin",
    subject: "Reimbursement Form Submission",
    content: "Submit your September reimbursement form by October 31.",
    status: "Starred",
  },
  {
    sender: "Marketing Department",
    recipient: "System Admin",
    subject: "Q4 Campaign Draft",
    content: "Attached is the draft for the upcoming Q4 campaign.",
    status: "Draft",
  },
  {
    sender: "Recruitment",
    recipient: "System Admin",
    subject: "Interview Schedule – UI/UX Designer",
    content: "Interview for UI/UX Designer scheduled for October 30.",
    status: "Trash",
  },
  {
    sender: "HR Department",
    recipient: "System Admin",
    subject: "Employee Policy Document 2025",
    content:
      "Please find attached the updated HR policies for 2025.\n\nYou can also [view them online](https://example.com/policies).",
    attachmentURL:
      "https://firebasestorage.googleapis.com/v0/b/workease-ai.appspot.com/o/attachments%2Fsample-policy.pdf?alt=media",
    status: "Sent",
  },
];


async function seedMessages() {
  for (const msg of sampleMessages) {
    await addDoc(collection(db, "messages"), {
      ...msg,
      date: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    console.log(`✅ Added: ${msg.subject}`);
  }
}

seedMessages().then(() => {
  console.log("All messages added!");
});
