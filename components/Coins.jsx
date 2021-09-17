import Coin from './Coin';

import styles from '../styles/Coins.module.css';

function Coins() {
  return (
    <div className={styles.coins}>
      <Coin />
    </div>
  );
}

export default Coins;
