import React from 'react';

const productManagement = () => {
  const products = [
    { id: 1, name: 'Product A', category: 'Electronics', price: 100 },
    { id: 2, name: 'Product B', category: 'Clothing', price: 50 },
  ];

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default productManagement;
