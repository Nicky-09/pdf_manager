import React from "react";
import "./Navbar.css";
import { Button } from "antd";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <h3>My Files</h3>
        </li>
        <li className="navbar-item">
          <Button onClick={onLogout} className="navbar-button">
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
