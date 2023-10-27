import React, { useState, ChangeEvent, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../store/slice/fireStoreApi';
import { deleteCategory } from '../../Service/deleteCategory';
import { addCategory } from '../../Service/addCategory';


const AddGoodsCategory = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [skip, setSkip] = useState(true);
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const [itemId, setItemId] = useState<string>('')
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });
   

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId)
        setSkip(false);
        console.log(itemId); 
    };

    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleAdd = () => {
        if (!fetchedData) {
            console.log("Fetched data is null or undefined");
            return;
        }

        const found = Object.keys(fetchedData).find(key => key === inputValue);
        if (found) {
            console.log(`Data with name ${inputValue} already exists`);
        } else {
            const newData = {
                ...fetchedData,
                [inputValue]: {
                }
            };
            addCategory( newData, itemId );
            console.log("Add:", newData);
        }
    };

    const handleDelete = async (key: any) => {
        if (!fetchedData) {
            console.log("Fetched data is null or undefined");
            return;
        }

        const newData = { ...fetchedData };
        delete newData[key];
        await deleteCategory(newData, itemId);
        console.log("delete:", key);
    };

     return (
        <div className="add-goods-category-container">
            <section className="add-category-section">
                <h2>AddCategory</h2>
                <p>CHOISE TYPE OF PRODUCT to whom you want add Category</p>
                {data && data.map((item: any, index: number) => (
                    <button
                        onClick={() => handleChoiseType(item.id)}
                        key={index}>
                        {item.id}
                    </button>
                ))}
                {
                fetchedData &&
                Object.keys(fetchedData).map((key, index) => (
                    <div key={index}>{key}</div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    className="input-field"
                />
                <button onClick={handleAdd} className="add-button">Add</button>
            </section>
            <section className="delete-category-section">
                <h2>DeleteCategory</h2>
                <p>CHOISE TYPE OF PRODUCT</p>
                {data && data.map((item: any, index: number) => (
                    <button
                        onClick={() => handleChoiseType(item.id)}
                        key={index}>
                        {item.id}
                    </button>
                ))}
                {
                fetchedData &&
                Object.keys(fetchedData).map((key, index) => (
                    <button
                        onClick={()=>handleDelete(key)}
                        key={index} className="delete-button">{key}</button>
                ))}
            </section>
        </div>
    );
};

export default AddGoodsCategory;
