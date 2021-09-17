import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.currTheme = state.currTheme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
