import { useState, ChangeEvent } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { addCategory } from '../../../Service/addCategory';

const AddCategory = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [article, setArticle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('')
    const [itemId, setItemId] = useState<string>('');
    const [skip, setSkip] = useState<boolean>(true);
    const [isExist, setExist] = useState<boolean>(false);
    const [characteristics, setCharacteristics] = useState<{ key: string; value: string }[]>([]);
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData, isLoading:fetchLoading, isError:fetchError } = useFetchDocumentByIdQuery(itemId, { skip });

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
    };

    const handleAdd = () => {
        if (!fetchedData) {
            return;
        }

        const found = Object.keys(fetchedData).find(key => key === inputValue);
        if (found) {
            setExist(true)
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
                        reviews: [],
                        rating:[],
                        ...characteristicsObject
                    }
                }
            };
            addCategory(newData, itemId);
        }
    };

    if (isError || fetchError) {
        return (
            <section className="delete-category-section">
                <p>There was a problem with the server. Please try again later or contact technical support.</p>
            </section>
        );
    }

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
                    {isExist && <p style={{ color: 'red' }}>Category {inputValue} already exists</p>} 
                </div>
            )}
        </section>
    );
};

export default AddCategory;
