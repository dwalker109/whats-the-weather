import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import WeatherDetail, { TempUnitToggle } from "./index";

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

const weatherData = {
  name: "Test",
  main: {
    temp: 300,
    pressure: 1000,
    humidity: 50
  }
};

const activeTempUnit = 0; // Degrees C

it("Can display weather data for a city", () => {
  act(() => {
    render(
      <WeatherDetail
        weatherData={weatherData}
        activeTempUnit={activeTempUnit}
      />,
      container
    );
  });

  expect(container.querySelector(".wd__city").textContent).toBe("Test");
  expect(container.querySelectorAll("ul.wd__info > li")).toHaveLength(3);
});

it("Can init toggle between temp units", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <TempUnitToggle onClick={onClick} activeTempUnit={activeTempUnit} />,
      container
    );
  });

  const toggle = document.querySelector(".wd__temp-unit-toggle");

  act(() => {
    toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);
});
