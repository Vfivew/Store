import { useState } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { deleteCategory } from '../../../Service/deleteCategory';

const DeleteGoods = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData, isLoading:fetchLoading, isError:fetchError } = useFetchDocumentByIdQuery(itemId, { skip });

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
    };

    const handleChoiseCategory = async (key: string) => {
        setActiveKey(key); 
    };

    const handleNestedButtonClick = (article: string) => {
        if (fetchedData && activeKey && fetchedData[activeKey]) {
            const updatedData = {
                ...fetchedData,
                [activeKey]: {
                    ...fetchedData[activeKey]
                }
            };
            delete updatedData[activeKey][article];
            deleteCategory(updatedData, itemId)
        }
    };

    const renderNestedButtons = () => {
        if (fetchedData && activeKey && fetchedData[activeKey]) {
            const nestedObjects = fetchedData[activeKey];
            return Object.keys(nestedObjects).map((nestedKey, index) => (
                <button key={index} onClick={() => handleNestedButtonClick(nestedObjects[nestedKey].article)}>
                    {nestedObjects[nestedKey].name}
                </button>
            ));
        }
        return null;
    };

    if (isError || fetchError) {
        return (
            <section className="delete-category-section">
                <p>There was a problem with the server. Please try again later or contact technical support.</p>
            </section>
        );
    }

    return (
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
                        <button onClick={() => handleChoiseCategory(key)} key={index} className="delete-button">
                            {key}
                        </button>
                    ))}
            </div>
            <div>{renderNestedButtons()}</div>
        </section>
    );
};

export default DeleteGoods;
