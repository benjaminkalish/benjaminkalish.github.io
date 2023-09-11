import './App.css';
import Weather from './Weather';
import Bird from './Bird';
import ZipPrompt from './ZipPrompt';
import Map from './Map';
import React, { useState, useEffect, } from 'react';

function App() {

  const [state, setState] = useState({
    zip: null,
    coords: null,
    invalid: false,
    err: false,
    isLoading: false,
    forceRender: 0,
    birdCoords: null
  });

  useEffect(() => {
    const abortController = new AbortController();

    if (state.zip) {
      getZipCoordinates(state.zip);
    }
    else {
      tryGeolocation();
    }


    function tryGeolocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        localStorage.location = JSON.stringify({ lat: lat, lng: lng });
        setState({ ...state, coords: { lat: lat, lng: lng } })
      }, tryLocalStorage());
    }

    function tryLocalStorage() {
      if (localStorage.location) {
        const { lat, lng } = JSON.parse(localStorage.location);
        setState({ ...state, coords: { lat: lat, lng: lng } })
      }
    }


    async function getZipCoordinates(newZip) {
      try {
        const response = await fetch(`https://secure.geonames.org/postalCodeSearch?postalcode=${newZip}&maxRows=1&username=bkalish&type=json&country=usa`, {
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.postalCodes.length) {
          const badZip = new Error('Invalid Zip Code')
          badZip.name = 'ZipError';
          throw badZip;
        }
        let { lat, lng } = data.postalCodes[0];
        localStorage.location = JSON.stringify({ lat: lat, lng: lng });
        setState({ ...state, invalid: false, isLoading: false, coords: { lat: lat, lng: lng } })
      } catch (e) {
        console.error(e.message);
        if (e.name === 'ZipError') {
          setState({ ...state, invalid: true })
        }
        else {
          setState({ ...state, err: true })
        }
      }
    }

    return () => {
      abortController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.zip, state.forceRender]);

  function setBirdCoords(birdLat, birdLng, birdDist) {
    if (birdLat === undefined) {
      setState({ ...state, birdCoords: null });
    }
    else {
      setState({ ...state, birdCoords: { lat: birdLat, lng: birdLng, distance: birdDist } });
    }
  }

  return (
    <>
      {(state.invalid || !state.coords) && <ZipPrompt state={state} setState={setState} /* invalid={state.invalid} */ />}

      {state.err && <div>Unnable to retrieve location.</div>}
      {state.coords &&
        <main>
          <div id='banner'><span>{Math.round(state.coords.lat * 100) / 100}N, {-1 * Math.round(state.coords.lng * 100) / 100}W</span>
            <button onClick={() => setState({ ...state, coords: null })}>Change Location</button></div>
          <div>
            <Weather coords={state.coords} />
            <Bird coords={state.coords} setBirdCoords={setBirdCoords} />
          </div>
          {state.birdCoords !== undefined && <Map coords={state.coords} birdCoords={state.birdCoords}></Map>}
        </main>
      }
    </>
  );
}

export default App;
