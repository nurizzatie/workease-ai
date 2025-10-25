import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";

const SignUp = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
      });

      setMessage("✅ Account created successfully!");
      window.location.href = "/"; // redirect to login page
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-600">
          WorkEase AI – Sign Up
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Sign Up
        </button>

        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default SignUp;
