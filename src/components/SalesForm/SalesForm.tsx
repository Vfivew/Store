import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  setDeliveryMethod,
  setIsOrderPlaced,
} from "../../store/slice/formSlice";
import { resetBasket } from "../../service/updateBasket";
import { resetStoreBasket } from "../../store/slice/basketSlise";
import BasketItem from "../Basket/BasketItem/BasketItem";

const SalesForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const { deliveryMethod, isOrderPlaced } = useAppSelector(
    (state) => state.form
  );
  const email = useAppSelector((state) => state.user.email);
  const basket = useAppSelector((state) => state.basket.basket);

  const onSubmit = (data: any) => {
    dispatch(setIsOrderPlaced(true));
    if (email) {
      resetBasket(email);
      dispatch(resetStoreBasket());
    }
  };

  const closeModal = () => {
    dispatch(setIsOrderPlaced(false));
    navigate("/");
    localStorage.removeItem("isOrderPlaced");
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  return (
    <main className="form-wrapper">
      <div className="form">
        <div className="form-basket-items">
          <ul className="form-basket-items-list">
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
                    />
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
        <div className="form-block">
          <h2>Finish order</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>First Name</label>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Enter a valid first name",
                  },
                }}
                defaultValue=""
                render={({ field }) => <input className="inputs" {...field} />}
              />
              {errors.firstName && (
                <p className="error-message">
                  {errors.firstName.message as React.ReactNode}
                </p>
              )}
            </div>
            <div>
              <label>Last Name</label>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Enter a valid last name",
                  },
                }}
                defaultValue=""
                render={({ field }) => <input className="inputs" {...field} />}
              />
              {errors.lastName && (
                <p className="error-message">
                  {errors.lastName.message as React.ReactNode}
                </p>
              )}
            </div>
            <div>
              <label>Phone Number</label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^\+380\d{9}$/,
                    message:
                      'Enter a valid phone number. (Format: "+380998765432")',
                  },
                }}
                defaultValue=""
                render={({ field }) => <input className="inputs" {...field} />}
              />
              {errors.phoneNumber && (
                <p className="error-message">
                  {errors.phoneNumber.message as React.ReactNode}
                </p>
              )}
            </div>
            <div>
              <label>City</label>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Enter a valid city name",
                  },
                }}
                defaultValue=""
                render={({ field }) => <input className="inputs" {...field} />}
              />
              {errors.city && (
                <p className="error-message">
                  {errors.city.message as React.ReactNode}
                </p>
              )}
            </div>
            <div>
              <label>Delivery</label>
              <Controller
                name="delivery"
                control={control}
                render={({ field }) => (
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  >
                    <option value="pickup">Pickup</option>
                    <option value="novaPoshta">Mail</option>
                    <option value="courier">By courier around the city</option>
                  </select>
                )}
              />
              {errors.delivery && (
                <p className="error-message">
                  {errors.delivery.message as React.ReactNode}
                </p>
              )}
            </div>
            {deliveryMethod === "novaPoshta" && (
              <div>
                <label>Specify the delivery point</label>
                <Controller
                  name="novaPoshtaPoint"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => <input {...field} />}
                  defaultValue=""
                />
                {errors.novaPoshtaPoint && (
                  <p className="error-message">
                    {errors.novaPoshtaPoint.message as React.ReactNode}
                  </p>
                )}
              </div>
            )}
            {deliveryMethod === "courier" && (
              <div>
                <label>Delivery Address</label>
                <Controller
                  name="deliveryAddress"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => <input {...field} />}
                  defaultValue=""
                />
                {errors.deliveryAddress && (
                  <p className="error-message">
                    {errors.deliveryAddress.message as React.ReactNode}
                  </p>
                )}
              </div>
            )}
            <div>
              <button
                className="button basket-button"
                disabled={!isValid || basket.length === 0}
              >
                <div className="wave"></div>
                <span className="span">Send</span>
              </button>
            </div>
          </form>
        </div>
        {isOrderPlaced && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thank you for your order</h3>
              <p>Our operator will contact you soon</p>
              <button className="button basket-button" onClick={closeModal}>
                <div className="wave"></div>
                <span className="span">Back to main</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SalesForm;
