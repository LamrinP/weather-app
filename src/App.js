import React, { useState } from "react";
import "./App.css";
import {
  WiStrongWind,
  WiHumidity,
  WiWindDeg,
  WiBarometer,
} from "react-icons/wi";
import { GiLookAt, GiClothes } from "react-icons/gi";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});

  const URL = `https:api.openweathermap.org/data/2.5/weather?q=${location}&appid=3bfc1143f4fb68e36e8d4b2211b66f1c&units=metric`;

  const getWeatherInfo = (event) => {
    if (event.key === "Enter") {
      fetch(`${URL}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setLocation("");
        });
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="enter-city-search-bar">
          <input
            type="text"
            name="location"
            placeholder="Enter City..."
            onChange={(event) => setLocation(event.target.value)}
            value={location.toUpperCase()}
            onKeyDown={getWeatherInfo}
          />
        </div>

        {weather.name != undefined && (
          <div className="main-weather-info">
            <h2>{weather.name}</h2>
            {weather.main ? <h3>{weather.main.temp.toFixed()}°</h3> : null}
            {weather.weather ? <p>{weather.weather[0].description}</p> : null}
            <div
              className="high-low-temp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {weather.weather ? (
                <p>High: {weather.main.temp_max.toFixed()}°</p>
              ) : null}
              {weather.weather ? (
                <p>Low: {weather.main.temp_min.toFixed()}°</p>
              ) : null}
            </div>
          </div>
        )}

        {weather.name != undefined && (
          <div className="additional-weather-info">
            <div className="weather-descriptions">
              <p>
                <GiClothes />
                Feels like:
              </p>
              {weather.main ? <p>{weather.main.feels_like}°</p> : null}
            </div>
            <div className="weather-descriptions">
              <p>
                <WiBarometer />
                Pressure:
              </p>
              {weather.main ? <p>{weather.main.pressure} mbar</p> : null}
            </div>
            <div className="weather-descriptions">
              <p>
                <WiHumidity />
                Humidity:
              </p>
              {weather.main ? <p>{weather.main.humidity}°</p> : null}
            </div>
            <div className="weather-descriptions">
              <p>
                <GiLookAt />
                Visibility:
              </p>
              {weather.main ? <p>{weather.visibility}m</p> : null}
            </div>
            <div className="weather-descriptions">
              <p>
                <WiStrongWind /> Wind speed:
              </p>
              {weather.main ? <p>{weather.wind.speed} km/h</p> : null}
            </div>
            <div className="weather-descriptions">
              <p>
                <WiWindDeg />
                Wind degree:
              </p>
              {weather.main ? <p>{weather.wind.deg}°</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
