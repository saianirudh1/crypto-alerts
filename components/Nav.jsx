import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../redux/data';
import { themeActions } from '../redux/theme';
import styles from '../styles/Nav.module.css';

function Nav() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.currTheme);
  const currency = useSelector((state) => state.data.currency);
  const currencies = useSelector((state) => state.data.currencies);

  const changeCurrency = function (e) {
    dispatch(dataActions.changeCurrency(e.target.value));
  };

  const toggleTheme = function () {
    dispatch(themeActions.toggleTheme());
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
