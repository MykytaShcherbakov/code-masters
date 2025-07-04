import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    nightMode: false, // Начальное значение
  },
  reducers: {
    toggleTheme: (state) => {
      state.nightMode = !state.nightMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;