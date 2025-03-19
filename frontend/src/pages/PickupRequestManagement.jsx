import React from 'react';

const PickupRequestManagement = () => {
  const requests = [
    { id: 1, customer: 'Alex', status: 'Requested' },
    { id: 2, customer: 'Sam', status: 'Completed' },
  ];

  return (
    <div className="pickup-request-management">
      <h2>Pickup Request Management</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.customer}</td>
              <td>{request.status}</td>
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

export default PickupRequestManagement;
