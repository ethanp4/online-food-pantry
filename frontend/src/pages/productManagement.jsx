import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditDetails from "./EditDetails"; // Corrected import

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Product Name 1", category: "Category 1", stock: 10 },
    { id: 2, name: "Product Name 2", category: "Category 2", stock: 10 },
    { id: 3, name: "Product Name 3", category: "Category 3", stock: 10 },
    { id: 4, name: "Product Name 4", category: "Category 4", stock: 10 },
    { id: 5, name: "Product Name 5", category: "Category 5", stock: 10 },
    { id: 6, name: "Product Name 6", category: "Category 6", stock: 10 },
  ]);
  const navigate = useNavigate();

  const handleEditClick = (productId) => {
    console.log(`Navigating to: /dashboard/products/edit/${productId}`);
    navigate(`/dashboard/products/edit/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    console.log(`Product ${productId} deleted`);
  };

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
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEditClick(product.id)}>
                        ✏️ Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
                        🗑️ Delete
                      </button>
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
