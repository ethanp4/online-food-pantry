import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditDetails.css'; // Importing CSS for styling
import { LoginContext } from "../components/TokenProvider";

const EditDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { token } = useContext(LoginContext)
  

  async function fetchItem() {
    const response = await fetch (`http://localhost:5001/item/${id}`);
    const data = await response.json();
    console.log(data)
    setProduct(data["item"]);
}

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDelete = async () => {
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
      navigate("/dashboard/products");
    } else {
      alert("Failed to delete the product");
      console.error("Error:", data);
    }
  }

  const handleSave = async () => {
    const response = await fetch(`http://localhost:5001/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Product updated successfully");
    } else {
      alert("Failed to update the product");
      console.error("Error:", data);
    }
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
          onChange={(e) => handleInputChange(e)}
        />

        <label>Cultural Preference:</label>
        <input
          type="text"
          name="cultural_preferences"
          value={product.cultural_preferences}
          onChange={(e) => handleInputChange(e)}
        />

        <label>Dietary Preference:</label>
        <input
          type="text"
          name="dietary_preferences"
          value={product.dietary_preferences}
          onChange={(e) => handleInputChange(e)}
        />

        <label>Category:</label>
        <input
          type="text"
          name="food_type"
          value={product.food_type}
          onChange={(e) => handleInputChange(e)}
        />

        <label>Stock:</label>
        <input
          type="number"
          name="count"
          value={product.count}
          onChange={(e) => handleInputChange(e)}
        />

        <label>Max per person:</label>
        <input
          type="number"
          name="max_per_person"
          min="-1"
          value={product.max_per_person}
          onChange={(e) => handleInputChange(e)}
        />

        <div className="edit-buttons">
          <button className="delete-btn" onClick={handleDelete}>Delete Item</button>
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
