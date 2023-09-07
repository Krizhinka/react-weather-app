import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <h3>
        <FormattedDate date={props.data.date} />
      </h3>

      <div className="row">
        <div className="col-7  mt-3 mb-5">
          <div className="d-flex">
            <div>
              <WeatherIcon code={props.data.icon} size={60} />
            </div>
            <div className="temp-indicator">
              <WeatherTemperature celsius={props.data.temperature} />
            </div>
          </div>
        </div>
        <div className="col-5">
          <ul>
            <li className="text-capitalize">{props.data.condition}</li>
            <li>Humidity: {props.data.humidity} %</li>
            <li>Wind: {Math.round(props.data.wind)} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
