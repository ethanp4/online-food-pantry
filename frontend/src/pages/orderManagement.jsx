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
  const [filteredOrders, setFilteredOrders] = useState([]);

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
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Apply status filter
    if (filter !== "All") {
      filtered = filtered.filter(order => order.status.toLowerCase() === filter.toLowerCase());
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchTermLower) ||
        order.first_name.toLowerCase().includes(searchTermLower) ||
        order.last_name.toLowerCase().includes(searchTermLower) ||
        order.type.toLowerCase().includes(searchTermLower) ||
        order.status.toLowerCase().includes(searchTermLower) ||
        (order.address && order.address.toLowerCase().includes(searchTermLower))
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filter, orders]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handlePrintOrder = (order) => {
    // TODO: Implement print functionality
    console.log("Printing order:", order);
  };

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
            <div className="filter-dropdown">
              <label>{t("ordermgmt.filter")}:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">{t("ordermgmt.all")}</option>
                <option value="pending">{t("ordermgmt.active")}</option>
                <option value="completed">{t("ordermgmt.completed")}</option>
                <option value="cancelled">{t("ordermgmt.cancelled")}</option>
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
                <th>{t("ordermgmt.type")}</th>
                <th>{t("ordermgmt.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.first_name} {order.last_name}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{formatDate(order.time_created)}</td>
                  <td>{order.type}</td>
                  <td className="actions">
                    <button 
                      className="print-btn" 
                      onClick={() => handlePrintOrder(order)}
                      title={t("ordermgmt.print")}
                    >
                      🖨️
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    {t("ordermgmt.noOrders")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
