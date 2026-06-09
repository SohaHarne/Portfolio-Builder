import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/Profile.css";

function ProfileView() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CERTIFICATES:", data.certificates);
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <h2>Bio</h2>
      <p>{user.bio}</p>

      <h2>Certificates</h2>

      {user.certificates?.length > 0 ? (
        user.certificates.map((cert, index) => (
          <div key={index}>
            <a
              href={cert.url || cert}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate {index + 1}
            </a>
          </div>
        ))
      ) : (
        <p>No certificates found</p>
      )}
    </div>
  );
}

export default ProfileView;