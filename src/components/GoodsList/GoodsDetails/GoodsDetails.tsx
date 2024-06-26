import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchDocumentByIdQuery } from "../../../store/slice/fireStoreApi";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setItemByArticle, setFullData } from "../../../store/slice/itemSlice";

import NavigationMiniBar from "../../Goods/NavigationMiniBar/NavigationMiniBar";
import AllDetails from "./GoodDetailsTabs/AllDetails/AllDetails";
import Characteristics from "./GoodDetailsTabs/Characteristics/Characteristics";
import Reviews from "./GoodDetailsTabs/Reviews/Reviews";

const GoodsDetails = () => {
  const dispatch = useAppDispatch();
  const { itemId, article } = useParams();
  const {
    data: goodsListById,
    isLoading,
    isError,
  } = useFetchDocumentByIdQuery(`${itemId}`);
  const [selectedTab, setSelectedTab] = useState("All Details");
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    if (!isLoading && !isError && goodsListById) {
      dispatch(setFullData(goodsListById));
      for (const key in goodsListById) {
        if (Object.hasOwnProperty.call(goodsListById, key)) {
          const item = goodsListById[key];
          for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
              const itemInside = item[key];
              if (itemInside.article === article) {
                dispatch(setItemByArticle(itemInside));
                setItemName(itemInside.name);
                break;
              }
            }
          }
        }
      }
    }
  }, [goodsListById, dispatch, article, isLoading, isError]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case "All Details":
        return <AllDetails />;
      case "Characteristics":
        return <Characteristics />;
      case "Reviews":
        return <Reviews />;
      default:
        return null;
    }
  };

  if (isError) {
    return (
      <section>
        <p>
          There was a problem with the server. Please try again later or contact
          technical support.
        </p>
      </section>
    );
  }

  return (
    <main className="main-product-detail">
      <NavigationMiniBar propsArray={["Goods", itemId, itemName]} />
      <div className="main-product-detail-wrapper">
        <ul className="main-product-detail-list">
          <li
            className={selectedTab === "All Details" ? "active" : ""}
            onClick={() => handleTabClick("All Details")}
          >
            All Details
          </li>
          <li
            className={selectedTab === "Characteristics" ? "active" : ""}
            onClick={() => handleTabClick("Characteristics")}
          >
            Characteristics
          </li>
          <li
            className={selectedTab === "Reviews" ? "active" : ""}
            onClick={() => handleTabClick("Reviews")}
          >
            Reviews
          </li>
        </ul>
        <section className="product-detail-block">
          {renderSelectedTab()}
        </section>
      </div>
    </main>
  );
};

export default GoodsDetails;
