import React, { useReducer, useState } from "react";
import WeatherDetail from "../WeatherDetail";
import WeatherHistory from "../WeatherHistory";
import WeatherSearch from "../WeatherSearch";

const WeatherPanel = () => {
  const [weatherData, unshiftWeatherData] = useReducer(
    (history, latest) => [latest, ...history.slice(0, 5)],
    []
  );

  const [activeCity, setActiveCity] = useState(0);

  return (
    <div className="wp">
      <header className="wp__header">
        <h1>Your weather</h1>
      </header>
      <main>
        <section className="wp__input">
          <WeatherSearch handleSearchResult={unshiftWeatherData} />
        </section>
        <section className="wp__detail">
          {weatherData.length > 0 && (
            <WeatherDetail weatherData={weatherData[activeCity]} />
          )}
        </section>
        <section className="wp__timer"></section>
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
