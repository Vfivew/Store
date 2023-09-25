import { NavLink } from "react-router-dom";

import Auth from "../../components/Auth/Auth";

const Header = () => {
    return (
        <header className="header">
            <section className="header-nav">
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
                    <NavLink to="/">
                        <li className="header-list-item">Basket</li>
                    </NavLink>
                    <NavLink to="/register"><li className="header-list-item">
                        <Auth/></li>
                    </NavLink>
                </ul>
            </section>
        </header>
    );
};

export default Header;