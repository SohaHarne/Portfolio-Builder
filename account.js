import React, { useState,useEffect } from "react";
import ExperienceSection from "../components/experiencesection";
import CertificateSection from "../components/certificatesection";
import Navbar from "../components/navbar";
import AccountInfo from "../components/accountinfo";
import SkillSection from "../components/skillsection";
import ProjectSection from "../components/projectsection";
import EducationSection from "../components/educationsection";

function Account() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState([]);
const [education, setEducation] = useState([]);
const [experience, setExperience] = useState([]);
const [projects, setProjects] = useState([]);
const [certificates, setCertificates] = useState([]);

useEffect(() => {
  const fetchProfile = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(
        `http://localhost:5000/profile/${user._id}`
      );

      if (!response.ok) return;

      const profile = await response.json();

      setBio(profile.bio || "");
      setGithub(profile.github || "");
      setLinkedin(profile.linkedin || "");
      setEducation(profile.education || []);
      
      setExperience(profile.experience || []);
      setProjects(profile.projects || []);
      setCertificates(profile.certificates || []);
      setSkills(profile.skills || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile();
  console.log("fetching profile");
}, []);

 const saveProfile = async () => {
  console.log("Saving profile", {
  userId: user?._id,
  bio,
  github,
  linkedin,
});
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

    if (response.ok) {
      alert(data.message || "Profile Saved Successfully");
    } else {
      alert(data.message || "Failed to save profile");
    }
  } catch (error) {
    console.error(error);
    alert("Error saving profile");
  }
};
  

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return <h2>No user logged in</h2>;
  }
  
  return (
    <>
      <Navbar />

      <div className="profile-form">
        <h1>Profile</h1>

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          type="text"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button onClick={saveProfile}>
          Save Profile
        </button>

        <button onClick={logout}>
          Logout
        </button>

        <div className="profile-links">
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
          <CertificateSection/>
          <EducationSection 
          education={education}
          setEducation={setEducation}/>
          <ExperienceSection
          experience={experience}
          setExperience={setExperience}/>
          <ProjectSection 
          projects={projects}
          setProjects={setProjects}/>
          <SkillSection/>

          

      
        </div>
      </div>
    </>
  );}


export default Account;