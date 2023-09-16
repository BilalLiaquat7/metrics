import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const countries = [
  'Pakistan',
  'Afghanistan',
  'China',
  'Iran',
  'Nepal',
  'Tajikistan',
];

export const fetchWeatherData = createAsyncThunk(
  'fetchWeatherData',
  async () => {
    try {
      const promises = countries.map(async (country) => {
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=5396f1377fe498127f743f6cefbc25d0&units=metric`,
        );
        if (!resp.ok) {
          throw new Error('Error Occurs');
        }
        const data = await resp.json();
        return data;
      });
      return Promise.all(promises);
    } catch (error) {
      throw new Error('Failed to fetch data from server');
    }
  },
);

const detailWeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: [],
    status: 'not loaded',
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'Data loaded';
        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.status = 'data not found';
        state.status = action.payload;
      });
  },
});

export const selectedCountry = (state, countryName) => {
  const countriess = state.weather.weather;
  return countriess.find((country) => country.name === countryName);
};

export default detailWeatherSlice.reducer;
