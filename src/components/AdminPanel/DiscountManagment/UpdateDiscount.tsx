import React from 'react';
import AddDiscount from './AddDiscount';
import DeleteDiscount from './DeleteDiscount';

const UpdateDiscount = () => {
    return (
        <div className="add-goods-category-container">
            <AddDiscount />
            <DeleteDiscount/>
        </div>
    );
};

export default UpdateDiscount;