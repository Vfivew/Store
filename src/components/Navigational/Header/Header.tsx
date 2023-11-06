import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";
import { setHeaderBurgerActive } from "../../../store/slice/mediaSlice";
import { setToogleModal } from "../../../store/slice/basketSlise";
import { setBasketItem } from "../../../store/slice/basketSlise";
import { setDesireItem } from "../../../store/slice/desireSlice";
import { useFetchBasketQuery, useFetchDesireQuery } from "../../../store/slice/fireStoreApi";

import heart from '../../../img/icon/heart.svg'
import basket from '../../../img/icon/basket.svg'

import Basket from "../../Basket/Basket";
import Auth from "../../Auth/Auth";
import burgermenu from '../../../img/icon/burgermenu.svg';

const Header = () => {
    const dispatch = useAppDispatch()
    const burgerActive = useAppSelector((state) => state.media.headerBurgerActive);
    const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen)
    const basketItems = useAppSelector(state => state.basket.basket);
    const desireItems = useAppSelector(state => state.desire.desire);
    const email = useAppSelector(state=> state.user.email)
    const { data:basketData, isLoading:basketLoading, isError:basketError } = useFetchBasketQuery(email);
    const { data:desireData, isLoading:desireLoading, isError:desireError } = useFetchDesireQuery(email);
    const countItem = basketItems.length;
    const countDesireItem = desireItems.length;
    const arrayBasketData = basketData ? Object.entries(basketData).map(([key, value]) => value) : [];
    const arrayDesireData = desireData ? Object.entries(desireData).map(([key, value]) => value) : [];

    const toggleBurgerMenu = () => {
        dispatch(setHeaderBurgerActive(!burgerActive))
    };

    const openBasket =() => {
        dispatch(setToogleModal());
    }

    const handleLanguageClick = (language:string) => {
        if (language === 'en') {
            window.location.href = 'https://store-delta-dusky.vercel.app/';
        } else if (language === 'uk') {
            window.location.href = 'https://store-uk.vercel.app/';
        }
    };

    useEffect(() => {
        if (!basketLoading && !basketError) {
            dispatch(setBasketItem(arrayBasketData))
        } 
        if (!desireLoading && !desireError) {
            dispatch(setDesireItem(arrayDesireData))
        } 
    }, [basketData, basketLoading, basketError,desireData,desireLoading,desireError, dispatch]);

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
                        <NavLink to="/info/0">
                            <li className="header-list-item">Payment and delivery</li>
                        </NavLink>
                        <NavLink to="/info/1">
                            <li className="header-list-item">Exchange and return</li>
                        </NavLink>
                        <NavLink to="/info/2">
                            <li className="header-list-item">Contact Information</li>
                        </NavLink>
                    </ul>
                    <ul className="header-list">
                        {email? <NavLink to="/admin">
                            <li className="header-list-item">Admin Panel</li>
                        </NavLink>:null}
                        <button className="header-list-item" onClick={() => handleLanguageClick('en')}>
                            EN
                        </button>
                        <button className="header-list-item" onClick={() => handleLanguageClick('uk')}>
                            UK
                        </button>
                        <NavLink className='desire-link' to="/desire">
                             <img src={heart} alt="desire" className="desire-image" />
                                {countDesireItem > 0 && (
                                <div className='desire-item-count'>
                                    {countDesireItem}
                                </div>
                            )}
                        </NavLink>
                        <NavLink className='basket-link' to="#" onClick={openBasket}>
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