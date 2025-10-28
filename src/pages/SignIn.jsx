import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bg from "../assets/background.png";
import logo from "../assets/WorkEase Logo.png";
import app from "../firebaseConfig";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

const SignIn = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Email/password login
  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleRedirect(userCredential.user.uid);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleRedirect(result.user.uid);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // Redirect based on Firestore role
  const handleRedirect = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { role } = docSnap.data();
      if (role === "manager") navigate("/manager");
      else navigate("/employee");
    } else {
      setMessage("⚠️ No user role found.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>

      {/* Background blobs */}
      <div className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 left-0 z-10"></div>
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-0 right-0 z-10"></div>

      {/* Logo */}
      <div className="relative z-20 flex justify-center">
        <img
          src={logo}
          alt="WorkEase AI Logo"
          className="w-28 sm:w-36 md:w-38 lg:w-40 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Sign-in card */}
      <div className="relative bg-purple-200 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-lg p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-1">SIGN IN</h2>
        <p className="text-sm text-gray-600 mb-6">Work Smarter, Log Easier</p>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-purple-700 hover:text-purple-900 underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-md transition duration-200"
          >
            LOGIN
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">Or sign in with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social login buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition"
          >
            <FaGoogle className="text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button
            disabled
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md opacity-60 cursor-not-allowed"
          >
            <FaMicrosoft className="text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Outlook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
