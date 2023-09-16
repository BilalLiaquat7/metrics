import { configureStore } from '@reduxjs/toolkit';
import detailWeatherSlice from './weatherSlice';

const store = configureStore({
  reducer: {
    weather: detailWeatherSlice,
  },
});

export default store;
