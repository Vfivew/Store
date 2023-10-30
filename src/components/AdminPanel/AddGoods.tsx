import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../store/slice/fireStoreApi';

const AddGoodsCategory = () => {
    const [skip, setSkip] = useState(true);
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const [itemId, setItemId] = useState<string>('');
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<Record<string, string>>({});

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
        console.log(itemId);
    };

    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleDelete = async (key: any) => {

    };

    const handleCreateInput = (key: string) => {
        if (fetchedData && fetchedData[key] && fetchedData[key].article) {
            setActiveKey(key);
            const foundObject = fetchedData[key].article;
            if (typeof foundObject === 'object' && foundObject !== null) {
                const keysArray = Object.keys(foundObject).filter(key => key !== "rating" && key !== "reviews");
                console.log(keysArray);
            } else {
                console.log("The found object is not an object or is null");
            }
        } else {
            console.log("fetchedData, fetchedData[key], or fetchedData[key].article is undefined or null");
        }
    };

    const renderInputs = (keysArray: string[]) => {
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

const handleAddToConsole = () => {
    const valuesAreFilled = Object.values(inputValues).every(value => value && value.trim() !== '' && value !== undefined);
    console.log(inputValues)
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
            const newObject = { [inputValues['article']]: filteredValues };
            console.log(newObject);
        } else {
            console.log('article is undefined or empty');
        }
    } else {
        console.log('Please fill in all fields');
    }
};







    return (
        <div className="add-goods-category-container">
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
                    {fetchedData &&
                        Object.keys(fetchedData).map((key, index) => (
                            <div key={index}>
                                <button onClick={() => handleCreateInput(key)} className="delete-button">
                                    {key}
                                </button>
                            </div>
                        ))}
                </div>
                {activeKey && fetchedData && fetchedData[activeKey] && fetchedData[activeKey].article ? (
                    <div className="add-category-exist-category">
                        {renderInputs(Object.keys(fetchedData[activeKey].article).filter(key => key !== "rating" && key !== "reviews"))}
                        <button onClick={handleAddToConsole}>Add to Console</button>
                    </div>
                ) : null}
            </section>
            <section className="delete-category-section">
                <h2>Delete goods</h2>
                <p>Choose the type an category which you want to delete</p>
                {data &&
                    data.map((item: any, index: number) => (
                        <button onClick={() => handleChoiseType(item.id)} key={index}>
                            {item.id}
                        </button>
                    ))}
                <div className="add-category-exist-category">
                    {fetchedData &&
                        Object.keys(fetchedData).map((key, index) => (
                            <button onClick={() => handleDelete(key)} key={index} className="delete-button">
                                {key}
                            </button>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default AddGoodsCategory;
