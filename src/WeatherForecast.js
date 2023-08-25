import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
export default function WeatherForecast() {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day">Sun</div>
          <div>
            <WeatherIcon code="clear - sky - day" size={45} />
          </div>
          <div className="WeatherForecast-temperature">
            <span className="WeatherForecast-temperature-min">18°</span>
            <span className="WeatherForecast-temperature-max">30°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
