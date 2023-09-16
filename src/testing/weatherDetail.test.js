import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherDetail from '../components/weatherDetail';

const mockStore = configureStore([]);

describe('WeatherDetail Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        weather: [
          {
            id: '1',
            name: 'Pakistan',
            main: { temp: 25 },
            wind: { speed: 10, deg: 90 },
            weather: [{ description: 'Sunny' }],
          },
        ],
      },
    });
  });

  test('renders component with valid country data', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WeatherDetail cityName="Pakistan" />
        </BrowserRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  test('renders component with invalid country data', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WeatherDetail cityName="InvalidCountry" />
        </BrowserRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
