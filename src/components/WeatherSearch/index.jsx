import React, { useState } from "react";
import config from "../../config";
import debugData from "../../data/weather.json";
/**
 * Get updated weather data and pass it to our handler func
 * @param {string} location
 * @param {function} handleSearchResult
 * @return {promise<object>}
 */
export const getWeatherData = async ({ paramName, term }) => {
  try {
    const url = new URL(config.openweather.url);
    url.searchParams.append("appid", config.openweather.apiKey);
    url.searchParams.append(paramName, term);
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(
        `An error occurred while fetching weather data [${result.status}: ${result.statusText}]`
      );
    }

    return result.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Component to handle making weather API requests
 * @param {object} props
 */
const WeatherSearch = ({ handleSearchResult }) => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className="wi">
      <form
        onSubmit={async e => {
          e.preventDefault();
          const weatherData = await getWeatherData(
            { paramName: "q", term: location },
            handleSearchResult
          );

          if (weatherData) {
            setError(null);
            handleSearchResult(weatherData);
            setLocation("");
          } else {
            setError(
              `An error occurred while fetching weather for ${location}`
            );
          }
        }}
      >
        <label>
          Enter your location:
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <span className="wi__error">{error}</span>
      </form>
    </div>
  );
};

export default WeatherSearch;
