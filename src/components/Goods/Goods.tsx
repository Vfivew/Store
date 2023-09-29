import React from "react";
import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsData } from "../../store/slice/goodsSlice";
import { useEffect } from "react";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsCard from "../GoodsCard/GoodsCard";

const Goods = () => {
  const { itemId } = useParams();
  const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.data);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setGoodsData(data));
    }
  }, [data, isLoading, isError, dispatch]);

  return (
    <main>
      <StatusDetermine isLoading={isLoading} isError={isError} data={data} />
      <div>
        <NavigationMiniBar routes={["Goods", itemId ? itemId : ""]} />
      </div>
      <h2>{itemId}</h2>
      <section className="goods">
        <Filter />
        <section className="goods-section">
          <section>Sort</section>
          <GoodsCard goods={goods} />
        </section>
      </section>
    </main>
  );
};

export default Goods;
