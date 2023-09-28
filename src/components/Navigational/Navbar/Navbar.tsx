import { useState } from "react";
import shopCatalogIcon from '../../../img/icon/shopCatalogIcon.svg';
import close from '../../../img/icon/close.svg';
import Catalog from "../Catalog";
import { useAppSelector } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [burgerActive, setBurgerActive] = useState(false);
    const Goods = useAppSelector((state) => state.documents);
    Catalog();

    const toggleBurgerMenu = () => {
        setBurgerActive(!burgerActive);
    };

    const closeBurgerMenu = () => {
        setBurgerActive(false);
    };

    return (
        <section className="nav">
            <section className="nav-wrapper">
                    <span className="nav-span">Logo</span>
                <button className="nav-button" onClick={toggleBurgerMenu}>
                    <img src={shopCatalogIcon} alt="Shop Catalog Icon" />
                </button>
                <nav
                    className={`nav-menu ${burgerActive ? 'active' : ''}`}
                    onClick={closeBurgerMenu}
                >
                    <button className="nav-button-close" onClick={closeBurgerMenu}>
                        <img src={close} alt="close" />
                    </button>
                    <ul className="nav-list">
                        {Goods?.map((item) => (
                        <NavLink to={`/goods/${item.id}`} key={item.id}>
                            <li className="nav-menu-item" key={item.id}>
                            {item.id}
                            </li>
                        </NavLink>
                        ))}
                    </ul>
                </nav>
                <span className="nav-span">
                    <a className='nav-number' href="tel:380999999999">
                        +099 999-99-99
                    </a>
                </span>         
            </section>
        </section>
    );
};

export default Navbar;
