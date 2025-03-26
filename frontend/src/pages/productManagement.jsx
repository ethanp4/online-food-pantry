import React, { useState } from "react";
import { Link } from "react-router-dom";
 import "./productManagement.css"; // Importing the CSS file

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li className="menu-header">Items</li>
            <li><Link to="/dashboard/products" className="active">Products</Link></li>
            <li><Link to="/dashboard/orders">Orders</Link></li>
            <li><Link to="/dashboard/pickup-requests">Pickup Requests</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="header">
          <h2>Product Management</h2>
          <div className="header-right">
            <button className="language-button">Fr/Eng</button>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        {/* Product Management Table */}
        <section className="content">
          <div className="product-header">
            <input
              type="text"
              className="search-box"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-btn">+ Add Item</button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>Product Name</td>
                  <td>Category</td>
                  <td>10</td>
                  <td className="actions">
                    <button className="edit-btn">✏️ Edit</button>
                    <button className="delete-btn">🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ProductManagement;
