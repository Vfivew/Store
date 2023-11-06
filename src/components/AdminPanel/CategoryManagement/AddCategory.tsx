import { useState, ChangeEvent, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { addCategory } from '../../../Service/addCategory';

const AddCategory = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [article, setArticle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('')
    const [characteristics, setCharacteristics] = useState<{ key: string; value: string }[]>([]);
    const [skip, setSkip] = useState(true);
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const [itemId, setItemId] = useState<string>('');
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });

    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setArticle(e.target.value);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    };

    const handleCharacteristicsChange = (index: number, key: string, value: string) => {
        const updatedCharacteristics = [...characteristics];
        updatedCharacteristics[index] = { key, value };
        setCharacteristics(updatedCharacteristics);
    };

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, { key: '', value: '' }]);
    };

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
        console.log(itemId);
    };

    const handleAdd = () => {
        if (!fetchedData) {
            console.log("Fetched data is null or undefined");
            return;
        }

        const found = Object.keys(fetchedData).find(key => key === inputValue);
        if (found) {
            console.log(`Data with name ${inputValue} already exists`);
        } else {
            const characteristicsObject = Object.fromEntries(characteristics.map(item => [item.key, item.value]));
            const newData = {
                ...fetchedData,
                [inputValue]: {
                    [article]: {
                        price: price,
                        name: name,
                        article: article,
                        img: image,
                        reviews: [],//new
                        rating:[],//new
                        ...characteristicsObject
                    }
                }
            };
            addCategory(newData, itemId);
            console.log("Add:", newData);
        }
    };

    return (
        <section className="add-category-section">
            <h2>Add Category</h2>
            <p>Choose the goods of product to which you want to add a product category</p>
            {data && data.map((item: any, index: number) => (
                <button
                    onClick={() => handleChoiseType(item.id)}
                    key={index}>
                    {item.id}
                </button>
            ))}
            {fetchedData && (
                <div>
                    <input
                        placeholder='Enter the name of Category'
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <p>Add first goods of category</p>
                    <input
                        placeholder='Enter article'
                        type="text"
                        value={article}
                        onChange={handleArticleChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Enter price'
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Enter name'
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Enter image reference'
                        type="text"
                        value={image}
                        onChange={handleImageChange}
                        className="input-field"
                    />
                    {characteristics.map((characteristic, index) => (
                        <div key={index}>
                            <input
                                placeholder='Enter characteristic key'
                                type="text"
                                value={characteristic.key}
                                onChange={(e) => handleCharacteristicsChange(index, e.target.value, characteristic.value)}
                                className="input-field"
                            />
                            <input
                                placeholder='Enter characteristic value'
                                type="text"
                                value={characteristic.value}
                                onChange={(e) => handleCharacteristicsChange(index, characteristic.key, e.target.value)}
                                className="input-field"
                            />
                        </div>
                    ))}
                    <button onClick={handleAddCharacteristic} className="add-button">Add more characteristics</button>
                    <button onClick={handleAdd} className='final-add-button'>Add</button>
                </div>
            )}
        </section>
    );
};

export default AddCategory;
