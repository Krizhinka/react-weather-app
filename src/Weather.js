import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast.js";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  // 🔼
  // const [city, setCity] = useState(null);
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
      coordinates: response.data.coordinates,
      city: response.data.city,
      date: new Date(response.data.time * 1000),
      icon: response.data.condition.icon,

      temperature: response.data.temperature.current,
      condition: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
    });

    //  🔼
    // setCity(response.data.city);
    // setDate(response.data.time * 1000);
    // setIcon(response.data.condition.icon_url);
    // setTemperature(response.data.temperature.current);
    // setCondition(response.data.condition.description);
    // setHumidity(response.data.temperature.humidity);
    // setWind(response.data.wind.speed);
  }

  function search() {
    const apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
    // alert(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="City name"
                className="form-control border-3"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>

            {/* <div className="col-3"> 
              <input
                type="submit"
                value="Current"
                className="btn btn-warning w-100"
              />
            </div>*/}
          </div>
        </form>

        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();

    return "Loading...";
  }
}
