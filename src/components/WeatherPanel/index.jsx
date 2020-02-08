import React, { useReducer, useState } from "react";
import WeatherDetail from "../WeatherDetail";
import WeatherHistory from "../WeatherHistory";
import WeatherSearch, { getWeatherData } from "../WeatherSearch";
import CountdownTimer from "../CountdownTimer";
import config from "../../config";

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
            <WeatherDetail weatherData={weatherData[activeCity]} />
          )}
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
