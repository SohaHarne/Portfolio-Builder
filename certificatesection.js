import { useState, useEffect } from "react";
import "./certificatesection.css";

function CertificateSection() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [certificates, setCertificates] = useState([]);

  const handleCertificateUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const res = await fetch(
        `http://localhost:5000/education/certificate/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
          }),
        }
      );

      const data = await res.json();
      alert(JSON.stringify(data));
      setCertificates(data.certificates || []);
    }
  };

  const fetchCertificates = async () => {
    const res = await fetch(
      `http://localhost:5000/education/certificate/${user._id}`
    );

    const data = await res.json();
    setCertificates(data || []);
  };

  const deleteCertificate = async (index) => {
    const res = await fetch(
      `http://localhost:5000/education/certificate/${user._id}/${index}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    setCertificates(data.certificates || []);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
  <div className="certificate-section">
    <h2>Certificates</h2>

    <label className="certificate-btn">
      Choose Certificate
      <input
        type="file"
        multiple
        onChange={handleCertificateUpload}
        style={{ display: "none" }}
      />
    </label>

    <div className="certificate-list">
      {certificates.map((cert, index) => (
        <div className="certificate-card" key={index}>
          <span>{cert.url || cert}</span>

          <button
            onClick={() => deleteCertificate(index)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default CertificateSection;