
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Sparkles,
} from "lucide-react";

import "../styles/Sidebar.css";

const Sidebar = ({
  collapsed = false,
  onToggle,
  onLogout,
}) => {
  const navigationItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Resumes",
      path: "/resumes",
      icon: FileText,
    },
    {
      title: "Issues & Suggestions",
      path: "/issues",
      icon: AlertCircle,
    },
  ];

  return (
    <aside
      className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}
    >
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Sparkles size={23} />
        </div>

        {!collapsed && (
          <div className="sidebar-brand">
            <h2>ATS Studio</h2>
            <span>Resume Analyzer</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen size={19} />
        ) : (
          <PanelLeftClose size={19} />
        )}
      </button>

      {/* Main Navigation */}
      <div className="sidebar-navigation">
        <p className="sidebar-section-title">
          {collapsed ? "" : "MENU"}
        </p>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.title : ""}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
                }
              >
                <Icon size={20} className="sidebar-link-icon" />

                {!collapsed && (
                  <span className="sidebar-link-text">
                    {item.title}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <div className="sidebar-upgrade">
          {!collapsed && (
            <>
              <div className="upgrade-icon">
                <Sparkles size={18} />
              </div>

              <h3>Improve Your Resume</h3>

              <p>
                Get better insights to make your resume stand out.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          className="sidebar-logout"
          onClick={onLogout}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={19} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
