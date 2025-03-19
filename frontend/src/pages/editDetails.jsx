import React, { useState } from 'react';

const editDetails = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);

  const handleSave = () => {
    alert('Changes saved');
  };

  const handleDelete = () => {
    alert('Product deleted');
  };

  return (
    <div className="edit-details">
      <h2>Edit Product Details</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete} className="delete">Delete</button>
    </div>
  );
};

export default editDetails;
