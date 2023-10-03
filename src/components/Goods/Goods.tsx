import React from "react";
import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsData,setGoodsType } from "../../store/slice/goodsSlice";
import { useEffect } from "react";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar/NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsList from "../GoodsList/GoodsList";

const Goods = () => {
  const { itemId } = useParams();
  const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.filteredData);
  

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setGoodsData(data));
      dispatch(setGoodsType(data))
    } 
  }, [data, isLoading, isError, dispatch]);
  
  return (
    <main className="goods">
      <section className="goods-wrapper">
        <StatusDetermine isLoading={isLoading} isError={isError} data={data} />
          <section className="goods-title">
            <NavigationMiniBar routes={["Goods", itemId ? itemId : ""]} />
            <h2>{itemId}</h2>
          </section>
          <section className="goods-section">
            <Filter />
            <section className="goods-list-section">
              <section>Sort</section>
              <GoodsList goods={goods} />
            </section>
          </section>
      </section>
    </main>
  );
};

export default Goods;
