import { deleteGoodsType } from '../../../Service/deleteGoodsType'
import { useFetchDocumentsQuery } from '../../../store/slice/fireStoreApi';

const DeleteType = () => {
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");

    const handleDelete = (id: string) => {
        deleteGoodsType(id);
        console.log('delete');
    };

    return (
        <section>
            <h2>Delete Type</h2>
            {data && data.map((item: any, index: number) => (
                <button key={index} onClick={() => handleDelete(item.id)}>{item.id}</button>
            ))}
        </section>
    );
};

export default DeleteType;
