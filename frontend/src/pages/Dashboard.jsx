import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./Dashboard.css";


import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalPendingOrders: 0,
    mostRecentOrder: "",
  });

  const [disableUntil, setDisableUntil] = useState("2025-02-27");

  // Fetch statistics from backend
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

  // Handle Logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  // Handle Order Disable Date Change
  const handleDateChange = (event) => {
    setDisableUntil(event.target.value);
  };

  // Handle Confirm Order Disable
  const confirmOrderDisable = () => {
    console.log("Orders disabled until:", disableUntil);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><strong>Items</strong></li>
            <li><Link to="/dashboard/products">Products</Link></li>
            <li><Link to="/dashboard/orders">Orders</Link></li>
            <li><Link to="/dashboard/pickup-requests">Pickup Requests</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h2>Admin Dashboard</h2>
          <div className="header-right">
            <button className="language-button">Fr/Eng</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <Outlet />

        {/* Content */}
        <div className="content">
          {/* This will load the nested components (Products, Orders, Pickup Requests) */}
          <Outlet />

          {/* Order Disable Section */}
          <div className="order-control">
            <label>Disable new orders until:</label>
            <input type="date" value={disableUntil} onChange={handleDateChange} />
            <button className="confirm-button" onClick={confirmOrderDisable}>Confirm</button>
          </div>

          {/* Statistics Section */}
          <div className="stats">
            <h3>Statistics Overview</h3>
            <div className="stats-item"><span>Total Users: </span> <strong>{stats.totalUsers}</strong></div>
            <div className="stats-item"><span>Total Items: </span> <strong>{stats.totalItems}</strong></div>
            <div className="stats-item"><span>Total Pending Orders: </span> <strong>{stats.totalPendingOrders}</strong></div>
            <div className="stats-item"><span>Most Recent Order: </span> <strong>{stats.mostRecentOrder}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
