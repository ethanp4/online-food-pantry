import React, { useState } from "react";
// import "./ProductManagement.css"; // Add styling for Product Management page

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="admin-container">
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
        {/* Topbar */}
        <header className="header">
          <h2>Product Management</h2>
          <div className="header-right">
            <button className="language-button">Fr/Eng</button>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        {/* Product Management Table */}
        <div className="content">
          <div className="product-header">
            <input
              type="text"
              placeholder="Search for a product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-btn">Add Item</button>
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
                  <td>#</td>
                  <td className="actions">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
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

export default ProductManagement;
