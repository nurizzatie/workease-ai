import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNYnzHUPdVToLbQEKjM59yC6Ab9XQmCVU",
  authDomain: "workease-ai.firebaseapp.com",
  projectId: "workease-ai",
  storageBucket: "workease-ai.firebasestorage.app",
  messagingSenderId: "522610867469",
  appId: "1:522610867469:web:bc1ecf9d9dbbc528558444"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
