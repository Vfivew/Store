import Footer from "../components/Navigational/Footer/Footer";
import Header from "../components/Navigational/Header/Header";
import Navbar from "../components/Navigational/Navbar/Navbar";

import Goods from "../components/Goods/Goods";

const GoodsPage = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Goods/>
            <Footer/>
        </>
    );
};

export default GoodsPage;