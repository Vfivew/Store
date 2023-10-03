import React from "react";
import GoodsCard from "./GoodCards/GoodsCard";
import { GoodsKind } from "../../models/fireStoreModels";

type GoodsListProps = {
  goods: GoodsKind | null | undefined;
};

const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  console.log(goods)
  return (
    <section className="goods-card-section">
      {goods &&
        Object.keys(goods).map((key) => (
          
          <div className="goods-card-section-list" key={goods[key].article.article}>
            <GoodsCard
              name={goods[key]?.article?.name || ""}
              img={goods[key]?.article?.img || ""}
              price={goods[key]?.article?.price || ""}
            />
          </div>
        ))}
    </section>
  );
};

export default GoodsList;
