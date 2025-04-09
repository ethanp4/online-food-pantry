import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";
import "./orderManagement.css";

const OrderManagement = () => {
  const { t, i18n } = useTranslation();
  const { token, setToken } = useContext(LoginContext);
  const navigate = useNavigate();
  

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setOrders(data["orders"]);
      }
    }
    catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>{t("Admin.panel")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard" className="non-active">{t("Dashboard")}</Link></li>
            <li className="section-title">{t("Items")}</li>
            <li className="section-title">{t("Categories")}</li>
            <li><Link to="/dashboard/products" className="non-active">{t("Products")}</Link></li>
            <li className="section-title">{t("Requests")}</li>
            <li><Link to="/dashboard/orders" className="active-text">{t("Orders")}</Link></li>
            <li><Link to="/dashboard/pickup-requests">{t("Pickup Requests")}</Link></li>
            <li><Link to="/dashboard/delivery">{t("Delivery")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("Admin.dashboard")}</h2>
          <div className="header-right">
            <button className="language-button" onClick={toggleLanguage}>
              {i18n.language === "en" ? "Français" : "English"}
            </button>
            <button className="logout-button" onClick={handleLogout}>{t("Logout")}</button>
          </div>
        </header>

        {/* Order Management Table */}
        <div className="content">
          <div className="order-header">
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="Filter-dropdown">
              <label>{t("Filter.by")}:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">{t("all")}</option>
                <option value="Active">{t("active")}</option>
                <option value="Completed">{t("completed")}</option>
              </select>
            </div>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th>{t("Delivery Id")}</th>
                <th>{t("Customer")}</th>
                <th>{t("Status")}</th>
                <th>{t("Order Date")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((_, index) => (
                <tr key={index}>
                  <td>###</td>
                  <td>{t("name")}</td>
                  <td>—</td>
                  <td>yy/mm/dd</td>
                  <td className="actions">
                    <button className="print-btn">🖨️</button>
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

export default OrderManagement;
