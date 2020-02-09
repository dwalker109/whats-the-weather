import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import WeatherHistory from "./index";

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

const weatherData = Array.from({ length: 5 }).map((x, i) => ({
  name: `City ${i}`
}));

it("Can display many history items", () => {
  act(() => {
    render(
      <WeatherHistory weatherData={weatherData} onClick={() => null} />,
      container
    );
  });

  expect(container.querySelectorAll("ul.wh__city > li")).toHaveLength(5);
});
