import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery, useFetchDocumentDiscountGoodsQuery } from '../../../store/slice/fireStoreApi';
import { addDiscount } from '../../../Service/addDiscount';

const DeleteGoods = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const { data: discountData } = useFetchDocumentDiscountGoodsQuery(itemId, { skip });
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });
    console.log(discountData)
    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
        console.log(itemId);
    };

    const handleChoiseCategory = async (key: string) => {
        console.log(key);
        setActiveKey(key); 
    };

    const handleNestedButtonClick = (article: string) => {

        if (fetchedData && activeKey && fetchedData[activeKey] && discountData) {

            const updatedData = {
                ...discountData,
                [activeKey]: {
                    ...discountData[activeKey],
                    [article]: {
                        ...fetchedData[activeKey][article]
                    }
                }
            };

            addDiscount(updatedData, itemId);
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


    return (
        <section className="delete-category-section">
            <h2>Update discount goods</h2>
            <p>Choose discount goods</p>
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
