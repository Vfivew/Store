import React, { useState, ChangeEvent } from 'react';
import { addGoods } from '../../Service/addGoods';
import  { deleteGoods } from '../../Service/deleteGoods'

const AddGoods = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleAdd = () => {
        addGoods(inputValue);
        console.log('add');
    };

    
    const handleDelete = () => {
        deleteGoods(inputValue);
        console.log('delete');
    };


    return (
        <div>
            <section>
                <h2>AddGoods</h2>
                    <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Введите слово на английском"
                />
                <button onClick={handleAdd}>click to add</button>
            </section>
            <section>
                <h2>DeleteGoods</h2>
                    <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Введите слово на английском"
                />
                <button onClick={handleDelete}>click to delete</button>
            </section>
        </div>
    );
};

export default AddGoods;
