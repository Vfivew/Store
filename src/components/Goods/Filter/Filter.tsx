import React from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import { setFilteredGoods } from "../../../store/slice/goodsSlice"; 

const Filter = () => {
  const goods = useAppSelector((state) => state.goods.data);
  const dispatch = useAppDispatch();

  const handleFilterClick = (key: any) => {
    console.log('handleFilterClick')
    dispatch(setFilteredGoods(key));
  };

  if (goods === null) {
    return <div>No goods here</div>;
  }

  const topLevelKeys = Object.keys(goods);
  return (
    <section className="filter-section">
      <ul>
        {topLevelKeys.map((key) => (
          <button key={key} onClick={() => handleFilterClick(key)}>
            {key}
          </button>
        ))}
      </ul>
    </section>
  );
};

export default Filter;
