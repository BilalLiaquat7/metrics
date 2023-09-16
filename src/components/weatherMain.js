import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../redux/weatherSlice';

import afghanistan from '../assets/afghanistan.png';
import china from '../assets/china.png';
import india from '../assets/india.png';
import iran from '../assets/iran.png';
import nepal from '../assets/nepal.png';
import pakistan from '../assets/pakistan.png';
import tajikistan from '../assets/tajikistan.png';
import world from '../assets/world.png';

const WeatherMain = () => {
  const [searchCountry, setSearchCountry] = useState('');
  const dispatch = useDispatch();
  const { weather, status, error } = useSelector((state) => state.weather);

  const countryImages = {
    Afghanistan: afghanistan,
    China: china,
    Innichen: india,
    Iran: iran,
    Nepal: nepal,
    Pakistan: pakistan,
    Tajikistan: tajikistan,
  };

  const handleSearch = (e) => {
    setSearchCountry(e.target.value);
  };

  useEffect(() => {
    if (status === 'not loaded') {
      dispatch(fetchWeatherData());
    }
  }, [dispatch, status]);

  const searchedCountry = weather.filter((countrydata) => {
    const country = countrydata.name.toLowerCase();
    const countryName = searchCountry.toLowerCase();
    return country.includes(countryName);
  });

  if (status === 'not loaded') {
    return <p className="loading">Loading</p>;
  }

  if (error) {
    return <p className="error">Error</p>;
  }

  return (
    <>
      <div className="mainWeather">
        <input
          type="text"
          placeholder="Search by a Country"
          value={searchCountry}
          onChange={handleSearch}
        />
        <p className="heading">Weather</p>
      </div>
      <div className="worldSection">
        <img src={world} width={250} alt="" />
        <h2 className="worldWeather">World Weather</h2>
      </div>
      <div className="countries">
        {searchedCountry.map((country) => (
          <div key={country.name} className="md:w-1/3 w-1/2 medium even:bg-pink-500 ">
            <Link to={`/city/${country.name}`}>
              <div className="country">
                <div className="country2">
                  {countryImages[country.name] && (
                    <img
                      src={countryImages[country.name]}
                      alt={country.name}
                      width={120}
                    />
                  )}
                  <img className="icon" src="https://img.icons8.com/ios/50/ffffff/circled-right.png" alt="Cloud" />
                </div>
                <div>
                  <h1 className="countryName">{country.name}</h1>
                  <p className="countryTemp">
                    <span>Temp </span>
                    {Math.round(country.main.temp)}
                    {' '}
                    °C
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherMain;
