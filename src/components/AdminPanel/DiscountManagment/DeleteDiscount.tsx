import { useState } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery, useFetchDocumentDiscountGoodsQuery } from '../../../store/slice/fireStoreApi';
import { deleteDiscount } from '../../../helpers/deleteDiscount';

const DeleteGoods = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData, isLoading:fetchLoading, isError:fetchError } = useFetchDocumentByIdQuery(itemId, { skip });
    const { data: discountData, isLoading:discountLoading, isError:discountError } = useFetchDocumentDiscountGoodsQuery(itemId, { skip });

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
    };

    const handleChoiseCategory = async (key: string) => {
        setActiveKey(key);
    };

    const handleNestedButtonClick = (article: string) => {
        if (fetchedData && activeKey && fetchedData[activeKey] && discountData) {
            const updatedData = {
                ...discountData,
                [activeKey]: Object.fromEntries(
                    Object.entries(discountData[activeKey]).filter(([key]) => key !== article)
                ),
            };
            deleteDiscount(updatedData, itemId);
        }
    };

    const renderNestedButtons = () => {
        if (discountData && activeKey && discountData[activeKey]) {
            const nestedObjects = discountData[activeKey];
            return Object.keys(nestedObjects).map((nestedKey, index) => (
                <button key={index} onClick={() => handleNestedButtonClick(nestedObjects[nestedKey].article)}>
                    {nestedObjects[nestedKey].name}
                </button>
            ));
        }
        return null;
    };

    if (isError || fetchError|| discountError) {
        return (
            <section className="delete-category-section">
                <p>There was a problem with the server. Please try again later or contact technical support.</p>
            </section>
        );
    }

    return (
        <section className="delete-category-section">
            <h2>Delete discount goods</h2>
            <p>Choose the goods for delete</p>
            {data &&
                data.map((item: any, index: number) => (
                    <button onClick={() => handleChoiseType(item.id)} key={index}>
                        {item.id}
                    </button>
                ))}
            <div className="add-category-exist-category">
                {discountData &&
                    Object.keys(discountData).map((key, index) => (
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
