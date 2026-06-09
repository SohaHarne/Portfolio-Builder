import { useEffect, useState } from "react";

export default function useEducation() {
  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem("education");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

  return { education, setEducation };
}
