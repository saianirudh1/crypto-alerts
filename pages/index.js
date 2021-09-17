import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import Head from 'next/head';
import App from '../components/App';

import styles from '../styles/Home.module.css';

import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

export default function Home() {
  const theme = useContext(AppContext).theme;

  return (
    <div className={styles.app} data-theme={theme}>
      <Head>
        <title>Crypto Alerts</title>
        <meta
          name="description"
          content="Set Alerts on your favorite Crypto Currencies"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <App />
    </div>
  );
}
