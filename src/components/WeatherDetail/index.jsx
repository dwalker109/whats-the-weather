import React from "react";
import "./WeatherDetail.css";

const tempUnits = [
  ["°C", temp => (temp - 273.15).toFixed(2)],
  ["K", temp => temp]
];

const WeatherDetail = ({ weatherData, activeTempUnit }) => {
  const {
    name,
    main: { temp, pressure, humidity }
  } = weatherData;

  const [tempSymbol, tempConvertFn] = tempUnits[activeTempUnit];

  return (
    <div className="wd">
      <h2 className="wd__city">{name}</h2>
      <ul className="wd__info">
        <li>{`${tempConvertFn(temp)} ${tempSymbol}`}</li>
        <li>{pressure} hpa</li>
        <li>{humidity} %</li>
      </ul>
    </div>
  );
};

const TempUnitToggle = ({ onClick, activeTempUnit }) => {
  const [tempUnitSymbol] = tempUnits[activeTempUnit];
  const [otherTempUnitSymbol] = tempUnits[Number(!activeTempUnit)];

  return (
    <div className="wd__temp-unit-info">
      <div>Showing temps in {tempUnitSymbol}</div>
      <span className="wd__temp-unit-toggle" onClick={onClick}>
        Show in {otherTempUnitSymbol}
      </span>
    </div>
  );
};

export default WeatherDetail;
export { TempUnitToggle };
