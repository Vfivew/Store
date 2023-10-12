import { useNavigate } from 'react-router-dom';
import Slider from '../Slider/Slider';
const Main = () => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/goods/Coils');
  };

  return (
    <main className="main">
      <section className="grid-container">
        <section className="block1">
          <Slider />
          <div className='block-sticker'>
            <h3>Великий вибір вудилищ на котушок</h3>
            <p onClick={handleCatalogClick}>До каталогу</p>
          </div>
        </section>
        <section className="block2"></section>
        <section className="block3"></section>
      </section>
    </main>
  );
};

export default Main;
