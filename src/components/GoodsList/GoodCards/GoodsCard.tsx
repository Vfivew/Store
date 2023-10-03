import React from "react";

type GoodsCardProps = {
  name: string;
  img: string;
  price: string;
};

const GoodsCard: React.FC<GoodsCardProps> = ({ name, img, price }) => {
  
  return (
    <div className="goods-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
    </div>
  );
};

export default GoodsCard;
