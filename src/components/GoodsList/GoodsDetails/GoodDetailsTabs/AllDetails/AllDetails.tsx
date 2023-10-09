import {useState} from 'react';
import { useAppSelector } from '../../../../../hooks/redux-hooks';
import Reviews from '../Reviews/Reviews';
import DelivieryPayment from '../DelivieryPayment/DelivieryPayment'

const AllDetails = () => {
    const item = useAppSelector((state) => state.item.selectedItem);
    const [quantity, setQuantity] = useState(0);

    if (!item) {
        return <div>Loading...</div>;
    }

    const excludedFields = ['img', 'name', 'price', 'rating'];

    const renderFields = () => {
        return Object.keys(item).map((key) => {
            if (!excludedFields.includes(key)) {
            return (
                <li key={key}>
                <strong>{key}: </strong>
                {item[key]}
                </li>
            );
            }
            return null;
        });
    };

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
///
    }
  };
    
  return (
    <section className="all-details">
      <section className="all-details-left-block">
        <section>
          <img src={item.img} alt="Item photo" />
        </section>
        <section>
          <h3>Characteristics</h3>
          <ul>{renderFields()}</ul>
        </section>
      </section>
      <section className="all-details-right-block">
        <section>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <div className="all-details-quantily-block">
                <button className="all-details-combined-button" onClick={handleDecrease}>
                -
                </button>
                <input
                className="select-product-details-quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                />
                <button className="all-details-combined-button" onClick={handleIncrease}>
                +
                </button>
                <button
                className="all-details-head-button"
                onClick={handleAddToCart}
                >
                Buy
                </button>
            </div>
        </section>
        <DelivieryPayment/>
        <Reviews/>
      </section>
    </section>
  );
};

export default AllDetails;
