type GoodsCardProps = {
  name: string;
  img: string;
  price: string;
};

const GoodsCard: React.FC<GoodsCardProps> = ({ name, img, price }) => {
  return (
    <>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
    </>
  );
};

export default GoodsCard;
