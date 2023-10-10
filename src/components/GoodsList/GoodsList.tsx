import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import GoodsCard from "./GoodCards/GoodsCard";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { setSortType } from "../../store/slice/sortSlice";
import {Link} from "react-router-dom"

const GoodsList = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const allGoods = useAppSelector((state) => state.sort.allGoods);
  const activeButton = useAppSelector((state) => state.sort.activeButton);

  useEffect(() => {
    if (activeButton !==null) {
      dispatch(setSortType(activeButton));
    }
  }, [allGoods, dispatch]);

  return (
    <section className="goods-card-section-list">
      {allGoods ? (
        allGoods.map((good:any) => (
        <Link
          className="goods-card-section"
          key={good.article}
          to={`/goods/${itemId}/${good.article}`} 
        >
          <GoodsCard
            name={good.name}
            img={good.img}
            price={good.price}
          />
        </Link>
        ))
      ) : (
        <p>No goods available</p>
      )}
    </section>
  );
};

export default GoodsList;
