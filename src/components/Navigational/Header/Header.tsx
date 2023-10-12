import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";
import { setHeaderBurgerActive } from "../../../store/slice/mediaSlice";
import { setToogleModal } from "../../../store/slice/basketSlise";

import Basket from "../../Basket/Basket";
import Auth from "../../Auth/Auth";
import burgermenu from '../../../img/icon/burgermenu.svg';

const Header = () => {
    const dispatch = useAppDispatch()
    const burgerActive = useAppSelector((state) => state.media.headerBurgerActive);
     const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen)
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
                        <li className="header-list-item">EN</li>
                        <li className="header-list-item">UK</li>
                        <NavLink to="/">
                            <li className="header-list-item">Desire</li>
                        </NavLink>
                        <NavLink to="#" onClick={openBasket}>
                            <li className="header-list-item">Basket</li>
                        </NavLink>
                        <NavLink to="/register"><li className="header-list-item">
                            <Auth/>
                        </li></NavLink>
                    </ul>
                </div>
            </section>
            {isBasketOpen && <Basket/>}
        </header>
    );
};

export default Header;