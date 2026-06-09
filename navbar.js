import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">PortfolioHub</h2>

      <div className="nav-links">
        <Link to="/account">Profile</Link>
        <Link to="/search">Search</Link>
        <Link to="/create">Create</Link>
      </div>
    </nav>
  );
}

export default Navbar;

