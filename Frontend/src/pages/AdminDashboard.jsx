import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCheckSquare,
  FiBell,
  FiTruck,
  FiMessageSquare,
  FiStar,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiPlusCircle,
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import AdminSlideshow from "../components/AdminSlideshow";
import useTypingEffect from "../hooks/useTypingEffect";
import "../css/Dashboard.css"; // Uses the base customer styling
import "../css/AdminDashboard.css"; // Admin specific additions

const navItems = [
  { key: "admin", label: "Overview", icon: <FiHome /> },
  { key: "admin/add-car", label: "Add Inventory", icon: <FiPlusCircle /> },
  {
    key: "admin/review-listings",
    label: "Review Listings",
    icon: <FiCheckSquare />,
  },
  { key: "admin/manage-orders", label: "Manage Orders", icon: <FiTruck /> },
  { key: "admin/users", label: "Manage Users", icon: <FiUsers /> },
  { key: "admin/transactions", label: "Transactions", icon: <FiDollarSign /> },
  { key: "admin/notifications", label: "System Alerts", icon: <FiBell /> },
  { key: "admin-feedback", label: "User Feedback", icon: <FiMessageSquare /> },
  { key: "admin-reviews", label: "Site Reviews", icon: <FiStar /> },
  { key: "admin/settings", label: "Settings", icon: <FiSettings /> },
];

