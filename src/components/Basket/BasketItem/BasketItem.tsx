import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';

const BasketItem = ({ item, quantity,itemId, handleModalClick }: { item:any, quantity: number,itemId:any,handleModalClick: () => void  }) => {

  const handleRemoveItem = () => {
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <div className='basket-item-pay-info'>
        <Link
        className='basket-item-pay-link'
        to={`/goods/${itemId}/${item.article}`}
            onClick={() => {
            handleModalClick()
        }}
        >
        <img className='basket-item-pay-info-image' src={item.image} alt={item.name} />
        </Link>
      <div className='basket-item-pay-info-name'>{item.name}</div>
      <div className='basket-item-pay-info-quantity'>
        Кількість
        <input
          className='basket-item-pay-info-quantity-input'
          type='number'
          value={quantity}
          onChange={handleQuantityChange}
          min='0'
        />
      </div>
      <div className='basket-item-pay-info-price'>Ціна: {item.price} $</div>
      <button onClick={handleRemoveItem}>Видалити</button>
    </div>
  );
};

export default BasketItem;
