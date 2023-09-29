import { GoodsKind } from "../../models/fireStoreModels";

const GoodsCard = ({ goods }: { goods: GoodsKind | null | undefined}) => {
  return (
    <section className="goods-card-section">
      {goods &&
        Object.keys(goods).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            <ul>
              {Object.keys(goods[key]?.article || {}).map((articleKey) => (
                <li key={articleKey}>
                  <strong>{articleKey}:</strong> {goods[key]?.article?.[articleKey]}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
};

export default GoodsCard;
