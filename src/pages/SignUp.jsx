import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import bg from "../assets/background.png";
import logo from "../assets/WorkEase Logo.png";

const SignUp = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      setMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
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

      {/* Sign-up card */}
      <div className="relative bg-purple-200 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-lg p-10 w-full max-w-md text-center z-20">
        <h2 className="text-2xl font-bold text-purple-800 mb-1">CREATE ACCOUNT</h2>
        <p className="text-sm text-gray-600 mb-6">Join WorkEase AI Today</p>

        {/* Sign-up Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            required
          />

          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm appearance-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-md transition duration-200"
          >
            SIGN UP
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}

        {/* Redirect to Sign In */}
        <p className="text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <a href="/" className="text-purple-700 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
