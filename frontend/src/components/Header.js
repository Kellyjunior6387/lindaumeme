import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";
import "../Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            Dashboard
          </li>
          <li className="nav-item">
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            Data Analysis
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
