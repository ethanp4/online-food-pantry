import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/TokenProvider";
import { useTranslation } from "react-i18next";
import "./PickupRequestManagment.css";

const PickupRequestManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, setToken } = useContext(LoginContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [pickupRequests, setPickupRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  const getPickupRequests = async () => {
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
        // Filter only pickup type orders
        const pickupOrders = data.orders.filter(order => order.type === "pickup");
        setPickupRequests(pickupOrders);
        setFilteredRequests(pickupOrders);
      }
    } catch (error) {
      console.error("Error fetching pickup requests:", error);
    }
  };

  useEffect(() => {
    getPickupRequests();
  }, []);

  useEffect(() => {
    let filtered = pickupRequests;

    // Apply status filter
    if (filter !== "All") {
      filtered = filtered.filter(request => request.status.toLowerCase() === filter.toLowerCase());
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(request => 
        request.id.toString().includes(searchTermLower) ||
        request.first_name.toLowerCase().includes(searchTermLower) ||
        request.last_name.toLowerCase().includes(searchTermLower) ||
        request.status.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredRequests(filtered);
  }, [searchTerm, filter, pickupRequests]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/orders/${requestId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Update the local state
        const updatedRequests = pickupRequests.map(request => 
          request.id === requestId ? { ...request, status: newStatus } : request
        );
        setPickupRequests(updatedRequests);
      }
    } catch (error) {
      console.error("Error updating pickup request status:", error);
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
            <li><Link to="/dashboard/pickup-requests" className="active-text">{t("dashboard.pickup")}</Link></li>
            <li><Link to="/dashboard/delivery" className="non-active">{t("dashboard.delivery")}</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2>{t("pickupmgmt.title")}</h2>
        </header>

        {/* Pickup Requests Table */}
        <div className="content">
          <div className="pickup-header">
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-dropdown">
              <label>{t("pickupmgmt.filter")}:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">{t("pickupmgmt.all")}</option>
                <option value="Pending">{t("pickupmgmt.pending")}</option>
                <option value="Completed">{t("pickupmgmt.completed")}</option>
                <option value="Cancelled">{t("pickupmgmt.cancelled")}</option>
              </select>
            </div>
          </div>

          <table className="pickup-table">
            <thead>
              <tr>
                <th>{t("pickupmgmt.customerID")}</th>
                <th>{t("pickupmgmt.customername")}</th>
                <th>{t("pickupmgmt.numitems")}</th>
                <th>{t("pickupmgmt.pickupDT")}</th>
                <th>{t("pickupmgmt.status")}</th>
                <th>{t("pickupmgmt.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>{request.first_name} {request.last_name}</td>
                  <td>{request.items ? request.items.length : 0}</td>
                  <td>{formatDate(request.delivery_time)}</td>
                  <td>
                    <span className={`status-badge ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      className={`status-select ${request.status.toLowerCase()}`}
                    >
                      <option value="pending">{t("pickupmgmt.pending")}</option>
                      <option value="completed">{t("pickupmgmt.completed")}</option>
                      <option value="cancelled">{t("pickupmgmt.cancelled")}</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    {t("pickupmgmt.noRequests")}
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

export default PickupRequestManagement;
