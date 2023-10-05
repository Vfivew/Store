import React from "react";
import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsData,setGoodsType } from "../../store/slice/goodsSlice";
import { useEffect } from "react";
import { setSortData } from '../../store/slice/sortSlice';

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar/NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsList from "../GoodsList/GoodsList";
import Sort from "./Sort/Sort";

const Goods = () => {
  const { itemId } = useParams();
  const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.filteredData);

  let allGoods: any[] = [];

  if (goods) {
    console.log(goods)
    Object.keys(goods).forEach((category) => {
      const categoryGoods = goods[category];
      Object.keys(categoryGoods).forEach((key) => {
        allGoods.push(categoryGoods[key]);
      });
    });
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log('GoodsEffect')
      dispatch(setGoodsData(data));
      dispatch(setGoodsType(data))
      dispatch(setSortData(allGoods));
    } 
  }, [data, isLoading, isError, dispatch, allGoods]);
  
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
              <Sort/>
              <GoodsList/>
            </section>
          </section>
      </section>
    </main>
  );
};

export default Goods;
