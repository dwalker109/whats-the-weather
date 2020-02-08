import React, { useState } from "react";
import WeatherDetail from "../WeatherDetail";
import WeatherSearch from "../WeatherSearch";

const WeatherPanel = () => {
  const [weatherData, setWeatherData] = useState();

  return (
    <div className="wp">
      <header className="wp__header">
        <h1>Your weather</h1>
      </header>
      <main>
        <section className="wp__input">
          <WeatherSearch handleSearchResult={setWeatherData} />
        </section>
        <section className="wp__detail">
          {weatherData && <WeatherDetail weatherData={weatherData} />}
        </section>
        <section className="wp__timer"></section>
      </main>
      {/* <aside className="wp__history"></aside> */}
    </div>
  );
};

export default WeatherPanel;
