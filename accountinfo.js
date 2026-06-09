import "./accountinfo.css";
import { useState } from "react";

function AccountInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER",user);

  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  if (!user) {
    return <p>No user data found.</p>;
  }

  const saveProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          bio,
          github,
          linkedin,
        }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="account-info">
      <h1>Profile</h1>

      <div className="profile-form">
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          type="text"
          placeholder="LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <div className="button-group">
          <button onClick={saveProfile}>Save Profile</button>
          <button onClick={logout}>Logout</button>
        </div>

        {/* Clickable Links */}
        {github && (
          <p>
            <a href={github} target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </p>
        )}

        {linkedin && (
          <p>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn Profile
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
