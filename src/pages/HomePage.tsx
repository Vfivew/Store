import Footer from "../components/Navigational/Footer/Footer";
import Header from "../components/Navigational/Header/Header";
import Navbar from "../components/Navigational/Navbar/Navbar";
import Main from "../components/Main/Main";
import BannerDiscount from "../components/Banner/BannerDiscount/BannerDiscount";
import BannerInfo from "../components/Banner/BannerInfo/BannerInfo";
import Button from "../components/Button/Button";


const HomePage = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Button />
            <Main />
            <BannerInfo/>
            <BannerDiscount/>
            <Footer/>
        </>
    );
};

export default HomePage;