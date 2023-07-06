import React from "react";
import "./Navbar.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("success");
    // setLoggedIn(false);
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <h3>My Files</h3>
        </li>
        <li className="navbar-item">
          <Button onClick={handleLogout} className="navbar-button">
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
