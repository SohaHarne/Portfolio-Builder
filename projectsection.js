import { useState, useEffect } from "react";
import "./project.css";

function ProjectSection({ projects, setProjects }) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(projects);
  console.log(setProjects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PROJECT
  const addProject = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.link
    ) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/education/project/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      setProjects(data.projects || []);

      setFormData({
        title: "",
        description: "",
        link: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/education/project/${user._id}`
      );

      const data = await res.json();

      setProjects(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (index) => {
    try {
      const res = await fetch(
        `http://localhost:5000/education/project/${user._id}/${index}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      setProjects(data.projects || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="section-card">
      <h2>Projects</h2>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Project Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="url"
        name="link"
        placeholder="Project Link"
        value={formData.link}
        onChange={handleChange}
      />

      <button
  onClick={() => {
    console.log("Project button clicked");
    addProject();
  }}
>
  Add Project
</button>

      {(projects || []).map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            View Project
          </a>

          <button
            type="button"
            onClick={() => deleteProject(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProjectSection;