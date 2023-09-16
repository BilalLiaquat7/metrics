import React from 'react';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherMain from '../components/weatherMain';

const mockStore = configureStore([thunk]);

describe('WeatherMain Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      weather: {
        weather: [],
        status: 'not loaded',
        error: null,
      },
    });
  });

  test('renders loading message when status is "not loaded"', () => {
    render(
      <Provider store={store}>
        <WeatherMain />
      </Provider>,
    );

    const loadingElement = screen.getByText('Loading');
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    store = mockStore({
      weather: {
        weather: [],
        status: 'error',
        error: 'Some error message',
      },
    });

    render(
      <Provider store={store}>
        <WeatherMain />
      </Provider>,
    );

    const errorElement = screen.getByText('Error');
    expect(errorElement).toBeInTheDocument();
  });

  test('renders search input and heading when status is "Data loaded"', () => {
    store = mockStore({
      weather: {
        weather: [],
        status: 'Data loaded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <WeatherMain />
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText('Search by a Country');
    const headingElement = screen.getByText('Weather');

    expect(inputElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });
});