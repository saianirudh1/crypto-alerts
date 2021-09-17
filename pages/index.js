import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../redux/data';
import Head from 'next/head';
import App from '../components/App';

import CoinGecko from 'coingecko-api';

import styles from '../styles/Home.module.css';

const CoinGeckoClient = new CoinGecko();
const min = 5;

export default function Home() {
  const theme = useSelector((state) => state.theme.currTheme);
  const currency = useSelector((state) => state.data.currency);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(dataActions.toggleLoading());

    const params = { per_page: 100, order: CoinGecko.ORDER.MARKET_CAP_DESC };
    let allCoins = await CoinGeckoClient.coins.all(params);
    dispatch(dataActions.toggleLoading());

    const data = allCoins.data;
    dispatch(dataActions.setApiData(data));
    dispatch(dataActions.setCoinData({ data, currency }));

    let money = await CoinGeckoClient.simple.supportedVsCurrencies();
    dispatch(dataActions.setCurrencies(money.data));

    setInterval(async () => {
      allCoins = await CoinGeckoClient.coins.all(params);
      dispatch(dataActions.setApiData(data));
      dispatch(dataActions.setCoinData({ data, currency }));
    }, min * 60000);
  }, [CoinGeckoClient, dispatch]);

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
