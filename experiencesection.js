import { useState, useEffect } from "react";

function ExperienceSection({ experience, setExperience }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FIXED FUNCTION (must be inside component)
  const addExperience = async () => {
  const res = await fetch(
    `http://localhost:5000/education/experience/${user._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();

  setExperience(data.experience || []);

  setFormData({
    company: "",
    role: "",
    duration: "",
  });
};

  // FETCH
  const fetchExperience = async () => {
    const res = await fetch(
      `http://localhost:5000/education/experience/${user._id}`
    );

    const data = await res.json();
    console.log("Fetched experience:",data);
    setExperience(data || []);
  };

  useEffect(() => {
    fetchExperience();
  }, []);
  const deleteExperience = async (index) => {
  const res = await fetch(
    `http://localhost:5000/education/experience/${user._id}/${index}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  setExperience(data.experience || []);
};

  return (
    <div className="section-card">
      <h2>Experience</h2>

      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />

      <input
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      />

      {/* ✅ THIS MUST BE EXACT */}
      <button onClick={addExperience}>
        Add Experience
      </button>

      {Array.isArray(experience) &&
  experience.map((item, index) => (
        <div key={index}>
          <h3>{item.company}</h3>
          <p>{item.role}</p>
          <p>{item.duration}</p>

          <button onClick={()=> deleteExperience(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExperienceSection;