import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Weather = ({ capital }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;

  const [temp, setTemp] = useState('');
  const [speed, setSpeed] = useState('');
  const [icon, setIcon] = useState('');
  const [weather, setWeather] = useState('');

  weatherService.getAll(capital).then((weather) => {
    setSpeed(weather.wind.speed);
    setTemp(weather.main.temp);
    setWeather(weather.weather[0].description);
    setIcon(
      `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
  });

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {temp} K</p>
      <img src={icon}></img>
      <p>wind {speed}</p>
      <p>weather {weather}</p>
    </div>
  );
};
export default Weather;
