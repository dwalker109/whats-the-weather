import React from "react";
import "./WeatherHistory.css";

const WeatherHistory = ({ weatherData, onClick }) => (
  <div className="wh">
    <ul className="wh__city">
      {weatherData.map((city, key) => (
        <li key={key} onClick={() => onClick(key)}>
          {city.name}
        </li>
      ))}
    </ul>
  </div>
);

export default WeatherHistory;
