import {useEffect} from "react";
import GoodsCard from "./GoodCards/GoodsCard";
import { GoodsKind } from "../../models/fireStoreModels";
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {setSortData} from '../../store/slice/sortSlice'

type GoodsListProps = {
  goods: GoodsKind | null | undefined;
};

const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  const dispatch = useAppDispatch();
  console.log(goods);
  const allGoods: { [key: string]: any } = {};

  if (goods) {
    Object.keys(goods).forEach((category) => {
      const categoryGoods = goods[category];
      Object.keys(categoryGoods).forEach((key) => {
        allGoods[key] = categoryGoods[key];
      });
    });
  } 

  useEffect(() => {
    if (allGoods) {
      dispatch(setSortData(allGoods));
    } 
  }, [allGoods, dispatch]);

  return (
    <section className="goods-card-section-list">
      {Object.keys(allGoods).map((key) => (
        <div className="goods-card-section" key={key}>
          <GoodsCard
            name={allGoods[key].name} 
            img={allGoods[key].img}
            price={allGoods[key].price}
          />
        </div>
      ))}
    </section>
  );
};

export default GoodsList;
