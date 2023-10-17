import React from "react";
import { useFetchDocumentByIdQuery, useFetchBasketQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsData,setGoodsType } from "../../store/slice/goodsSlice";
import { useEffect } from "react";
import { setSortData } from '../../store/slice/sortSlice';
import { setBasketItem } from "../../store/slice/basketSlise";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar/NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsList from "../GoodsList/GoodsList";
import Sort from "./Sort/Sort";

const Goods = () => {
  const { itemId } = useParams();
  const email = useAppSelector(state=> state.user.email)
  const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const { data:basketData, isLoading:basketLoading, isError:basketError } = useFetchBasketQuery(email);
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.filteredData);
  let allGoods: any[] = [];
  const transformedBasketData = basketData ? Object.values(basketData) : [];

  const arrayBasketData = Object.keys(transformedBasketData).map((key: any) => transformedBasketData[key]);

  console.log(arrayBasketData);

  if (goods) {
    Object.keys(goods).forEach((category) => {
      const categoryGoods = goods[category];
      Object.keys(categoryGoods).forEach((key) => {
        allGoods.push(categoryGoods[key]);
      });
    });
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setGoodsData(data));
      dispatch(setGoodsType(data))
      dispatch(setSortData(allGoods));
    } 
  }, [data, isLoading, isError, allGoods, dispatch]);

  useEffect(() => {
    if (!basketLoading && !basketError) {
      dispatch(setBasketItem(arrayBasketData))
      console.log('im set basket in goods')
    } 
  }, [basketData, basketLoading, basketError, dispatch]);
  
  return (
    <main className="goods">
      <section className="goods-wrapper">
        <StatusDetermine isLoading={isLoading} isError={isError} data={data} />
          <section className="goods-title">
             <NavigationMiniBar propsArray={['Goods', itemId]} />
          </section>
        <section className="goods-section">
          <section className="goods-filter-wrapper">
            <h2>{itemId}</h2>
            <Filter />
          </section>
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
