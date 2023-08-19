import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  // const [city, setSity] = useState(null);
  // const [date, setDate] = useState(null);
  // const [icon, setIcon] = useState(null);
  // const [temperature, setTemperature] = useState(null);
  // const [condition, setCondition] = useState(null);
  // const [humidity, setHumidity] = useState(null);
  // const [wind, setWind] = useState(null);

  function handleResponse(response) {
    console.log(response.data);

    setWeatherData({
      ready: true,
      city: response.data.city,
      date: new Date(response.data.temperature.time * 1000),
      icon: response.data.condition.icon_url,
      temperature: response.data.temperature.current,
      condition: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
    });

    // setSity(response.data.city);
    // setDate(response.data.temperature.time * 1000); ?????????
    // setIcon(response.data.condition.icon_url);
    // setTemperature(response.data.temperature.current);
    // setCondition(response.data.condition.description);
    // setHumidity(response.data.temperature.humidity);
    // setWind(response.data.wind.speed);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-6">
              <input
                type="search"
                placeholder="City name"
                className="form-control border-3"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Current"
                className="btn btn-warning w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <h3>
          <FormattedDate date={weatherData.date} />
        </h3>

        <div className="row">
          <div className="col-7  mt-3">
            <div className="d-flex">
              <div>
                <img
                  src={weatherData.icon.replace("http:", "https:")}
                  //  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"

                  // `${response.data.condition.icon_url.replace("http:", "https:")}`

                  //  alt={weatherData.condition.charAt(0).toUpperCase() + condition.slice(1)}
                  alt={weatherData.condition
                    .split(" ")
                    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                    .join(" ")}
                />
              </div>

              <div className="temp-indicator">
                <span className="temperature">
                  {Math.round(weatherData.temperature)}
                </span>
                <span className="unit">°C</span>
              </div>
            </div>
          </div>
          <div className="col-5">
            <ul>
              <li className="text-capitalize">{weatherData.condition}</li>
              <li>Humidity: {weatherData.humidity} %</li>
              <li>Wind: {Math.round(weatherData.wind)} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "Loading...";
  }
}
