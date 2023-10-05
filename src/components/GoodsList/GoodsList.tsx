import GoodsCard from "./GoodCards/GoodsCard";
import { useAppSelector } from '../../hooks/redux-hooks';

const GoodsList = () => {
  const allGoods = useAppSelector((state) => state.sort.allGoods);
  
  return (
    <section className="goods-card-section-list">
      {allGoods ? (
        allGoods.map((good:any, index:any) => (
          <div className="goods-card-section" key={index}>
            <GoodsCard
              name={good.name}
              img={good.img}
              price={good.price}
            />
          </div>
        ))
      ) : (
        <p>No goods available</p>
      )}
    </section>
  );
};

export default GoodsList;
