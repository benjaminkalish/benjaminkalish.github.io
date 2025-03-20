import React from "react";

export default function WeatherDisplay(props) {
  const {
    temperature,
    name,
    temperatureUnit,
    shortForecast,
    icon,
    windSpeed,
    windDirection,
    probabilityOfPrecipitation: { value: rainChance },
  } = props.forecast;
  return (
    <>
      <figure>
        <img src={icon} alt={shortForecast} />
        <figcaption>{shortForecast}</figcaption>
      </figure>
      <div>
        <h5>{name}</h5>
        <ul>
          <li>
            {temperature}&#176;{temperatureUnit}
          </li>
          <li>Precipitation: {rainChance}%</li>
          <li>
            Wind: {windDirection} {windSpeed}
          </li>
        </ul>
      </div>
    </>
  );
}
