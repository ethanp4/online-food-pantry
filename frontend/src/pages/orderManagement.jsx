import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./orderManagement.css"; 

const orderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard" className="non-active">Dashboard</Link></li>
            <li className="section-title">Items</li>
            <li><Link to="/dashboard/categories" className="non-active">Categories</Link></li>
            <li><Link to="/dashboard/products" className="non-active">Products</Link></li>
            <li className="section-title">Requests</li>
            <li><Link to="/dashboard/orders" className="active-text">Orders</Link></li>
            <li><Link to="/dashboard/pickup" className="non-active">Pickup</Link></li>
            <li><Link to="/dashboard/delivery" className="non-active">Delivery</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="header">
          <h2>Admin Dashboard</h2>
          <div className="header-right">
            <button className="language-button">Fr/Eng</button>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        {/* Order Management Table */}
        <div className="content">
          <div className="order-header">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-dropdown">
              <label>Filter By:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th>Delivery ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>###</td>
                  <td>Name</td>
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

export default orderManagement;
