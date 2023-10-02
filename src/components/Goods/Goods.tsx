import React from "react";
import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsFilter, setDataFromServer } from "../../store/slice/goodsSlice";
import { useEffect } from "react";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsCard from "../GoodsCard/GoodsCard";

const Goods = () => {
  const { itemId }  = useParams();
  const { data:filter, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const dispatch = useAppDispatch();
  const cardList = useAppSelector((state) => state.goods.filter);    
  console.log(cardList)

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setGoodsFilter(filter));
    }
    console.log(filter)
    if (!cardList) {
      dispatch(setDataFromServer(cardList))
    }
  }, [filter, isLoading, isError, dispatch]);

  return (
    <main>
      <StatusDetermine isLoading={isLoading} isError={isError} data={filter} />
      <div>
        <NavigationMiniBar routes={["Goods", itemId ? itemId : ""]} />
      </div>
      <h2>{itemId}</h2>
      <section className="goods">
        <Filter itemId={itemId || ""} />
        <section className="goods-section">
          <section>Sort</section>
          <GoodsCard />
        </section>
      </section>
    </main>
  );
};

export default Goods;
