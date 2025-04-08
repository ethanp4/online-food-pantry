import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/TokenProvider";
import { useTranslation } from "react-i18next";
import "./DeliveryPage.css";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setToken } = useContext(LoginContext);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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
            <li><Link to="/dashboard/pickup-requests">{t("Pickup Requests")}</Link></li>
            <li><Link to="/dashboard/delivery">{t("Delivery")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("Delivery Management")}</h2>
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

        {/* Delivery Requests Table */}
        <div className="content">
          <input
            type="text"
            placeholder={t("Search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <table className="Delivery-table">
            <thead>
              <tr>
                <th>{t("Customer ID")}</th>
                <th>{t("Customer Name")}</th>
                <th>{t("No. Of Items")}</th>
                <th>{t("Delivery Date & Time")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>###</td>
                  <td>{t("Name")}</td>
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
      </div>
    </div>
  );
};

export default DeliveryPage;
