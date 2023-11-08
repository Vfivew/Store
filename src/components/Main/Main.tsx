import { useNavigate } from 'react-router-dom';
import { useFetchDocumentDiscountGoodsQuery } from '../../store/slice/fireStoreApi';
import { randomItemId } from '../../utils/randomItemId';

import Slider from '../Slider/Slider';

const Main = () => {
  const navigate = useNavigate();
  const itemId = randomItemId();
  const { data, isLoading, isError } = useFetchDocumentDiscountGoodsQuery(`${itemId}`);
  let discountGoods: any[] = [];
  let discountItemName = null;
  let discountItemImg = null;
  let discountItemName2 = null;
  let discountItemImg2 = null;


  if (data) {
    Object.keys(data).forEach((category) => {
      const categoryGoods = data[category];
      Object.keys(categoryGoods).forEach((key) => {
        discountGoods.push(categoryGoods[key]);
      });
    });

    console.log(data)
    console.log(discountGoods)
    console.log(discountGoods.length)

    if (discountGoods[0] && discountGoods[0].name) {
      discountItemName = discountGoods[0].name;
      discountItemName = discountItemName.split(' ').slice(0, 3).join(' ');
      discountItemImg = discountGoods[0].img;
      console.log(discountGoods[0])
    }

    if (discountGoods[1] && discountGoods[1].name) {
      discountItemName2 = discountGoods[1].name;
      discountItemName2 = discountItemName2.split(' ').slice(0, 3).join(' ');
      discountItemImg2 = discountGoods[1].img;
      console.log(discountGoods[1])
    } else {
      discountItemName2 = discountItemName.split(' ').slice(0, 3).join(' ');
      discountItemImg2 = discountGoods[0].img;
    }

    if (discountGoods.length > 2) {
      const randomIndex1 = Math.floor(Math.random() * discountGoods.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * discountGoods.length);
      } while (randomIndex2 === randomIndex1);

      discountItemName = discountItemName.split(' ').slice(0, 3).join(' ');
      discountItemImg = discountGoods[randomIndex1].img;
      discountItemName2 = discountItemName2.split(' ').slice(0, 3).join(' ');
      discountItemImg2 = discountGoods[randomIndex2].img;
    }
  }

  const goToDiscountItem = () => {
     navigate(`/goods/${itemId}/${discountGoods[0].article}`);
  }

  const handleCatalogClick = () => {
    navigate('/goods/Coils');
  };

  if (isError) {
    return (
      <section>
        <p>There was a problem with the server. Please try again later or contact technical support.</p>
      </section>
    );
  }

  return (
    <main className="main">
      <section className="grid-container">
        <section className="block1">
          <Slider />
          <div className='block-sticker'>
            <h3>Great selection of fishing rods and reels</h3>
            <p onClick={handleCatalogClick}>To the catalog</p>
          </div>
        </section>
        <section className="block2" onClick={goToDiscountItem}>
          <img src={discountItemImg} alt="discountItem" />
          <div className='line'>Discount 15%
          <span>
            {discountItemName}
          </span>
          </div>
        </section>
        <section className="block3" onClick={goToDiscountItem}>
          <img src={discountItemImg2} alt="discountItem" />
          <div className='line'>Discount 15%
          <span>
            {discountItemName2}
          </span>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Main;
