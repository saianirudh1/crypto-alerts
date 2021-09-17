import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
