import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Info = ({ tabIndex }: { tabIndex: number }) => {
    const tabs = ["Payment and delivery", "Exchange and return", "Contact Information"];
    const [activeTab, setActiveTab] = useState(tabIndex);
    const location = useLocation();

    useEffect(() => {
        const index = Number(location.pathname.split('/').pop());
        if (!isNaN(index)) {
            setActiveTab(index);
        }
    }, [location]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <main className='tabs-main'>
            <div className='tabs-wrapper'>
                <section className='tabs-section'>
                    <ul>
                        {tabs.map((tab, index) => (
                            <NavLink to={`/info/${index}`} key={index}>
                                <li
                                    className={`header-list-item ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tab}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </section>
                <section className='info-section'>
                    {activeTab === 0 && (
                        <section>
                            <h3>How to Make a Payment</h3>
                            <p>
                                Making a payment is simple and secure. We accept various payment methods, including credit cards, PayPal, and bank transfers. Please ensure that your billing information is accurate to avoid any payment issues.
                            </p>
                        </section>
                    )}
                    {activeTab === 1 && (
                        <section>
                            <h3>How to Initiate an Exchange or Return</h3>
                            <p>
                                To initiate an exchange or return, please contact our customer service team within 30 days of receiving your order. Provide them with your order details, and they will guide you through the process, ensuring a smooth and hassle-free experience.
                            </p>
                        </section>
                    )}
                    {activeTab === 2 && (
                        <section>
                            <h3>Frequently Asked Questions (FAQ)</h3>
                            <h4>1. How can I track my order?</h4>
                            <p>
                                You can easily track your order by logging into your account and navigating to the "Orders" section. Alternatively, you can reach out to our customer support for assistance with tracking your order.
                            </p>
                            <h4>2. What are your store hours?</h4>
                            <p>
                                Our store is open from Monday to Friday, from 9:00 AM to 6:00 PM. We are closed on weekends and public holidays. Feel free to visit us during our working hours or reach out to us via email or phone during these times.
                            </p>
                        </section>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Info;
