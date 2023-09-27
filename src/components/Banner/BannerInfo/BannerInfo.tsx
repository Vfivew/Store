import click from '../../../img/icon/click.svg'
import delivery from '../../../img/icon/delivery.svg'
import exchange from '../../../img/icon/exchange.svg'
import medal from '../../../img/icon/medal.svg'
import payment from '../../../img/icon/payment.svg'

const BannerInfo = () => {
    return (
        <div className='banner-info'>
            <div className='banner-info-wrapper'>
                <div className='banner-image-wrapper'>
                    <img src={payment} alt="image-payment" />
                    <p>Payment upon receipt</p>
                </div>
                <div className='banner-image-wrapper'>
                    <img src={medal} alt="image-medal" />
                    <p>Exchange and return</p>
                </div>
                <div className='banner-image-wrapper'>
                    <img src={delivery} alt="image-delivery" />
                    <p>Fast delivery</p>
                </div>
                <div className='banner-image-wrapper'>
                    <img src={exchange} alt="image-exchange" />
                    <p>Quality guarantee</p>
                </div>
                <div className='banner-image-wrapper'>
                    <img src={click} alt="image-click" />
                    <p>One click purchase</p>
                </div>
            </div>
        </div>
    );
};

export default BannerInfo;