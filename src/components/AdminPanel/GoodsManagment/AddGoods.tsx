import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { addCategory } from '../../../Service/addCategory';

const AddGoods = () => {
    const [skip, setSkip] = useState(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [characteristicArray, setCharacteristicArray] = useState<string[]>([]);
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);

    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData, isLoading:fetchLoading, isError:fetchError } = useFetchDocumentByIdQuery(itemId, { skip });

    useEffect(() => {
        if (!skip && fetchedData) {
        }
    }, [fetchedData, skip]);

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
    };

    const handleCreateInput = (key: string) => {
        if (fetchedData && fetchedData[key]) {
            setActiveKey(key);
            const foundObject = Object.values(fetchedData[key]).find(item => typeof item === 'object' && item !== null);
            if (typeof foundObject === 'object' && foundObject !== null) {
                const keysArray = Object.keys(foundObject).filter(key => key !== "rating" && key !== "reviews");
                console.log(keysArray);
                setCharacteristicArray(keysArray)
                const newInputValues = { ...inputValues };
                keysArray.forEach(dynamicKey => {
                    if (!newInputValues[dynamicKey]) {
                        newInputValues[dynamicKey] = ''; 
                    }
                });
                setInputValues(newInputValues);
                console.log(newInputValues)
            } 
        } 
    };

    const handleAddGood = () => {
        const valuesAreFilled = Object.values(inputValues).every(value => value && value.trim() !== '' && value !== undefined);
        
        if (valuesAreFilled) {
            if (inputValues['article']) {
                const filteredValues = Object.keys(inputValues).reduce((obj: Record<string, string>, key) => {
                    if (key === 'article') {
                        obj[key] = inputValues[key];
                    } else {
                        obj[key] = inputValues[key];
                    }
                    return obj;
                }, {});
                const newObject = { [inputValues['article']]: { ...filteredValues, rating: [], reviews: [] } };//new
                console.log(newObject);

                if (activeKey) {
                    const newFetchedData = { ...fetchedData };
                    if (newFetchedData[activeKey]) {
                        newFetchedData[activeKey] = { ...newFetchedData[activeKey], ...newObject };
                    } else {
                        newFetchedData[activeKey] = { ...newObject };
                    }
                    addCategory(newFetchedData, itemId)
                }
            }
            setIsFieldsFilled(true)
        } else {
            setIsFieldsFilled(false);
        }
    };

    const renderInputs = (keysArray: string[]) => {
        console.log(keysArray)
        return keysArray.map((key, index) => {
            return (
                <div key={index}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        onChange={(e) => {
                            setInputValues((prev) => ({ ...prev, [key]: e.target.value }));
                        }}
                    />
                </div>
            );
        });
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
            <h2>Add goods</h2>
            <p>Choose the type an category which you want to add</p>
            {data &&
                data.map((item: any, index: number) => (
                    <button onClick={() => handleChoiseType(item.id)} key={index}>
                        {item.id}
                    </button>
                ))}
            <div className="add-category-exist-category">
                <div className='category-wrapper'>
                    {fetchedData &&
                    Object.keys(fetchedData).map((key, index) => (
                        <div key={index}>
                            <button onClick={() => handleCreateInput(key)} className="delete-button">
                                {key}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
           {activeKey && fetchedData && fetchedData[activeKey] ? (
                <div className="add-category-exist-category">
                    {renderInputs(characteristicArray)}
                    <button className='final-add-button' onClick={handleAddGood}>Add</button>
                </div>
            ) : null}
            {!isFieldsFilled && <p style={{ color: 'red' }}>Please fill in all fields</p>}
        </section>
    );
};

export default AddGoods;
