import React from "react";

const WeatherDetail = ({ weatherData }) => {
  const {
    name,
    main: { temp, pressure, humidity }
  } = weatherData;
  return (
    <div className="wd">
      <h2 className="wd__city">{name}</h2>
      <ul className="wd__info">
        <li>{temp}</li>
        <li>{pressure}</li>
        <li>{humidity}</li>
      </ul>
    </div>
  );
};

export default WeatherDetail;
