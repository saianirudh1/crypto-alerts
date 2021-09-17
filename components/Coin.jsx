import { Fragment, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Spinner from './Spinner.jsx';
import styles from '../styles/Coin.module.css';

function Coin() {
  const currency = useContext(AppContext).currency;
  const coinData = useContext(AppContext).coinData;
  const loadingData = useContext(AppContext).loadingData;

  const coins = coinData.map((data) => {
    return (
      <div key={data.id} id={data.id} className={styles['coin-container']}>
        <div className={styles.coin}>
          <div className={styles.image}>
            <img src={data.image.small} />
          </div>
          <p>{data.name}</p>
        </div>
        <div className={styles.symbol}>
          <p>{data.symbol}</p>
        </div>
        <div className={styles.price}>
          <p>{data.price}</p>
        </div>
        <div
          className={`${styles.percent} ${
            data.priceChange1 < 0 ? styles.negative : styles.positive
          }`}
        >
          <p>{data.priceChange1 + '%'}</p>
        </div>
        <div
          className={`${styles.percent} ${
            data.priceChange24 < 0 ? styles.negative : styles.positive
          }`}
        >
          <p>{data.priceChange24 + '%'}</p>
        </div>
        <div
          className={`${styles.percent} ${
            data.priceChange7 < 0 ? styles.negative : styles.positive
          }`}
        >
          <p>{data.priceChange7 + '%'}</p>
        </div>
        <div className={styles.market}>
          <p>{data.marketCap}</p>
        </div>
        <div className={styles.alert}>
          <button>Set Alert</button>
        </div>
      </div>
    );
  });

  const main =
    coins.length === 0 ? (
      <div className={styles['not-found']}>
        <h1>No Results Found</h1>
      </div>
    ) : (
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
            <h2>{`Price (${currency.toUpperCase()})`}</h2>
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

  return loadingData ? <Spinner /> : main;
}

export default Coin;
