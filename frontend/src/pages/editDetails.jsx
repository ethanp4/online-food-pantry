import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditDetails.css'; // Importing CSS for styling
import { LoginContext } from "../components/TokenProvider";
import { useTranslation } from "react-i18next";

const EditDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { token } = useContext(LoginContext)
  
  const [ metadata, setMetadata ] = useState({
    foodTypes: [],
    dietaryPreferences: [],
    culturalPreferences: []
  })

  async function fetchMetadata() {
    const response = await fetch (`http://localhost:5001/metadata`);
    const data = await response.json();
    console.log(data);
    setMetadata(data);
  }

  async function fetchItem() {
    const response = await fetch (`http://localhost:5001/item/${id}`);
    const data = await response.json();
    console.log(data["item"]);
    setProduct(data["item"]);
  }

  useEffect(() => {
    fetchItem();
    fetchMetadata();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
        <button onClick={() => navigate("/dashboard/products")}>← {t("buttons.back")}</button>
        <h2>{t("edit.title")}</h2>
      </header>

      <div className="edit-form">
        <label>{t("edit.productname")}:</label>
        <input
          type="text"
          name="name_en"
          required
          value={product.name_en}
          onChange={(e) => handleInputChange(e)}
        />

        <label>{t("edit.productnamefr")}:</label>
        <input
          type="text"
          name="name_fr"
          required
          value={product.name_fr}
          onChange={(e) => handleInputChange(e)}
        />

        <label>{t("edit.cultural")}:</label>
        <select
          name="cultural_preference_id"
          value={product.cultural_preference_id}
          onChange={(e) => handleInputChange(e)}
        >
          {metadata.culturalPreferences.length != 0 && <option value="">{t("edit.none")}</option>}
          {metadata.culturalPreferences.length == 0 ? <option value="">{t("edit.loading")}</option> : metadata.culturalPreferences.map((cultural) => (
            <option key={cultural.id} value={cultural.id}>{cultural[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <label>{t("edit.dietary")}:</label>
        <select
          name="dietary_preference_id"
          value={product.dietary_preference_id}
          onChange={(e) => handleInputChange(e)}
        >
          {metadata.dietaryPreferences.length != 0 && <option value="">{t("edit.none")}</option>}
          {metadata.dietaryPreferences.length == 0 ? <option value="">{t("edit.loading")}</option> : metadata.dietaryPreferences.map((dietary) => (
            <option key={dietary.id} value={dietary.id}>{dietary[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <label>{t("edit.category")}:</label>
        <select
          name="food_type_id"
          value={product.food_type_id}
          onChange={(e) => handleInputChange(e)}
        >
          {metadata.foodTypes.length != 0 && <option value="">{t("edit.none")}</option>}
          {metadata.foodTypes.length == 0 ? <option value="">{t("edit.loading")}</option> : metadata.foodTypes.map((foodType) => (
            <option key={foodType.id} value={foodType.id}>{foodType[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <label>{t("edit.stock")}:</label>
        <input
          type="number"
          name="count"
          min="0"
          value={product.count}
          onChange={(e) => handleInputChange(e)}
        />

        <label>{t("edit.maxperprsn")}:</label>
        <input
          type="number"
          name="max_per_person"
          min="-1"
          value={product.max_per_person}
          onChange={(e) => handleInputChange(e)}
        />

        <div className="edit-buttons">
          <button className="delete-btn" onClick={handleDelete}>{t("buttons.delete")}</button>
          <button className="save-btn" onClick={handleSave}>{t("buttons.save")}</button>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
