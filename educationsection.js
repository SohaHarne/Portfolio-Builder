import { useState, useEffect } from "react";
import "./education.css";

function EducationSection({ education, setEducation }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SAVE TO BACKEND (ONLY SOURCE OF TRUTH)
  const addEducation = async () => {
    const res = await fetch(
      `http://localhost:5000/education/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    // update UI from backend response
    setEducation(data.education || []);

    setFormData({
      institute: "",
      degree: "",
      year: "",
    });
  };

  // ✅ FETCH ON LOAD (ONLY ONE SOURCE)
  const fetchEducation = async () => {
    const res = await fetch(
      `http://localhost:5000/profile/${user._id}`
    );

    const data = await res.json();
    setEducation(data.education || []);
  };

  useEffect(() => {
    fetchEducation();
  }, []);
  const deleteEducation = async (index) => {
  const res = await fetch(
    `http://localhost:5000/education/${user._id}/${index}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  setEducation(data.education || []);
};

  return (
    <div className="section-card">
      <h2>Education</h2>

      <input
        type="text"
        name="institute"
        placeholder="Institute Name"
        value={formData.institute}
        onChange={handleChange}
      />

      <input
        type="text"
        name="degree"
        placeholder="Degree"
        value={formData.degree}
        onChange={handleChange}
      />

      <input
        type="text"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <button onClick={addEducation}>Add Education</button>

      {education.map((item, index) => (
        <div key={index} className="education-card">
          <h3>{item.institute}</h3>
          <p>{item.degree}</p>
          <p>{item.year}</p>
           <button onClick={() => deleteEducation(index)}>
      Delete
    </button>
  
        </div>
      ))}
    </div>
  );
}

export default EducationSection;