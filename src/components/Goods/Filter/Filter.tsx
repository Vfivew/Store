import {useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { useFetchDocumentsByItemIdAndTypeQuery } from '../../../store/slice/fireStoreApi'
import { setDataFromServer } from "../../../store/slice/goodsSlice";

const Filter = ({ itemId }: { itemId: string }) => {
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
  const [type, setType] = useState<string>('')
  const filter = useAppSelector((state) => state.goods.filter);
 
  const dispatch = useAppDispatch();

  const { data , isError, isLoading } = useFetchDocumentsByItemIdAndTypeQuery(
    { itemId, type },
    { skip: !isQueryEnabled },
  );

  useEffect(() => {
    if (data) {
      console.log(data)
      dispatch(setDataFromServer(data));
    }
  }, [data, dispatch]); 

  if (filter === null) {
    return <div>No filter here</div>;
  }

  const filterChange = (key: string) => {
    setType(key);
    if (itemId && type) {
      setIsQueryEnabled(true);
    }
  };
  
  const topLevelKeys = Object.keys(filter);
  return (
    <section className="filter-section">
    <ul>
      {topLevelKeys.map((key) => (
        <button key={key} onClick={() => filterChange(key)}>
          {key}
        </button>
      ))}
    </ul>
    </section>
  );
};

export default Filter;
