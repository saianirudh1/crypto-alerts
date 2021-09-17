import { Fragment, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Spinner from './Spinner.jsx';
import styles from '../styles/Coin.module.css';

function Coin() {
  const currency = useContext(AppContext).currency;
  const apiData = useContext(AppContext).apiData;

  const mapCoinData = function (data) {
    const id = data.id;
    const name = data.name;
    const image = data.image;
    const symbol = data.symbol.toUpperCase();
    const price = data.market_data.current_price[currency].toLocaleString();
    const marketCap = '$' + data.market_data.market_cap.usd.toLocaleString();
    const priceChange1 =
      data.market_data.price_change_percentage_1h_in_currency[currency].toFixed(
        1
      ) + '%';
    const priceChange24 =
      data.market_data.price_change_percentage_24h.toFixed(1) + '%';
    const priceChange7 =
      data.market_data.price_change_percentage_7d.toFixed(1) + '%';

    return {
      id,
      name,
      image,
      symbol,
      price,
      priceChange1,
      priceChange24,
      priceChange7,
      marketCap,
    };
  };

  const coins = apiData.map((data) => {
    const coin = mapCoinData(data);
    return (
      <div key={coin.id} id={coin.id} className={styles['coin-container']}>
        <div className={styles.coin}>
          <div className={styles.image}>
            <img src={coin.image.small} />
          </div>
          <p>{coin.name}</p>
        </div>
        <div className={styles.symbol}>
          <p>{coin.symbol}</p>
        </div>
        <div className={styles.price}>
          <p>{coin.price}</p>
        </div>
        <div className={styles.percent}>
          <p>{coin.priceChange1}</p>
        </div>
        <div className={styles.percent}>
          <p>{coin.priceChange24}</p>
        </div>
        <div className={styles.percent}>
          <p>{coin.priceChange7}</p>
        </div>
        <div className={styles.market}>
          <p>{coin.marketCap}</p>
        </div>
        <div className={styles.alert}>
          <button>Set Alert</button>
        </div>
      </div>
    );
  });

  const main = (
    <Fragment>
      <div className={styles['coin-container']}>
        <div className={styles.coin}>
          <div className={styles.image}>
            <h2>Coin</h2>
          </div>
          <h2></h2>
        </div>
        <div className={styles.symbol}>
          <h2></h2>
        </div>
        <div className={styles.price}>
          <h2>Price</h2>
        </div>
        <div className={styles.percent}>
          <h2>1D</h2>
        </div>
        <div className={styles.percent}>
          <h2>24H</h2>
        </div>
        <div className={styles.percent}>
          <h2>7D</h2>
        </div>
        <div className={styles.market}>
          <h2>Market Cap</h2>
        </div>
        <div className={styles.alert}>
          <h2>Alert</h2>
        </div>
      </div>
      {coins}
    </Fragment>
  );

  return apiData.length === 0 ? <Spinner /> : main;
}

export default Coin;
