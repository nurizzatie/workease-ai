import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import PasswordSection from "./PasswordSection";

export default function ProfileTab() {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchProfile(user.uid, user);
      } else {
        
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid, userObj) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        // Auto-create new profile if missing
        const newUserData = {
          firstName: userObj.displayName?.split(" ")[0] || "",
          lastName: userObj.displayName?.split(" ")[1] || "",
          email: userObj.email || "",
          phone: "",
          role: "New User",
          avatarUrl: "",
        };
        await setDoc(docRef, newUserData);
        setProfileData(newUserData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 border border-gray-100 rounded-2xl bg-white text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-6 border border-gray-100 rounded-2xl bg-white text-gray-500">
        No profile data found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={`${profileData.firstName || ""} ${profileData.lastName || ""}`}
        position={profileData.role || "New User"}
        avatarUrl={profileData.avatarUrl || null}
      />

      <ProfileInfoCard
        userId={userId}
        profileData={profileData}
        onProfileUpdate={fetchProfile}
      />

       <PasswordSection />
    </div>

   
  );
}
