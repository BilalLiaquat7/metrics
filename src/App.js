import { Route, Routes } from 'react-router-dom';
import WeatherMain from './components/weatherMain';
import WeatherDetail from './components/weatherDetail';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col">
      <Routes>
        <Route element={<WeatherMain />} />
        <Route path="/city/:cityName" element={<WeatherDetail />} />
      </Routes>
    </div>
  );
}

export default App;
