import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setSortType } from '../../../store/slice/sortSlice'

const Sort = () => {
  const dispatch = useAppDispatch();
  
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [sortMenuActive, setSortMenuActive] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string | null>(null);
  
  const toggleSortMenu = () => {
      setSortMenuActive(!sortMenuActive);
  };
    
  const handleFilterClick = (buttonText: string) => {
    setActiveButton(buttonText);
    dispatch(setSortType(buttonText));
    setButtonText(buttonText);
    setSortMenuActive(!sortMenuActive);
  };

  return (
    <section className='sort-section'>
    <h3>Sort</h3>
    <button className="sort-button" onClick={toggleSortMenu}>
        {buttonText ? (
            <button>{buttonText}</button>
        ) : (
            'Choose sorting'
        )}
    </button>
      <ul className={`sort-menu ${sortMenuActive ? 'active' : ''}`}>
        <button
          className={activeButton === 'PriceUp' ? 'active' : ''}
          onClick={() => handleFilterClick('PriceUp')}
        >
          Возрастание цены
        </button>
        <button
          className={activeButton === 'Pricedown' ? 'active' : ''}
          onClick={() => handleFilterClick('Pricedown')}
        >
          Убывание цены
        </button>
        <button
          className={activeButton === 'Rating' ? 'active' : ''}
          onClick={() => handleFilterClick('Rating')}
        >
          По рейтингу
        </button>
      </ul>
    </section>
  );
};

export default Sort;
