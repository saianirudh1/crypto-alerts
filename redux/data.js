import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingData: false,
  coinData: [],
  apiData: [],
  currency: 'usd',
  currencies: [],
};

const getPrice = function (nbr) {
  const decimals =
    nbr != Math.floor(nbr) ? nbr.toString().split('.')[1].length : 0;

  if (!decimals) {
    return nbr.toLocaleString();
  }

  return nbr.toFixed(decimals).toString();
};

const mapCoinData = function (data, currency) {
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
  const priceChange24 = data.market_data.price_change_percentage_24h.toFixed(1);
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

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    toggleLoading(state) {
      state.loadingData = !state.loadingData;
    },

    setApiData(state, action) {
      state.apiData = action.payload;
    },

    setCoinData(state, action) {
      const data = action.payload.data.map((coin) =>
        mapCoinData(coin, action.payload.currency)
      );
      state.coinData = data;
    },

    changeCurrency(state, action) {
      state.currency = action.payload;
      state.coinData = state.apiData.map((coin) =>
        mapCoinData(coin, action.payload)
      );
    },

    setCurrencies(state, action) {
      state.currencies = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
