import Main from "../components/Main/Main";
import BannerDiscount from "../components/Banner/BannerDiscount/BannerDiscount";
import BannerInfo from "../components/Banner/BannerInfo/BannerInfo";

const HomePage = () => {
    return (
        <>
            <Main />
            <BannerInfo/>
            <BannerDiscount/>
        </>
    );
};

export default HomePage;