import CoinTable from './CoinTable';
import Nav from './Nav';
import styles from '../styles/App.module.css';

function App() {
  return (
    <main className={styles.center}>
      <Nav />
      <CoinTable />
    </main>
  );
}

export default App;
