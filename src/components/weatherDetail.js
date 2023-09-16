import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectedCountry } from '../redux/weatherSlice';
import afghanistan from '../assets/afghanistan.png';
import china from '../assets/china.png';
import iran from '../assets/iran.png';
import nepal from '../assets/nepal.png';
import pakistan from '../assets/pakistan.png';
import tajikistan from '../assets/tajikistan.png';

function WeatherDetail() {
  const { cityName } = useParams();
  const country = useSelector((state) => selectedCountry(state, cityName));
  console.log('===', country);
  const countryImages = {
    Afghanistan: afghanistan,
    China: china,
    Iran: iran,
    Nepal: nepal,
    Pakistan: pakistan,
    Tajikistan: tajikistan,
  };

  return (
    <div className="countryDetailMain">
      {
      country && (
        <div key={country.id}>
          <div className="topSection">
            <Link className="link" to="/">
              <img
                src="https://img.icons8.com/windows/32/ffffff/back.png"
                alt="forward"
              />
            </Link>
            <p className="link">
              {country.name}
              {' '}
              Weather view
            </p>
          </div>
          <div className="nameSection">
            <img src={countryImages[country.name]} width={200} alt="" />
            <div>
              <h2 className="nameFont">{country.name}</h2>
              <h2 className="nameFont">{country.weather[0].description}</h2>
            </div>
          </div>
          <hr />
          <h2 className="city">City/Town Breackdown - 2023</h2>
          <div style={{ fontSize: 'large' }}>
            <div className="cells">
              <p className="wind">
                <span>Temperature: </span>
                {Math.round(country.main.temp)}
                {' '}
                °C
              </p>
            </div>
            <div className="cellsEven">
              <p className="wind">
                <span>Wind Speed: </span>
                {Math.round(country.wind.speed)}
                {' '}
                Km/h
              </p>
            </div>
            <div className="cells">
              <p className="wind">
                <span>Wind degree: </span>
                {Math.round(country.wind.deg)}
                °
              </p>
            </div>
            <div className="cellsEven">
              <p className="wind">
                <span>Humidity: </span>
                {Math.round(country.main.humidity)}
                °
              </p>
            </div>
          </div>
        </div>
      )
    }
    </div>
  );
}

WeatherDetail.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    wind: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherDetail;
