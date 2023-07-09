import React, { useState, useEffect } from 'react';
import distanceCalculator from "./distanceCalculator";
import CurrentBird from './CurrentBird';
import LoadAnimation from './LoadAnimation';
import ErrorComponent from './ErrorComponent';

export default function Bird(props) {
    const { lat, lng } = props.coords;
    const [state, setState] = useState({
        birdSightings: null,
        selectedBird: 0,
        errMsg: ''
    })

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            try {
                const response = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${Math.round(lat * 100) / 100}&lng=${Math.round(lng * 100) / 100}&sort=date&back=1&dist=10`, {
                    headers: {
                        'X-eBirdApiToken': 'pvj1qvdirvd3'
                    },
                    signal: abortController.signal
                });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.length) {
                    const noBird = new Error('No birds sighted here.')
                    noBird.name = 'NoBirdError';
                    throw noBird;
                }
                sortData(data);
            } catch (e) {
                if (e.name === 'NoBirdError') {
                    console.log(e.message)
                    props.setBirdCoords();
                    setState({ ...state, errMsg: 'No birds found here.' });
                }
                else if (e.name === 'AbortError') {
                    console.log(`fetch cancelled: ${e.message}`);
                }
                else {
                    console.error(e.message);
                    setState({ ...state, errMsg: 'Unable to load data.' });
                }
            }

            function sortData(data) {
                for (const datum of data) {
                    datum.distance = distanceCalculator(lat, lng, datum.lat, datum.lng);
                }
                data.sort((a, b) => { return a.distance - b.distance; });
                setState({ ...state, birdSightings: data });
            }
        })()

        return () => {
            abortController.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng]);

    function forward() {
        if (state.birdSightings.length) {
            if (state.selectedBird === state.birdSightings.length - 1) {
                setState({ ...state, selectedBird: 0 });
            }
            else {
                setState({ ...state, selectedBird: state.selectedBird + 1 });
            }
        }
    }

    function backward() {
        if (state.birdSightings.length) {
            if (state.selectedBird === 0) {
                setState({ ...state, selectedBird: state.birdSightings.length - 1 });
            }
            else {
                setState({ ...state, selectedBird: state.selectedBird - 1 });
            }
        }
    }


    return (
        <section id='bird' style={{ justifyContent: (state.birdSightings && !state.errMsg) ? 'space-between' : 'center' }}>
            {state.errMsg && <ErrorComponent msg={state.errMsg} />}
            {(!state.birdSightings && !state.errMsg) && <LoadAnimation />}
            {(state.birdSightings && !state.errMsg) && <>
            <span>{state.selectedBird + 1} of {state.birdSightings.length}</span>
                <button onClick={backward}>&#8249;</button>
                <CurrentBird bird={state.birdSightings[state.selectedBird]} setBirdCoords={props.setBirdCoords}/>
                <button onClick={forward}>&#8250;</button>
            </>}
        </section>
    );
}