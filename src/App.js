// import myBgImg from "./as";
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

  const getData = (event) => {
    if (event.key === "Enter") {
      fetch(`${URL}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setLocation("");
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].id > "200"
            ? "app raining"
            : weather.weather[0].id > "600"
            ? "app snow"
            : weather.weather[0].id > "700"
            ? "app overcast"
            : weather.weather[0].id === "800"
            ? "app clear"
            : weather.weather[0].id > "800"
            ? "app overcast"
            : "app"
          : "app"
      }
    >
      <div className="container">
        <div className="section">
          <div className="city-search-bar">
            <input
              type="text"
              name="location"
              placeholder="Enter City..."
              onChange={(event) => setLocation(event.target.value)}
              value={location.toUpperCase()}
              onKeyDown={getData}
            />
          </div>
          {weather.name != undefined && (
            <div className="section-upper-app">
              <h2>{weather.name}</h2>
              {weather.main ? <h3>{weather.main.temp.toFixed()}°</h3> : null}
              {/* <img
              src="https:img.icons8.com/?size=512&id=43252&format=png"
              alt="weather"
            ></img> */}
              {weather.weather ? <p>{weather.weather[0].description}</p> : null}
              <divs
                className="section-high-low"
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
              </divs>
            </div>
          )}

          {weather.name != undefined && (
            <div className="bottom-card">
              <div className="description-mains">
                <p>
                  <GiClothes />
                  Feels like:
                </p>
                {weather.main ? <p>{weather.main.feels_like}°</p> : null}
              </div>
              <div className="description-mains">
                <p>
                  <WiBarometer />
                  Pressure:
                </p>
                {weather.main ? <p>{weather.main.pressure} mbar</p> : null}
              </div>
              <div className="description-mains">
                <p>
                  <WiHumidity />
                  Humidity:
                </p>
                {weather.main ? <p>{weather.main.humidity}°</p> : null}
              </div>
              <div className="description-mains">
                <p>
                  <GiLookAt />
                  Visibility:
                </p>
                {weather.main ? <p>{weather.visibility}m</p> : null}
              </div>
              <div className="description-mains">
                <p>
                  <WiStrongWind /> Wind speed:
                </p>
                {weather.main ? <p>{weather.wind.speed} km/h</p> : null}
              </div>
              <div className="description-mains">
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
    </div>
  );
}

export default App;
