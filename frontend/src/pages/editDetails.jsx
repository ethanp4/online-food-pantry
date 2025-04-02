import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditDetails.css'; // Importing CSS for styling

const EditDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: 0,
  });

  useEffect(() => {
    // Simulating fetching product details from an API or database
    setProduct({
      name: `Product Name ${productId}`,
      category: `Category ${productId}`,
      stock: 10,
    });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Product:", product);
    navigate("/dashboard/products"); // Redirect to product management after saving
  };

  return (
    <div className="edit-details-container">
      <header className="header">
        <button onClick={() => navigate("/dashboard/products")}>← Back</button>
        <h2>Edit Product</h2>
      </header>

      <div className="edit-form">
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleInputChange}
        />

        <div className="edit-buttons">
          <button className="delete-btn">Delete Item</button>
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
