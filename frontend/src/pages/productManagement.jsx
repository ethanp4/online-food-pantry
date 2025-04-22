import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider"; 
import "./productManagement.css"

const ProductManagement = () => {
  const { t, i18n } = useTranslation();
  const { token, setToken } = useContext(LoginContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5001/item");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product[`name_${i18n.language}`].toLowerCase().includes(searchTermLower) ||
        product.category?.toLowerCase().includes(searchTermLower) ||
        product.dietary_preferences?.toLowerCase().includes(searchTermLower) ||
        product.cultural_preferences?.toLowerCase().includes(searchTermLower) ||
        product.food_type?.toLowerCase().includes(searchTermLower) ||
        product.count?.toString().includes(searchTermLower)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // const toggleLanguage = () => {
  //   const newLang = i18n.language === "en" ? "fr" : "en";
  //   i18n.changeLanguage(newLang);
  // };

  // const handleLogout = () => {
  //   setToken("");
  //   navigate("/login");
  // };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5001/item/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    })
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Product deleted successfully");
    } else {
      alert("Failed to delete the product");
      console.error("Error:", data);
    }
  }

  const handleEditClick = (productId) => {
    navigate(`/dashboard/products/edit/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    handleDelete(productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>{t("dashboard.title")}</h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">{t("dashboard.dashboard")}</Link></li>
            <li className="menu-header">{t("dashboard.items")}</li>
            <li><Link to="/dashboard/products" className="active">{t("dashboard.products")}</Link></li>
            <li><Link to="/dashboard/orders">{t("dashboard.orders")}</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="header">
          <h2>{t("productmgmt.title")}</h2>
          {/* <div className="header-right">
            <button onClick={toggleLanguage} className="language-button">
              {i18n.language === "en" ? "Français" : "English"}
            </button>
            <button onClick={handleLogout} className="logout-button">
              {t("Logout")}
            </button>
          </div> */}
        </header>

        {/* Product Management Table */}
        <section className="admincontent">
          <div className="product-header">
            <input
              type="text"
              className="search-box"
              placeholder={t("searchBar")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button className="add-btn">+ {t("addItem")}</button> */}
          </div>

          <div className="table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("productmgmt.product")}</th>
                  <th>{t("productmgmt.category")}</th>
                  <th>{t("productmgmt.stock")}</th>
                  <th>{t("productmgmt.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product[`name_${i18n.language}`]}</td>
                    <td>{product[`food_type_${i18n.language}`]}</td>
                    <td>{product.count}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEditClick(product.id)}>
                        ✏️ {t("buttons.edit")}
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
                        🗑️ {t("buttons.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      {t("noItem")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>  
          
        </section>
      </main>
    </div>
  );
};

export default ProductManagement;
