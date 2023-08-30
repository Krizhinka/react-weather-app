import React, { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    // console.log(response.data);
    setForecast(response.data.daily);
    setLoaded(true);
  }

  // console.log(props);

  if (loaded) {
    console.log(forecast);
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 6) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            }
          })}

          {/* An easy approach of forecast 🔽:
        
          
          <div className="col">
            <WeatherForecastDay data={forecast[0]} />
          </div>

          <div className="col">
            <WeatherForecastDay data={forecast[1]} />
          </div>

          <div className="col">
            <WeatherForecastDay data={forecast[2]} />
          </div>

          <div className="col">
            <WeatherForecastDay data={forecast[3]} />
          </div>

          <div className="col">
            <WeatherForecastDay data={forecast[4]} />
          </div>

          <div className="col">
            <WeatherForecastDay data={forecast[5]} />
          </div>*/}
        </div>
      </div>
    );
  } else {
    const apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";
    let longitude = props.coordinates.longitude;
    let latitude = props.coordinates.latitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
