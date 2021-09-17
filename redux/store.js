import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import dataReducer from './data';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    data: dataReducer,
  },
});

export default store;