const navGroups = [
  {
    label: "Main",
    items: ["admin", "admin/settings"],
  },
  {
    label: "Marketplace",
    items: [
      "admin/add-car",
      "admin/review-listings",
      "admin/manage-orders",
      "admin/transactions",
    ],
  },
  {
    label: "Community & Support",
    items: [
      "admin/users",
      "admin/notifications",
      "admin-feedback",
      "admin-reviews",
    ],
  },
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("admin");

  const [stats] = useState({
    totalUsers: 150,
    activeListings: 45,
    pendingApprovals: 12,
    totalTransactions: 89,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: "New Listing",
      user: "John Doe",
      time: "2 hours ago",
      status: "Pending",
    },
    {
      id: 2,
      type: "Purchase",
      user: "Jane Smith",
      time: "3 hours ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "User Registration",
      user: "Mike Johnson",
      time: "5 hours ago",
      status: "Completed",
    },
    {
      id: 4,
      type: "Listing Rejected",
      user: "Sarah Lee",
      time: "6 hours ago",
      status: "Rejected",
    },
  ]);

  const adminActions = [
    {
      title: "Add Car Listing",
      description: "Add new inventory",
      icon: "/images/icons/add-car.png",
      link: "admin/add-car",
    },
    {
      title: "Review Listings",
      description: "Approve user vehicles",
      icon: "/images/icons/review.png",
      link: "admin/review-listings",
    },
    {
      title: "Manage Orders",
      description: "Track deliveries",
      icon: "/images/icons/delivery.png",
      link: "admin/manage-orders",
    },
    {
      title: "Manage Users",
      description: "View accounts",
      icon: "/images/icons/users.png",
      link: "admin/users",
    },
    {
      title: "Admin Notifications",
      description: "System alerts",
      icon: "/images/icons/notifications.png",
      link: "admin/notifications",
    },
    {
      title: "View Feedback",
      description: "Read suggestions",
      icon: "/images/icons/feedbackmanagement.png",
      link: "admin-feedback",
    },
    {
      title: "Manage Reviews",
      description: "Publish reviews",
      icon: "/images/icons/reviewmanagement.png",
      link: "admin-reviews",
    },
    {
      title: "Transactions",
      description: "Financial records",
      icon: "/images/icons/transactions.png",
      link: "admin/transactions",
    },
  ];

  const adminStats = [
    {
      label: "Pending Approvals",
      value: stats.pendingApprovals,
      delta: "+3 today",
      accent: true,
    },
    {
      label: "Active Listings",
      value: stats.activeListings,
      delta: "+5 this week",
      accent: true,
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      delta: null,
      accent: false,
    },
    {
      label: "Transactions",
      value: stats.totalTransactions,
      delta: null,
      accent: false,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";
  const welcomeSubtitle = useTypingEffect(
    "Here's your Bounteous Motors admin overview",
    55,
  );

  const now = new Date();
  const dayName = now.toLocaleDateString("en-GB", { weekday: "long" });
  const dateNum = now.getDate();
  const monthYear = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="db-shell">
      <AdminSlideshow />

      {/* ── Sidebar ── */}
      <aside className="db-side">
        <div className="db-logo">
          <div className="db-logo-name">
            Bounteous
            <br />
            Motors
          </div>
          <div className="db-logo-sub" style={{ color: "var(--gold)" }}>
            Admin Portal
          </div>
        </div>

        <nav className="db-nav">
          {navGroups.map((group) => (
            <div key={group.label} className="db-nav-group">
              <div className="db-nav-group-label">{group.label}</div>
              {navItems
                .filter((item) => group.items.includes(item.key))
                .map((item) => (
                  <button
                    key={item.key}
                    className={`db-nav-item${activeNav === item.key ? " active" : ""}`}
                    onClick={() => {
                      setActiveNav(item.key);
                      navigate(`/${item.key}`);
                    }}
                  >
                    <span className="db-nav-icon">{item.icon}</span>
                    <span className="db-nav-label">{item.label}</span>
                    {activeNav === item.key && (
                      <motion.span
                        className="db-nav-activeline"
                        layoutId="activeLine"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        <div className="db-side-spacer" />

        <div className="db-user">
          <div
            className="db-avatar"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            {initials}
          </div>
          <div className="db-user-info">
            <div className="db-user-name">{user?.name || "Administrator"}</div>
            <div className="db-user-role" style={{ color: "var(--gold)" }}>
              System Admin
            </div>
          </div>
          <button
            className="db-logout-btn"
            onClick={handleLogout}
            title="Sign out"
          >
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="db-main">
        {/* Top bar */}
        <motion.div
          className="db-topbar"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="db-greeting">
            <div className="db-eyebrow">System Control</div>
            <h1 className="db-greeting-name">
              Welcome back,{" "}
              <em style={{ color: "var(--gold)" }}>
                {user?.name?.split(" ")[0] || "Admin"}.
              </em>
            </h1>
            <p className="db-greeting-sub">{welcomeSubtitle}</p>
          </div>
          <div className="db-date-block">
            <div className="db-date-day">{dayName}</div>
            <div className="db-date-num">{dateNum}</div>
            <div className="db-date-month">{monthYear}</div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="db-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {adminStats.map((s, i) => (
            <motion.div
              key={i}
              className={`db-stat${s.accent ? " accent" : ""}`}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="db-stat-val"
                style={s.accent ? { color: "var(--gold)" } : {}}
              >
                {s.value}
              </div>
              <div className="db-stat-label">{s.label}</div>
              {s.delta && (
                <div
                  className="db-stat-delta"
                  style={{ color: s.accent ? "var(--gold)" : "#4ade80" }}
                >
                  ↑ {s.delta}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column body */}
        <div className="db-body">
          {/* Quick Actions */}
          <motion.div
            className="db-col db-col-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="db-col-head">
              <h2 className="db-col-title">Management</h2>
              <span
                className="db-col-count"
                style={{
                  color: "var(--gold)",
                  borderBottomColor: "var(--gold-dim)",
                }}
              >
                {adminActions.length} Actions
              </span>
            </div>
            <div className="db-actions-grid">
              {adminActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="db-action admin-action"
                  onClick={() => navigate(`/${action.link}`)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="db-action-icon-wrap admin-icon-wrap">
                    <img
                      src={action.icon}
                      alt={action.title}
                      className="db-action-img"
                    />
                  </div>
                  <div>
                    <div className="db-action-title">{action.title}</div>
                    <div className="db-action-desc">{action.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity (Replaces Watchlist) */}
          <motion.div
            className="db-col db-col-activity"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="db-col-head">
              <h2 className="db-col-title">Live Feed</h2>
            </div>
            <div className="db-watchlist-wrap">
              <div className="db-activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="db-activity-item">
                    <div className="db-activity-info">
                      <div className="db-activity-title">{activity.type}</div>
                      <div className="db-activity-user">
                        by {activity.user} • {activity.time}
                      </div>
                    </div>
                    <div
                      className={`db-activity-status status-${activity.status.toLowerCase()}`}
                    >
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
