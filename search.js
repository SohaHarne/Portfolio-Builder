import { useState, } from "react";
import {useNavigate} from "react-router-dom";
import "../components/search.css";
import {Link} from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate =useNavigate();
  const searchUsers = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/search/${search}`
      );

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Users</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter user name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchUsers}>
          Search
        </button>
      </div>

      {users.map((user) => (
        <div
  key={user._id}
  className="user-card"
  onClick={() => navigate(`/profile/${user._id}`)}
  style={{ cursor: "pointer" }}
>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;