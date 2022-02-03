import {  configureStore } from '@reduxjs/toolkit';
import itemsSlice from './slices/itemsSlices';

const store = configureStore({
  reducer: itemsSlice.reducer
});

export default store;