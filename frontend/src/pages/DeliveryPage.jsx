import React, { useState } from "react";
import { Link } from "react-router-dom";
 import "./DeliveryPage.css";  

const DeliveryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard" className="non-active">Dashboard</Link></li>
            <li className="section-title">Items</li>
            <li className="section-title">Categories</li>
            <li><Link to="/dashboard/products" className="non-active">Products</Link></li>
            <li className="section-title">Requests</li>
            <li><Link to="/dashboard/orders" className="non-active">Orders</Link></li>
           
            <li><Link to="/dashboard/pickup-requests">Pickup Requests</Link></li>
            <li><Link to="/dashboard/delivery" className="non-active">Delivery</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="header">
          <h2>Pickup Request Management</h2>
          <div className="header-right">
            <button className="language-button">Fr/Eng</button>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        {/* Pickup Requests Table */}
        <div className="content">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <table className="Delivery-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>No. Of Items</th>
                <th>Delivery Date & Time</th>
                <th>Actions</th>
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
      </div>
    </div>
  );
};

export default DeliveryPage;
