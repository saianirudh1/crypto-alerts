import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../redux/data';
import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.data.apiData);
  const currency = useSelector((state) => state.data.currency);

  const handleSearch = function (e) {
    dispatch(
      dataActions.setCoinData({
        data: apiData.filter((coin) =>
          coin.name.toLowerCase().includes(e.target.value.toLowerCase())
        ),
        currency,
      })
    );
  };

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" onSelect={handleSearch} />
    </div>
  );
}

export default SearchBar;
