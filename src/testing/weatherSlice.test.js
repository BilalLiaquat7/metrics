import { selectedCountry } from '../redux/weatherSlice';

const mockState = {
  weather: {
    weather: [
      {
        name: 'Pakistan', main: { temp: 25 }, wind: { speed: 10 }, weather: [{ description: 'Sunny' }],
      },
    ],
  },
};

describe('selectedCountry function', () => {
  test('returns the correct country when given a valid country name', () => {
    const selected = selectedCountry(mockState, 'Pakistan');
    expect(selected.name).toBe('Pakistan');
  });

  test('returns undefined when given an invalid country name', () => {
    const selected = selectedCountry(mockState, 'NonExistentCountry');
    expect(selected).toBeUndefined();
  });
});