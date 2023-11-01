import React, { useState, ChangeEvent } from 'react';
import { addGoodsType } from '../../../Service/addGoodsType';


const AddType = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleAdd = () => {
        addGoodsType(inputValue);
    };

    return (
        <section>
            <h2>Add Type</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter the name"
            />
            <button onClick={handleAdd} className='final-add-button'>Add</button>
        </section>
    );
};

export default AddType;
