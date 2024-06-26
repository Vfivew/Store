import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { setToogleModal } from "../../store/slice/basketSlise";
import BasketItem from "./BasketItem/BasketItem";

const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket.basket);

  const totalAmount = basket.reduce((total, [quantity, item]) => {
    return total + parseFloat(item.price) * quantity;
  }, 0);

  const formattedTotalAmount = `${totalAmount.toLocaleString("en-US")} $`;

  const handleOrderClick = () => {
    navigate("/form");
  };

  const handleModalClick = () => {
    dispatch(setToogleModal());
  };

  return (
    <div className="basket-modal" onClick={handleModalClick}>
      <div className="basket-content" onClick={(e) => e.stopPropagation()}>
        <div className="basket-header">
          <h2 className="basket-header-title">Basket</h2>
          <button className="button" onClick={handleModalClick}>
            <div className="wave"></div>
            <span className="span">Exit</span>
          </button>
        </div>
        <div className="basket-items">
          {basket.length === 0 ? (
            <p className="basket-items-no-items">
              You have not selected any items...
            </p>
          ) : (
            <ul className="basket-items-list">
              {basket.map(([quantity, item, itemId], index) => (
                <li key={item.article}>
                  <BasketItem
                    item={item}
                    quantity={quantity}
                    itemId={itemId}
                    handleModalClick={handleModalClick}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="basket-final-price">
          Total Amount: {formattedTotalAmount}
        </div>
        <div className="basket-items-button-directory">
          <button className="button basket-button" onClick={handleModalClick}>
            <div className="wave"></div>
            <span className="span">Back to Order</span>
          </button>
          <button
            className="button basket-button"
            onClick={() => {
              handleOrderClick();
              handleModalClick();
            }}
          >
            <div className="wave"></div>
            <span className="span">Finish Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
