import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";
import "./orderManagement.css";

const OrderManagement = () => {
  const { t } = useTranslation();
  const { token, setToken } = useContext(LoginContext);
  const navigate = useNavigate();
  

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);

  // const toggleLanguage = () => {
  //   const newLang = i18n.language === "en" ? "fr" : "en";
  //   i18n.changeLanguage(newLang);
  // };

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
        <h3>{t("dashboard.title")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard" className="non-active">{t("dashboard.dashboard")}</Link></li>
            <li className="section-title">{t("dashboard.items")}</li>
            <li className="section-title">{t("dashboard.categories")}</li>
            <li><Link to="/dashboard/products" className="non-active">{t("dashboard.products")}</Link></li>
            <li className="section-title">{t("dashboard.requests")}</li>
            <li><Link to="/dashboard/orders" className="active-text">{t("dashboard.orders")}</Link></li>
            <li><Link to="/dashboard/pickup-requests">{t("dashboard.pickup")}</Link></li>
            <li><Link to="/dashboard/delivery">{t("dashboard.delivery")}</Link></li>
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
              <label>{t("ordermgmt.filter")}:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">{t("ordermgmt.all")}</option>
                <option value="Active">{t("ordermgmt.active")}</option>
                <option value="Completed">{t("ordermgmt.completed")}</option>
              </select>
            </div>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th>{t("ordermgmt.deliveryID")}</th>
                <th>{t("ordermgmt.customer")}</th>
                <th>{t("ordermgmt.status")}</th>
                <th>{t("ordermgmt.orderdate")}</th>
                <th>{t("ordermgmt.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((_, index) => (
                <tr key={index}>
                  <td>###</td>
                  <td>{t("ordermgmt.name")}</td>
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
