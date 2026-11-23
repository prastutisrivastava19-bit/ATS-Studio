
import React from "react";
import { NavLink } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const username = user?.name || "User";
  const avatarUrl = user?.avatarUrl;

  return (
    <header className="navbar">
      {/* Logo */}
      <NavLink to="/dashboard" className="navbar-logo">
        <CircleCheckBig className="logo-icon" size={42} />
        <span>ATS Studio</span>
      </NavLink>

      {/* User Profile */}
      <div className="navbar-profile">
        <button
          type="button"
          className="profile-button"
          title={username}
          aria-label={`Profile of ${username}`}
          onClick={onLogout}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s profile`}
              className="profile-avatar"
            />
          ) : (
            <span className="profile-placeholder">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
