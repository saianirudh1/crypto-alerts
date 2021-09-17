import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import styles from '../styles/Nav.module.css';

function Nav() {
  const theme = useContext(AppContext).theme;

  const changeCurrency = function () {};

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <i className="far fa-chart-bar"></i>
        <h1>crypto alerts</h1>
      </div>
      <div className={styles.controls}>
        <select name="Currency">
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
        {theme === 'light' ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
}

export default Nav;
