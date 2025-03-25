import React from 'react';

const EditDetails = ({ setCurrentPage }) => {
    return (
        <div>
            <h1>Edit Product Details</h1>
            <form>
                <label>Product Name:</label>
                <input type="text" placeholder="Enter product name" />
                <label>Category:</label>
                <input type="text" placeholder="Enter category" />
                <button type="submit">Save Changes</button>
                <button onClick={() => setCurrentPage('ProductManagement')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditDetails;