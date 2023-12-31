import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import Forecast from "./Forecast";
import Condition from "./Condition";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.city,
      date: new Date(response.data.time * 1000),
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      conditions: response.data.condition.description,
      feelsLike: response.data.temperature.feels_like,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
    });
  }
  function search() {
    const apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCity(event) {
    setCity(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row m-2">
            <div className="col-9 p-0">
              <input
                type="search"
                placeholder="Enter city..."
                autoFocus
                className="form-control"
                onChange={handleCity}
              />
            </div>
            <div className="col-3 pe-0">
              <input type="submit" value="Search" className="btn btn-primary" />
            </div>
          </div>
        </form>
        <Condition data={weatherData} />
        <Forecast city={weatherData.city} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
