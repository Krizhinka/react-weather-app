import React, { useState, useEffect } from 'react';
import WeatherForecastDay from './WeatherForecastDay';
import './WeatherForecast.css';
import axios from 'axios';

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  
  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function load() {
    const apiKey = '9bt7o733de4f51be10f6e5b3c6aa4fc2';

    const longitude = props.coordinates.longitude;
    const latitude = props.coordinates.latitude;    
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (!loaded) {
    console.log('Loading forecast...');
    load();
    return null;
  }

  console.log(forecast);

  return (
    <div className='WeatherForecast'>
      <div className='row'>
        {forecast.map(function (dailyForecast, index) {
          if (index < 6) {
            return (
              <div className='col' key={index}>
                <WeatherForecastDay data={dailyForecast} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
