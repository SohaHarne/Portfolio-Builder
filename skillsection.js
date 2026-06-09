import { useState, useEffect } from "react";

function SkillSection() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  // ADD SKILL
  const addSkill = async () => {
    if (!skill.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/education/skill/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skill,
          }),
        }
      );

      const data = await res.json();

      setSkills(data.skills || []);

      setSkill("");
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH SKILLS
  const fetchSkills = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/education/skill/${user._id}`
      );

      const data = await res.json();

      setSkills(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE SKILL
  const deleteSkill = async (index) => {
    try {
      const res = await fetch(
        `http://localhost:5000/education/skill/${user._id}/${index}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      setSkills(data.skills || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="section-card">
      <h2>Skills</h2>

      <input
        type="text"
        placeholder="Enter a skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />

      <button onClick={addSkill}>
        Add Skill
      </button>

      <div className="skills-container">
        {(skills || []).map((item, index) => (
          <div key={index}>
            <span className="skill-tag">
              {item}
            </span>

            <button
              type="button"
              onClick={() => deleteSkill(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillSection;