import { Link } from "react-router-dom";

import GoodsCard from "../GoodsList/GoodCards/GoodsCard";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { setToogleModal } from "../../store/slice/basketSlise";
import { addBasketItem } from "../../store/slice/basketSlise";
import { updateBasket } from "../../helpers/updateBasket";
import { removeDesireItem } from "../../store/slice/desireSlice";
import { deleteDesireItem } from "../../helpers/updateDesire";

const Desire = () => {
  const dispatch = useAppDispatch();
  const desire = useAppSelector((state) => state.desire.desire);
  const email = useAppSelector((state) => state.user.email);

  const handleDeleteDesire = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    dispatch(removeDesireItem(item));
    if (email) {
      deleteDesireItem({ article: item[0].article, email });
    }
  };

  const handleAddToCart = (item: any) => {
    dispatch(setToogleModal());
    dispatch(addBasketItem({ quantity: 1, item: item[0], itemId: item[1] }));
    if (email) {
      updateBasket({
        quantity: 1,
        item: item[0],
        itemId: item[1],
        email: email,
      });
    }
  };

  return (
    <main className="desire-main">
      <h2>Desire list</h2>
      <div className="desire-wrapper">
        <section className="desire-block">
          {desire.map((item, index) => {
            if (Array.isArray(item)) {
              const obj = item.find((elem) => typeof elem === "object");
              if (obj) {
                return (
                  <Link
                    className="goods-card-section"
                    key={obj.name}
                    to={`/goods/${item[1]}/${obj.article}`}
                  >
                    <GoodsCard
                      key={index}
                      name={obj.name}
                      img={obj.img}
                      price={obj.price}
                    />
                    <div className="desite-buttons-block">
                      <button
                        className="desire-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        Buy
                      </button>
                      <button
                        className="desire-button"
                        onClick={(e) => handleDeleteDesire(e, item)}
                      >
                        Delete desire
                      </button>
                    </div>
                  </Link>
                );
              }
            }
            return null;
          })}
        </section>
      </div>
    </main>
  );
};

export default Desire;
