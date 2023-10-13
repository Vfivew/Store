import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";
import { setHeaderBurgerActive } from "../../../store/slice/mediaSlice";
import { setToogleModal } from "../../../store/slice/basketSlise";
import basket from '../../../img/icon/basket.svg'

import Basket from "../../Basket/Basket";
import Auth from "../../Auth/Auth";
import burgermenu from '../../../img/icon/burgermenu.svg';

const Header = () => {
    const dispatch = useAppDispatch()
    const burgerActive = useAppSelector((state) => state.media.headerBurgerActive);
    const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen)
    const basketItems = useAppSelector(state => state.basket.basket);
    console.log(basketItems)
    const countItem = basketItems.length;

    const toggleBurgerMenu = () => {
        dispatch(setHeaderBurgerActive(!burgerActive))
    };

    const openBasket =() => {
        dispatch(setToogleModal());
    }

    return (
        <header className="header">
            <section className="header-nav">
            <button className="header-button" onClick={toggleBurgerMenu}>
                <img src={burgermenu} alt="burgermenu" />
            </button>
                <div className={`header-list-container ${burgerActive ? 'active' : ''}`}>
                    <ul className="header-list">
                        <NavLink to="/">
                            <li className="header-list-item">About Us</li>
                        </NavLink>
                        <NavLink to="/">
                            <li className="header-list-item">Payment and delivery</li>
                        </NavLink>
                        <NavLink to="/">
                            <li className="header-list-item">Exchange and return</li>
                        </NavLink>
                        <NavLink to="/">
                            <li className="header-list-item">Contact Information</li>
                        </NavLink>
                    </ul>
                    <ul className="header-list">
                        <button className="header-list-item">EN</button>
                        <button className="header-list-item">UK</button>
                        <NavLink to="/">
                            <li className="header-list-item">Desire</li>
                        </NavLink>
                        <NavLink className='basket-link 'to="#" onClick={openBasket}>
                            <img src={basket} alt="basket" className="basket-image" />
                                {countItem > 0 && (
                                <div className='basket-item-count'>
                                    {countItem}
                                </div>
                            )}
                        </NavLink>
                        <NavLink to="/register" className='header-login-button'>
                            <Auth/>
                        </NavLink>
                    </ul>
                </div>
            </section>
            {isBasketOpen && <Basket/>}
        </header>
    );
};

export default Header;