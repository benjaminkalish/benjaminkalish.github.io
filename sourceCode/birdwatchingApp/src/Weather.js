import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import LoadAnimation from './LoadAnimation';
import ErrorComponent from './ErrorComponent';

export default function Weather(props) {
  const { lat, lng } = props.coords;
  const [forecast, setForcast] = useState();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    (async function getWeatherGrid() {
      const grid = await loadContent(`https://api.weather.gov/points/${lat},${lng}`);
      getLocalForecast(grid.properties.forecast);
    })();

    async function loadContent(url) {
      try {
        const response = await fetch(url, {
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      } catch (e) {
        if (e.name === 'AbortError') {
          console.log(`fetch cancelled: ${e.message}`);
        }
        else {
          console.error(e.message);
          setErrMsg('Unable to load weather.');
        }
      }
    }

    async function getLocalForecast(url) {
      const forecast = await loadContent(url);
      const todaysForcast = forecast.properties.periods[0];
      setForcast(todaysForcast);
    }

    return () => {
      abortController.abort();
    };

  }, [lat, lng]);

  return (
    <section id='weather' style={{ justifyContent: (forecast && !errMsg) ? 'space-evenly' : 'center' }}>
      {errMsg && <ErrorComponent msg={errMsg} />}
      {(!forecast && !errMsg) && <LoadAnimation />}
      {forecast && <WeatherDisplay forecast={forecast} />}
    </section>
  );
}