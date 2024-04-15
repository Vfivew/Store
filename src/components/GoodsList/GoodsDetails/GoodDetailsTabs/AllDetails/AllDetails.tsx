import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../hooks/redux-hooks";
import { updateBasket } from "../../../../../service/updateBasket";
import { addDesireItem } from "../../../../../store/slice/desireSlice";
import { updateDesire } from "../../../../../service/updateDesire";
import {
  setToogleModal,
  addBasketItem,
} from "../../../../../store/slice/basketSlise";
import Reviews from "../Reviews/Reviews";
import ItemRaiting from "../ItemRaiting/ItemRaiting";
import Characteristics from "../Characteristics/Characteristics";
import Basket from "../../../../Basket/Basket";

const AllDetails = () => {
  const { itemId, article } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.item.selectedItem);
  const email = useAppSelector((state) => state.user.email);
  const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen);

  const [quantity, setQuantity] = useState(0);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleIncrease = () => {
    if (quantity < 100001) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event: any) => {
    let newQuantity = parseInt(event.target.value, 10);

    if (newQuantity < 0) {
      newQuantity = 0;
    } else if (newQuantity > 100) {
      newQuantity = 100;
    }

    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addBasketItem({ quantity, item, itemId }));
      dispatch(setToogleModal());
      if (email) {
        updateBasket({
          quantity: quantity,
          item: item,
          itemId: itemId,
          email: email,
        });
      }
    }
  };

  const handleAddToDesireList = () => {
    dispatch(addDesireItem({ item, itemId }));
    if (email) {
      updateDesire({ item: item, itemId: itemId, email: email });
    }
  };

  return (
    <section className="all-details">
      <section className="all-details-left-block">
        <section className="all-details-image-block">
          <img src={item.img} alt="Item photo" />
        </section>
        <Characteristics />
      </section>
      <section className="all-details-right-block">
        <section className="all-detail-right-wrapper">
          <h3>{item.name}</h3>
          <ItemRaiting rating={item.rating} />
          <p>{item.price}$</p>
          <div className="all-details-quantily-block">
            <button
              className="all-details-combined-button"
              onClick={handleDecrease}
            >
              -
            </button>
            <input
              className="all-details-quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              className="all-details-combined-button"
              onClick={handleIncrease}
            >
              +
            </button>
            <button className="button" onClick={handleAddToCart}>
              <div className="wave"></div>
              <span className="span">Buy</span>
            </button>
            <button className="button" onClick={handleAddToDesireList}>
              <div className="wave"></div>
              <span className="span">Desire</span>
            </button>
          </div>
        </section>
        <Reviews />
      </section>
      {isBasketOpen && <Basket />}
    </section>
  );
};

export default AllDetails;
