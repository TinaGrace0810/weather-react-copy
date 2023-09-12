import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
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
    const apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
    const apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=imperial`;
    axios.get(apiForecastUrl).then(handleForecast);
  }

  if (loaded) {
    return (
      <div className="Forecast">
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
