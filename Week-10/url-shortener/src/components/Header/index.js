import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Header = () => {
  let activeStyle = {
    color: "cyan",
    textDecoration: "underline",
  };
  return (
    <div className="headerContainer">
      <div className="logo">Shortly</div>
      <div className="links">
        <NavLink
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/contact"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
