import Main from "../components/Main/Main";
import BannerDiscount from "../components/Banner/BannerDiscount/BannerDiscount";
import BannerInfo from "../components/Banner/BannerInfo/BannerInfo";
import AboutUs from "../components/AboutUs/AboutUs";

const HomePage = () => {
  return (
    <main>
      <Main />
      <BannerInfo />
      <BannerDiscount />
      <AboutUs />
    </main>
  );
};

export default HomePage;
