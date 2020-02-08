import React, { useReducer, useState } from "react";
import config from "../../config";
import CountdownTimer from "../CountdownTimer";
import WeatherDetail, { TempUnitToggle } from "../WeatherDetail";
import WeatherHistory from "../WeatherHistory";
import WeatherSearch, { getWeatherData } from "../WeatherSearch";

const WeatherPanel = () => {
  const [weatherData, reduceWeatherData] = useReducer(
    (history, latest) =>
      Array.isArray(latest) ? latest : [latest, ...history.slice(0, 5)],
    []
  );

  const updateWeatherData = async () => {
    const newWeatherData = Promise.all(
      weatherData.map(city =>
        getWeatherData({ paramName: "id", term: city.id })
      )
    );

    reduceWeatherData(await newWeatherData);
  };

  const [activeCity, setActiveCity] = useState(0);

  const [activeTempUnit, setActiveTempUnit] = useState(0);
  const toggleActiveTempUnit = () => setActiveTempUnit(Number(!activeTempUnit));

  return (
    <div className="wp">
      <header className="wp__header">
        <h1>Your weather</h1>
      </header>
      <main>
        <section className="wp__input">
          <WeatherSearch handleSearchResult={reduceWeatherData} />
        </section>
        <section className="wp__detail">
          {weatherData.length > 0 && (
            <WeatherDetail
              weatherData={weatherData[activeCity]}
              activeTempUnit={activeTempUnit}
            />
          )}
        </section>
        <section className="wp__toggle">
          <TempUnitToggle
            onClick={toggleActiveTempUnit}
            activeTempUnit={activeTempUnit}
          />
        </section>
        <section className="wp__timer">
          <CountdownTimer
            duration={config.countdownMs}
            onFinished={updateWeatherData}
            loop={true}
          />
        </section>
      </main>
      <aside className="wp__history">
        {weatherData.length > 1 && (
          <WeatherHistory weatherData={weatherData} onClick={setActiveCity} />
        )}
      </aside>
    </div>
  );
};

export default WeatherPanel;
