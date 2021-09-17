import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  const setCoinData = useContext(AppContext).changeCoinData;
  const apiData = useContext(AppContext).apiData;

  const handleSearch = function (e) {
    setCoinData(
      apiData.filter((coin) =>
        coin.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" onChange={handleSearch} />
    </div>
  );
}

export default SearchBar;
