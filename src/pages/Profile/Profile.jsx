import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import profile_icon from "../../assets/profile_img.png";
import "./Profile.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch the user to get the latest information
        setUser(auth.currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const username = user && user.displayName ? user.displayName : "Anonymous";

  return (
    <div className="profile">
      <Navbar className="navbar-profile" />
      <div className="profile-body">
        <h1>Edit Profile</h1>
        <div className="profile-info">
          <img src={profile_icon} alt="profile-icon" />
          <div className="profile-details">
            <h2>{username}</h2>
            <p>{user && user.email ? user.email : "No email available"}</p>
            <div className="profile-plans">
              <h3>Plans</h3>
              <button onClick={() => auth.signOut} className="profile-signout">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
