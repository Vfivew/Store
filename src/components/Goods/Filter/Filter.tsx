import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { setFilteredGoods,setActiveButton } from "../../../store/slice/goodsSlice"; 
import { setFilterMenuActive } from "../../../store/slice/mediaSlice";

const Filter = () => {
  const goods = useAppSelector((state) => state.goods.type);
  const filterMenuActive = useAppSelector((state) => state.media.filterMenuActive);
  const activeButton = useAppSelector((state) => state.goods.activeButton)
  const dispatch = useAppDispatch();
  
  const toggleSortMenu = () => {
    dispatch(setFilterMenuActive(!filterMenuActive))
  };

  const handleFilterClick = (key: string) => {
    dispatch(setActiveButton(key));
    dispatch(setFilteredGoods(key));
    dispatch(setFilterMenuActive(!filterMenuActive))
  };

  if (goods === null) {
    return  <section className={`filter-section ${filterMenuActive ? 'active' : ''}`}></section>
  }

  const topLevelKeys = Object.keys(goods);
  return (
    <>
      <button className="filter-button" onClick={toggleSortMenu}>
        Filter
      </button>
      <section className={`filter-section ${filterMenuActive ? 'active' : ''}`}>
        <ul className="filter-list">
          {topLevelKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleFilterClick(key)}
              className={activeButton === key ? "active" : ""}
            >
              {key}
            </button>
          ))}
            <button className="filter-close-button" onClick={toggleSortMenu}>
              Close
            </button>
        </ul>
        </section>
    </>
  );
};

export default Filter;
