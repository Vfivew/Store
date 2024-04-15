import { deleteGoodsType } from "../../../service/deleteGoodsType";
import { useFetchDocumentsQuery } from "../../../store/slice/fireStoreApi";

const DeleteType = () => {
  const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");

  const handleDelete = (id: string) => {
    deleteGoodsType(id);
  };

  return (
    <section>
      <h2>Delete type</h2>
      {isError ? (
        <p>
          There was a problem with the server. Please try again later or contact
          technical support.
        </p>
      ) : (
        data &&
        data.map((item: any, index: number) => (
          <button key={index} onClick={() => handleDelete(item.id)}>
            {item.id}
          </button>
        ))
      )}
    </section>
  );
};

export default DeleteType;
