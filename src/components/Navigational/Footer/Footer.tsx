import { NavLink } from "react-router-dom";
import { useAppSelector } from '../../../hooks/redux-hooks'; 
import { GoodsItem } from "../../../models/fireStoreModels";

import logo from '../../../img/logo.png'
import instagram from '../../../img/icon/instagram.svg'
import facebook from '../../../img/icon/facebook.svg'
import telegram from '../../../img/icon/telegram.svg'
import viber from '../../../img/icon/viber.svg'

const Footer = () => {
    
    const Goods = useAppSelector((state) => state.documents);

    return (
        <footer className="footer">
            <section className="footer-wrapper">
            <ul className='footer-list footer-logo'>
                <li><img className="footer-img" src={logo} alt="Logo"/></li>
                <li className="footer-logo-li">@2023</li>
                <li className="footer-logo-li">Payment</li>
            </ul>
            <ul className='footer-list footer-catalog'>
                <h3>Catalog</h3>
                    {Goods.map((item: GoodsItem) => (
                    <NavLink to={`/goods/${item.id}`} key={item.id}>
                    <li key={item.id}>{item.id}</li>
                    </NavLink>
                ))}
            </ul>
            <ul className='footer-list'>
                <h3>Information to clients</h3>
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
            <ul className='footer-list'>
                <h3>Contact Information</h3>
                <li><a className='nav-number' href="tel:380999999999">
                        099-999-99-99
                    </a>
                </li>
                <li>
                    <a className='nav-number' href="tel:0444444444">
                        044-444-44-44
                    </a>
                </li>
                <li>Call us back</li>
            </ul>
            <ul className='footer-list'>
                <h3>Social network</h3>
                <li>
                    <img className="footer-icon" src={instagram} alt="Link" />
                    <a href="#!">Instagram</a>
                </li>
                <li>
                    <img className="footer-icon" src={facebook} alt="Link" />
                    <a href="#!">Facebook</a>
                </li>
                <li>
                    <img className="footer-icon" src={telegram} alt="Link" />
                    <a href="#!">Telegram</a>
                </li>
                <li>
                    <img className="footer-icon" src={viber} alt="Link" />
                    <a href="#!">Viber</a>
                </li>
            </ul> 
           </section>
        </footer>
    );
};

export default Footer;