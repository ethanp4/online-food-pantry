import React from 'react';

const orderManagement = ({ setCurrentPage }) => {
    return (
        <div>
            <h1>Order Management</h1>
            {/* Placeholder for Order Table */}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example row */}
                    <tr>
                        <td>001</td>
                        <td>Pending</td>
                    </tr>
                    {/* Add more orders as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default orderManagement;