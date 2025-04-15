import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/TokenProvider";
import { useTranslation } from "react-i18next";
import "./DeliveryPage.css";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, setToken } = useContext(LoginContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  const getDeliveryOrders = async () => {
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
        // Filter only delivery type orders
        const deliveryTypeOrders = data.orders.filter(order => order.type === "delivery");
        setDeliveryOrders(deliveryTypeOrders);
        setFilteredOrders(deliveryTypeOrders);
      }
    } catch (error) {
      console.error("Error fetching delivery orders:", error);
    }
  };

  useEffect(() => {
    getDeliveryOrders();
  }, []);

  useEffect(() => {
    let filtered = deliveryOrders;

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
        order.status.toLowerCase().includes(searchTermLower) ||
        (order.address && order.address.toLowerCase().includes(searchTermLower))
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filter, deliveryOrders]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Update the local state
        const updatedOrders = deliveryOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setDeliveryOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Error updating delivery order status:", error);
    }
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
            <li><Link to="/dashboard/orders" className="non-active">{t("dashboard.orders")}</Link></li>
            <li><Link to="/dashboard/pickup-requests" className="non-active">{t("dashboard.pickup")}</Link></li>
            <li><Link to="/dashboard/delivery" className="active-text">{t("dashboard.delivery")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("deliverymgmt.title")}</h2>
        </header>

        {/* Delivery Requests Table */}
        <div className="content">
          <div className="delivery-header">
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-dropdown">
              <label>{t("deliverymgmt.filter")}:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">{t("deliverymgmt.all")}</option>
                <option value="Pending">{t("deliverymgmt.pending")}</option>
                <option value="Completed">{t("deliverymgmt.completed")}</option>
                <option value="Cancelled">{t("deliverymgmt.cancelled")}</option>
              </select>
            </div>
          </div>

          <table className="delivery-table">
            <thead>
              <tr>
                <th>{t("deliverymgmt.customerID")}</th>
                <th>{t("deliverymgmt.customername")}</th>
                <th>{t("deliverymgmt.numitems")}</th>
                <th>{t("deliverymgmt.deliveryDT")}</th>
                <th>{t("deliverymgmt.address")}</th>
                <th>{t("deliverymgmt.status")}</th>
                <th>{t("deliverymgmt.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.first_name} {order.last_name}</td>
                  <td>{order.items ? order.items.length : 0}</td>
                  <td>{formatDate(order.delivery_time)}</td>
                  <td>{order.address || "N/A"}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`status-select ${order.status.toLowerCase()}`}
                    >
                      <option value="Pending">{t("deliverymgmt.pending")}</option>
                      <option value="Completed">{t("deliverymgmt.completed")}</option>
                      <option value="Cancelled">{t("deliverymgmt.cancelled")}</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    {t("deliverymgmt.noOrders")}
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

export default DeliveryPage;
