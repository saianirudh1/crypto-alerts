import React, { useState, useEffect } from 'react';

import CoinGecko from 'coingecko-api';

export const AppContext = React.createContext({
  theme: '',
  currency: '',
  loadingData: true,
  apiData: [],
  coinData: [],
  currencies: [],
  toggleTheme: () => {},
  setCurrency: () => {},
  setApiData: () => {},
  setCoinData: () => {},
  setCurrencies: () => {},
});

const CoinGeckoClient = new CoinGecko();
const min = 5;

const AppContextProvider = (props) => {
  const [theme, setTheme] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [loadingData, setLoadingData] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(async () => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'dark' : 'light');

    setLoadingData(true);
    let allCoins = await CoinGeckoClient.coins.all();
    setLoadingData(false);
    const data = allCoins.data;
    setApiData(data);

    let coins = data.map((coin) => mapCoinData(coin));
    setCoinData(coins);

    let money = await CoinGeckoClient.simple.supportedVsCurrencies();
    setCurrencies(money.data);

    setInterval(async () => {
      console.log('calling');
      allCoins = await CoinGeckoClient.coins.all();
      coins = data.map((coin) => mapCoinData(coin));
      setCoinData(coins);
    }, min * 60000);
  }, [
    CoinGeckoClient,
    setTheme,
    setLoadingData,
    setApiData,
    setCoinData,
    setCurrencies,
  ]);

  const getPrice = function (nbr) {
    const decimals =
      nbr != Math.floor(nbr) ? nbr.toString().split('.')[1].length : 0;

    if (!decimals) {
      return nbr.toLocaleString();
    }

    return nbr.toFixed(decimals).toString();
  };

  const mapCoinData = function (data) {
    const id = data.id;
    const name = data.name;
    const image = data.image;
    const symbol = data.symbol.toUpperCase();
    const price = getPrice(data.market_data.current_price[currency]);
    const marketCap = '$' + data.market_data.market_cap.usd.toLocaleString();
    const priceChange1 =
      data.market_data.price_change_percentage_1h_in_currency[currency].toFixed(
        1
      );
    const priceChange24 =
      data.market_data.price_change_percentage_24h.toFixed(1);
    const priceChange7 = data.market_data.price_change_percentage_7d.toFixed(1);

    return {
      id,
      name,
      image,
      symbol,
      price,
      priceChange1,
      priceChange24,
      priceChange7,
      marketCap,
    };
  };

  const toggleCurrTheme = function () {
    setTheme((currTheme) => {
      const nextTheme = currTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  };

  const changeCurrency = function (currency) {
    setCurrency(currency);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        currency,
        loadingData,
        apiData,
        coinData,
        currencies,
        setApiData,
        setCoinData,
        toggleTheme: toggleCurrTheme,
        setCurrency: changeCurrency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
