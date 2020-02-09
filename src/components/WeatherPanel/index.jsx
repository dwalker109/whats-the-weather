import React, { useReducer, useState } from "react";
import config from "../../config";
import CountdownTimer from "../CountdownTimer";
import WeatherDetail, { TempUnitToggle } from "../WeatherDetail";
import WeatherHistory from "../WeatherHistory";
import WeatherSearch, { getWeatherData } from "../WeatherSearch";
import "./WeatherPanel.css";

const WeatherPanel = () => {
  const [activeCity, setActiveCity] = useState(0);

  const [activeTempUnit, setActiveTempUnit] = useState(0);
  const toggleActiveTempUnit = () => setActiveTempUnit(Number(!activeTempUnit));

  const [weatherData, reduceWeatherData] = useReducer((history, latest) => {
    setActiveCity(0);
    return Array.isArray(latest) ? latest : [latest, ...history.slice(0, 5)];
  }, []);

  const updateWeatherData = async () => {
    const newWeatherData = Promise.all(
      weatherData.map(city =>
        getWeatherData({ paramName: "id", term: city.id })
      )
    );

    reduceWeatherData(await newWeatherData);
  };

  return (
    <>
      <aside className="wp__sidebar">
        {/* Blank to center sidebar layout*/}
      </aside>
      <div className="wp">
        <header>
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
        </main>
        <footer>
          <TempUnitToggle
            onClick={toggleActiveTempUnit}
            activeTempUnit={activeTempUnit}
          />
          <CountdownTimer
            duration={config.countdownMs}
            onFinished={updateWeatherData}
            loop={true}
          />
        </footer>
      </div>
      <aside className="wp__sidebar">
        {weatherData.length > 0 && (
          <WeatherHistory weatherData={weatherData} onClick={setActiveCity} />
        )}
      </aside>
    </>
  );
};

export default WeatherPanel;
