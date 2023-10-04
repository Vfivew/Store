import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { setFilteredGoods } from "../../../store/slice/goodsSlice"; 

const Filter = () => {
  const goods = useAppSelector((state) => state.goods.type);
  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [filterMenuActive, setFilterMenuActive] = useState<boolean>(false);

  const toggleSortMenu = () => {
    setFilterMenuActive(!filterMenuActive);
  };

  const handleFilterClick = (key: any) => {
    setActiveButton(key); 
    dispatch(setFilteredGoods(key));
    setFilterMenuActive(!filterMenuActive);
  };

  if (goods === null) {
    return <div>No goods here</div>;
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
