import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import styles from '../styles/Nav.module.css';

function Nav() {
  const theme = useContext(AppContext).theme;
  const currencies = useContext(AppContext).currencies;
  const currency = useContext(AppContext).currency;
  const apiData = useContext(AppContext).apiData;
  const setCurrency = useContext(AppContext).setCurrency;
  const toggleTheme = useContext(AppContext).toggleTheme;
  const setCoinData = useContext(AppContext).changeCoinData;

  const changeCurrency = function (e) {
    setCurrency(e.target.value);
    setCoinData(apiData);
  };

  const options = currencies.map((curr) => (
    <option key={curr} value={curr}>
      {curr.toUpperCase()}
    </option>
  ));

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <i className="far fa-chart-bar"></i>
        <h1>crypto alerts</h1>
      </div>
      <div className={styles.controls}>
        <select name="Currency" value={currency} onChange={changeCurrency}>
          {options}
        </select>
        {theme === 'light' ? (
          <i className="fas fa-sun" onClick={toggleTheme}></i>
        ) : (
          <i className="fas fa-moon" onClick={toggleTheme}></i>
        )}
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
}

export default Nav;
