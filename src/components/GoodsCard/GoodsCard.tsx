import { CardList } from "../../models/fireStoreModels";
import { useAppSelector } from "../../hooks/redux-hooks";

const GoodsCard = () => {
  const cardList:any = useAppSelector((state) => state.goods.data); 

  return (
    <section className="goods-card-section">
      {cardList &&
        Object.keys(cardList).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            <ul>
              {Object.keys(cardList[key]?.article || {}).map((articleKey) => (
                <li key={articleKey}>
                  <strong>{articleKey}:</strong> {cardList[key]?.article?.[articleKey]}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
};

export default GoodsCard;
