import React, { useState } from "react";
import config from "../../config";

/**
 * Get updated weather data and pass it to our handler func
 * @param {string} location
 * @param {function} handleSearchResult
 */
const getWeatherData = async (location, handleSearchResult) => {
  try {
    const url = new URL(config.openweather.url);
    url.searchParams.append("appid", config.openweather.apiKey);
    url.searchParams.append("q", location);
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(
        `An error occurred while fetching weather data [${result.status}: ${result.statusText}]`
      );
    }

    handleSearchResult(await result.json());
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

  return (
    <div className="wi">
      <form
        onSubmit={e => {
          e.preventDefault();
          getWeatherData(location, handleSearchResult);
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
      </form>
    </div>
  );
};

export default WeatherSearch;
