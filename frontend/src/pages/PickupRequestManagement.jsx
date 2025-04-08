import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/TokenProvider";
import { useTranslation } from "react-i18next";
import "./PickupRequestManagment.css";



const PickupRequestManagement = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setToken } = useContext(LoginContext);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [stats, setStats] = useState({
    totalPickupRequests: 0,
    totalCompletedRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5001/pickup-requests-stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    setToken(""); // Clear login token
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>{t("Admin.panel")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">{t("Dashboard")}</Link></li>
            <li><strong>{t("Items")}</strong></li>
            <li><Link to="/dashboard/products">{t("Products")}</Link></li>
            <li><Link to="/dashboard/orders">{t("Orders")}</Link></li>
            <li><Link to="/dashboard/pickup-requests">{t("PickupRequests")}</Link></li>
            <li><Link to="/dashboard/delivery">{t("Delivery")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("Pick-up Request")}</h2>
          <div className="header-right">
            {/* Language Button */}
            <button className="language-button" onClick={toggleLanguage}>
              {i18n.language === "en" ? "Français" : "English"}
            </button>
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              {t("Logout")}
            </button>
          </div>
        </header>

        {/* Pickup Requests Table */}
        <div className="content">
          <input
            type="text"
            placeholder={t("Search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <table className="pickup-table">
            <thead>
              <tr>
                <th>{t("Customer Id")}</th>
                <th>{t("Customer Name")}</th>
                <th>{t("No. Of Items")}</th>
                <th>{t("Date &Time")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>###</td>
                  <td>Name</td>
                  <td>—</td>
                  <td>yy/mm/dd hh:mm</td>
                  <td>
                    <button className="approve-btn">✔</button>
                    <button className="reject-btn">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="stats">
          <h3>{t("Statistics Overview")}</h3>
          <div className="stats-item">
            <span>{t("Total Pickup Requests")}: </span> <strong>{stats.totalPickupRequests}</strong>
          </div>
          <div className="stats-item">
            <span>{t("Total Completed Requests")}: </span> <strong>{stats.totalCompletedRequests}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupRequestManagement;
