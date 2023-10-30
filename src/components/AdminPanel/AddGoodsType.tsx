import React, { useState, ChangeEvent } from 'react';
import { addGoodsType } from '../../Service/addGoodsType';
import { deleteGoodsType } from '../../Service/deleteGoodsType'
import { useFetchDocumentsQuery } from '../../store/slice/fireStoreApi';

const AddGoodsType = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleAdd = () => {
        addGoodsType(inputValue);
        console.log('add');
    };
    
    const handleDelete = (id: string) => {
        deleteGoodsType(id);
        console.log('delete');
    };

    return (
        <div className='add-goods-category-container '>
            <section>
                <h2>AddGoods</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter the name"
                />
                <button onClick={handleAdd}>Click to add</button>
            </section>
            <section>
                <h2>DeleteGoods</h2>
                {data && data.map((item: any, index: number) => (
                    <button key={index} onClick={() => handleDelete(item.id)}>{item.id}</button>
                ))}
            </section>
        </div>
    );
};

export default AddGoodsType;
