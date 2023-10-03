import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { setFilteredGoods } from "../../../store/slice/goodsSlice"; 

const Filter = () => {
  const goods = useAppSelector((state) => state.goods.type);
  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  const handleFilterClick = (key: any) => {
    setActiveButton(key); 
    dispatch(setFilteredGoods(key));
  };

  if (goods === null) {
    return <div>No goods here</div>;
  }

  const topLevelKeys = Object.keys(goods);
  return (
    <section className="filter-section">
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
      </ul>
    </section>
  );
};

export default Filter;
