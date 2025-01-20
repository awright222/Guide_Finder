import { useSelector } from 'react-redux';
import styles from './Partners.module.css';

const Partners = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className={styles.partnersPage}>
      <h1>Our Partners</h1>
      {!user ? (
        <h2>We have teamed up with our favorite brands that we trust to bring you exclusive deals and promotions. Signup to receive notifications when they come up!</h2>
      ) : (
        <h2>The brands we trust</h2>
      )}
      <div className={styles.grid}>
        <a href="https://www.stoneglacier.com/?srsltid=AfmBOororw2EvEhHtgYsKIJ0nbnksDfRzB-vVf-iKjfX6buTBJz8p7A-" target="_blank" rel="noopener noreferrer">
          <img src="https://www.stoneglacier.com/cdn/shop/products/Sg-logo-sticker_grande.jpg?v=1611958536" alt="Stone Glacier" />
        </a>
        <a href="https://www.lasportivausa.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://yt3.googleusercontent.com/ytc/AIdro_my6qGr_FRS9uNRS0ebHOT4m-v3VLogo3ps609_oPz-yGQ=s900-c-k-c0x00ffffff-no-rj" alt="La Sportiva" />
        </a>
        <a href="https://hoyt.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRnVFen0o1IlTCV8wj9cWCOEqaVT3ihlIQw&s" alt="Hoyt" />
        </a>
        <a href="https://www.thenorthface.com/en-us" target="_blank" rel="noopener noreferrer">
          <img src="https://1000logos.net/wp-content/uploads/2017/05/Emblem-North-Face.jpg" alt="North Face" />
        </a>
        <a href="https://www.leupold.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://www.targettamers.com/wp-content/uploads/2016/07/Leupold-Logo.jpg" alt="Leupold" />
        </a>
        <a href="https://eu.oneill.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYYDx0oIcBnjUhu9fY0e2wKAYJ76XO-Md7IQ&s" alt="Oneill" />
          </a>
          <a href="https://jacksonkayak.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://w7.pngwing.com/pngs/670/458/png-transparent-jackson-kayak-inc-kayak-fishing-tennessee-canoe-fishing-text-logo-smiley.png" alt="Jackson Kayak" />
          </a>
          <a href="https://www.thenorthface.com/en-us" target="_blank" rel="noopener noreferrer">
          <img src="https://i.pinimg.com/736x/28/5c/33/285c33aee8f7173ebc4b270246aabb5d.jpg" alt="Santa Cruz Bicycles" />
          </a>
      </div>
    </div>
  );
};

export default Partners;