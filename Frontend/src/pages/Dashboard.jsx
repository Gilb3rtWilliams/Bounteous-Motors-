import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiList,
  FiRepeat,
  FiBell,
  FiPlusCircle,
  FiPackage,
  FiMessageSquare,
  FiStar,
  FiLogOut,
  FiChevronRight,
  FiTrendingUp,
  FiHome,
  FiUser,
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import CustomerSlideshow from "../components/CustomerSlideshow";
import Watchlist from "../components/Watchlist";
import useTypingEffect from "../hooks/useTypingEffect";
import "../css/Dashboard.css";

const navItems = [
  { key: "overview", label: "Overview", icon: <FiHome /> },
  { key: "order-car", label: "Order a Car", icon: <FiShoppingBag /> },
  { key: "schedule-test-drive", label: "Test Drive", icon: <FiChevronRight /> },
  { key: "trade-in", label: "Trade-In", icon: <FiRepeat /> },
  { key: "post-car", label: "Post a Car", icon: <FiPlusCircle /> },
  { key: "my-orders", label: "Manage Orders", icon: <FiPackage /> },
  {
    key: "manage-negotiations",
    label: "Negotiations",
    icon: <FiMessageSquare />,
  },
  { key: "notifications", label: "Notifications", icon: <FiBell /> },
  { key: "submit-feedback", label: "Feedback", icon: <FiStar /> },
  { key: "submit-review", label: "Reviews", icon: <FiStar /> },
];

const navGroups = [
  {
    label: "Main",
    items: ["overview", "order-car", "schedule-test-drive", "trade-in"],
  },
  {
    label: "Listings",
    items: ["post-car", "my-orders", "manage-negotiations"],
  },
  {
    label: "Account",
    items: ["notifications", "submit-feedback", "submit-review"],
  },
];

const customerActions = [
  {
    title: "Order a Car",
    description: "Browse & book your next vehicle",
    icon: "/images/icons/order.png",
    link: "order-car",
  },
  {
    title: "Schedule Test Drive",
    description: "Schedule with a seller near you",
    icon: "/images/icons/test-drive.png",
    link: "schedule-test-drive",
  },
  {
    title: "Trade In a Car",
    description: "Exchange your current vehicle",
    icon: "/images/icons/trade-in.png",
    link: "trade-in",
  },
  {
    title: "View Notifications",
    description: "Messages from sellers",
    icon: "/images/icons/notifications.png",
    link: "notifications",
  },
  {
    title: "Post a Car for Sale",
    description: "List your own vehicle",
    icon: "/images/icons/add-car.png",
    link: "post-car",
  },
  {
    title: "Manage Orders",
    description: "Track & manage your orders",
    icon: "/images/icons/orders.png",
    link: "my-orders",
  },
  {
    title: "Manage Negotiations",
    description: "View & respond to incoming offers",
    icon: "/images/icons/manage-negotiations.png",
    link: "manage-negotiations",
  },
  {
    title: "View Negotiations",
    description: "Offers made on your listings",
    icon: "/images/icons/negotiations.png",
    link: "negotiations",
  },
  {
    title: "Submit Feedback",
    description: "Rate your buying experience",
    icon: "/images/icons/feedback.png",
    link: "submit-feedback",
  },
  {
    title: "Submit Review",
    description: "Share your story with Bounteous Motors",
    icon: "/images/icons/reviews.png",
    link: "submit-review",
  },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("overview");

  const [userStats, setUserStats] = useState({
    buyingStats: { totalPurchases: 0, pendingPurchases: 0, savedCars: 0 },
    sellingStats: { activeListing: 0, soldCars: 0, pendingDeals: 0 },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUserStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [user.id, user.token]);

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
    : "U";

  const welcomeSubtitle = useTypingEffect(
    "Here's your Bounteous Motors activity summary",
    55,
  );

  const stats = [
    {
      label: "Total Purchases",
      value: userStats.buyingStats.totalPurchases,
      delta: "+1 this month",
      accent: true,
    },
    {
      label: "Active Listings",
      value: userStats.sellingStats.activeListing,
      delta: null,
      accent: true,
    },
    {
      label: "Cars Sold",
      value: userStats.sellingStats.soldCars,
      delta: null,
      accent: false,
    },
    {
      label: "Saved Cars",
      value: userStats.buyingStats.savedCars,
      delta: null,
      accent: false,
    },
  ];

  const now = new Date();
  const dayName = now.toLocaleDateString("en-GB", { weekday: "long" });
  const dateNum = now.getDate();
  const monthYear = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="db-shell">
      <CustomerSlideshow />

      {/* ── Sidebar ── */}
      <aside className="db-side">
        <div className="db-logo">
          <div className="db-logo-name">
            Bounteous
            <br />
            Motors
          </div>
          <div className="db-logo-sub">Customer Portal</div>
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
          <div className="db-avatar">{initials}</div>
          <div className="db-user-info">
            <div className="db-user-name">{user?.name || "Customer"}</div>
            <div className="db-user-role">Customer Account</div>
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
            <div className="db-eyebrow">Good to see you</div>
            <h1 className="db-greeting-name">
              Welcome back, <em>{user?.name?.split(" ")[0] || "there"}.</em>
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
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className={`db-stat${s.accent ? " accent" : ""}`}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="db-stat-val">{s.value}</div>
              <div className="db-stat-label">{s.label}</div>
              {s.delta && <div className="db-stat-delta">↑ {s.delta}</div>}
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
              <h2 className="db-col-title">Quick Actions</h2>
              <span className="db-col-count">10 services</span>
            </div>
            <div className="db-actions-grid">
              {customerActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="db-action"
                  onClick={() => navigate(`/${action.link}`)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="db-action-icon-wrap">
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

          {/* Watchlist */}
          <motion.div
            className="db-col db-col-watch"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="db-col-head">
              <h2 className="db-col-title">My Watchlist</h2>
            </div>
            <div className="db-watchlist-wrap">
              <Watchlist userId={user?.id} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
