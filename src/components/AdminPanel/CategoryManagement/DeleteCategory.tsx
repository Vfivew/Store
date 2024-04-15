import { useState } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { deleteCategory } from '../../../service/deleteCategory';

const DeleteCategory = () => {
    const [skip, setSkip] = useState<boolean>(true);
     const [itemId, setItemId] = useState<string>('')
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData, isLoading:fetchLoading, isError:fetchError } = useFetchDocumentByIdQuery(itemId, { skip });

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId)
        setSkip(false);

    };

    const handleDelete = async (key: any) => {
        if (!fetchedData) {
            return;
        }

        const newData = { ...fetchedData };
        delete newData[key];
        await deleteCategory(newData, itemId);
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
            <h2>Delete Category</h2>
            <p>Select the goods of product from which you want to remove the category, and then click on the category you wish to delete."</p>
            {data && data.map((item: any, index: number) => (
                <button
                    onClick={() => handleChoiseType(item.id)}
                    key={index}>
                    {item.id}
                </button>
            ))}
            <div className='add-category-exist-category'>
                {fetchedData &&
                Object.keys(fetchedData).map((key, index) => (
                    <button
                        onClick={()=>handleDelete(key)}
                        key={index} className="delete-button">{key}</button>
                ))}
            </div>
        </section>
    );
};

export default DeleteCategory;
