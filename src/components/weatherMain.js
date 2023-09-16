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
  const [search, setSearch] = useState('');
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
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (status === 'not loaded') {
      dispatch(fetchWeatherData());
    }
  }, [dispatch, status]);

  const searchedCountry = weather.filter((countrydata) => {
    const country = countrydata.name.toLowerCase();
    const find = search.toLowerCase();
    return country.includes(find);
  });

  if (status === 'not loaded') {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="flex justify-between bg-[#c13176] p-4">
        <input
          className="p-2 rounded"
          type="text"
          placeholder="Search by a Country"
          value={search}
          onChange={handleSearch}
        />
        <p className="text-2xl text-white">Weather</p>
      </div>
      <div className="flex flex-row bg-pink-500 py-12 px-6 justify-evenly items-center">
        <img src={world} width={250} alt="" />
        <h2 className="text-xl font-extrabold text-white">World Weather</h2>
      </div>
      <div className="w-screen flex flex-wrap">
        {searchedCountry.map((country) => (
          <div key={country.name} className="md:w-1/3 w-1/2 border border-slate-300 bg-pink-700 even:bg-pink-500 ">
            <Link to={`/city/${country.name}`}>
              <div className="p-5 h-80 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                  {countryImages[country.name] && (
                    <img
                      src={countryImages[country.name]}
                      alt={country.name}
                      width={120}
                    />
                  )}
                  <img className="w-8 h-min" src="https://img.icons8.com/ios/50/ffffff/circled-right.png" alt="Cloud" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white text-right">{country.name}</h1>
                  <p className="my-2 text-right text-md text-white">
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
