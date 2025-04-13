import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setToken } = useContext(LoginContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalPendingOrders: 0,
    mostRecentOrder: "",
  });

  const [disableUntil, setDisableUntil] = useState("2025-02-27");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5001/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // const toggleLanguage = () => {
  //   const newLang = i18n.language === "en" ? "fr" : "en";
  //   i18n.changeLanguage(newLang);
  // };

  // const handleLogout = () => {
  //   setToken(""); // Clear login token
  //   navigate("/login");
  // };

  const handleDateChange = (event) => {
    setDisableUntil(event.target.value);
  };

  const confirmOrderDisable = () => {
    console.log("Orders disabled until:", disableUntil);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>{t("dashboard.title")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">{t("dashboard.dashboard")}</Link></li>
            <li><strong>{t("dashboard.items")}</strong></li>
            <li><Link to="/dashboard/products">{t("dashboard.products")}</Link></li>
            <li><Link to="/dashboard/orders">{t("dashboard.orders")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("dashboard.title")}</h2>
          {/* <div className="header-right">
            <button className="language-button" onClick={toggleLanguage}>
              {i18n.language === "en" ? "Français" : "English"}
            </button>
            <button className="logout-button" onClick={handleLogout}>{t("Logout")}</button>
          </div> */}
        </header>
        <Outlet />

        <div className="content">
          <div className="order-control">
            <label>{t("dashboard.disable")}</label>
            <input type="date" value={disableUntil} onChange={handleDateChange} />
            <button className="Confirm-button" onClick={confirmOrderDisable}>{t("buttons.confirm")}</button>
          </div>

          <div className="stats">
            <h3>{t("stats.overview")}</h3>
            <div className="stats-item"><span>{t("stats.totalusers")}: </span> <strong>{stats.totalUsers}</strong></div>
            <div className="stats-item"><span>{t("stats.totalitems")}: </span> <strong>{stats.totalItems}</strong></div>
            <div className="stats-item"><span>{t("stats.pending")}: </span> <strong>{stats.totalPendingOrders}</strong></div>
            <div className="stats-item"><span>{t("stats.recent")}: </span> <strong>{stats.mostRecentOrder}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
