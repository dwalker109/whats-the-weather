import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import WeatherSearch, { getWeatherData } from "./index";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const handleSearchResult = result => result;

it("Can display initial component", () => {
  act(() => {
    render(
      <WeatherSearch handleSearchResult={handleSearchResult} />,
      container
    );
  });

  expect(container.querySelector("label").textContent).toBe(
    "Enter your location:"
  );
});

it("Can query live weather API for London", async () => {
  const result = await getWeatherData({ paramName: "q", term: "london" });
  expect(result).toBeTruthy();
  expect(result.name).toBe("London");
});
