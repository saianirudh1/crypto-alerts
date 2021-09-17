import React, { useState, useEffect } from 'react';

import CoinGecko from 'coingecko-api';

export const AppContext = React.createContext({
  theme: '',
  currency: '',
  apiData: [],
  currencies: [],
  setTheme: () => {},
  setCurrency: () => {},
  setApiData: () => {},
  setCurrencies: () => {},
});

const CoinGeckoClient = new CoinGecko();

const AppContextProvider = (props) => {
  const [theme, setTheme] = useState('');
  const [currency, setCurrency] = useState('inr');
  const [apiData, setApiData] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(async () => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'dark' : 'light');

    let data = await CoinGeckoClient.coins.all();
    setApiData(data.data);

    let money = await CoinGeckoClient.simple.supportedVsCurrencies();
    setCurrencies(money);
  }, []);

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
        apiData,
        currencies,
        toggleTheme: toggleCurrTheme,
        setCurrency: changeCurrency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
