import React from 'react';

const orderManagement = () => {
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', status: 'Delivered' },
  ];

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default orderManagement;
