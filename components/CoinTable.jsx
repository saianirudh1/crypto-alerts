import SearchBar from './SearchBar';
import Coins from './Coins';

import styles from '../styles/CoinTable.module.css';

function CoinTable() {
  return (
    <div className={styles.cointable}>
      <SearchBar />
      <Coins />
    </div>
  );
}

export default CoinTable;
