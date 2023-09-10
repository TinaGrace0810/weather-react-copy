import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.city]);

  function handleForecast(response) {
    setLoaded(true);
    setForecast(response.data.daily);
  }
  function load() {
    const apiKey = "a56bd14t7ad00f6eo465f0e67d3dc8fa";
    const apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=imperial`;
    axios.get(apiForecastUrl).then(handleForecast);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function(dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col forecast" key={index}>
                  <ForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();
  }
}
