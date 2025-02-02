import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgList, CgMenuBoxed } from "react-icons/cg";
import "./Nav.css";

const locations = ["Chennai", "Trichy", "Thanjavur"];

export default function Header({ selectedLocation, setSelectedLocation }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="home-bg"> 
      <header className="navbar shadow-sm fixed-top">
        <div className="nav-links">
          <img src="/Assets/logo (2).png" alt="" width="50px" height="50px" />
          <Link to="/">FOOD REGISTRATION</Link>
          <div className="dropdown ms-auto">
            {/* <select
              className="location-dropdown"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select> */}
          </div>
          <Link to="/foodregistration" className="register">
            Register
          </Link>
          <button className="toggle-button" onClick={toggleSideNav}>
            <CgMenuBoxed className="fs-3" />
          </button>
        </div>
      </header>
      <nav className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/listmanaging" onClick={toggleSideNav}>
              <CgList className="icons-2 fs-4 ms-1 me-2 mb-1" />
              List Managing
            </Link>
          </li>
        </ul>
      </nav>
      <div></div>
    </div>
  );
}