import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider"; 
const ProductManagement = () => {
  const { t, i18n } = useTranslation();
  const { setToken } = useContext(LoginContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Product Name 1", category: "Category 1", stock: 10 },
    { id: 2, name: "Product Name 2", category: "Category 2", stock: 10 },
    { id: 3, name: "Product Name 3", category: "Category 3", stock: 10 },
    { id: 4, name: "Product Name 4", category: "Category 4", stock: 10 },
    { id: 5, name: "Product Name 5", category: "Category 5", stock: 10 },
    { id: 6, name: "Product Name 6", category: "Category 6", stock: 10 },
  ]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  const handleEditClick = (productId) => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>{t("AdminPanel")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">{t("Dashboard")}</Link></li>
            <li className="menu-header">{t("Items")}</li>
            <li><Link to="/dashboard/products" className="active">{t("Products")}</Link></li>
            <li><Link to="/dashboard/orders">{t("Orders")}</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="header">
          <h2>{t("ProductManagement")}</h2>
          <div className="header-right">
            <button onClick={toggleLanguage} className="language-button">
              {i18n.language === "en" ? "Français" : "English"}
            </button>
            <button onClick={handleLogout} className="logout-button">
              {t("Logout")}
            </button>
          </div>
        </header>

        {/* Product Management Table */}
        <section className="content">
          <div className="product-header">
            <input
              type="text"
              className="search-box"
              placeholder={t("SearchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button className="add-btn">+ {t("addItem")}</button> */}
          </div>

          <table className="Product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("Product")}</th>
                <th>{t("Category")}</th>
                <th>{t("Stock")}</th>
                <th>{t("Actions")}</th>
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
                        ✏️ {t("edit")}
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
                        🗑️ {t("delete")}
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
