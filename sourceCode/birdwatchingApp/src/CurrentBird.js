import React, { useState, useEffect, } from "react";

export default function CurrentBird(props) {

    const { comName, distance, howMany, locName, locationPrivate, obsDt, sciName, lat, lng } = props.bird;
    const [imgUrl, setImgUrl] = useState();

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            try {
                const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&format=json&pithumbsize=100&generator=search&gsrsearch=${sciName}&gsrlimit=1&redirects=1&origin=*`, {
                    signal: abortController.signal
                });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setImgUrl(Object.values(data.query.pages)[0].thumbnail.source);
            } catch (e) {
                if (e.name === 'AbortError') {
                    console.log(`fetch cancelled: ${e.message}`);
                }
                else {
                    console.error(e.message);
                    setImgUrl();
                }
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [sciName]);

    useEffect(()=>{
        props.setBirdCoords(lat, lng, distance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng, distance]);

    return (
        <div>
            <figure>
                <img src={imgUrl} alt={comName} />
                <figcaption>{comName}</figcaption>
            </figure>
            <ul>
                <li>{howMany} observed at {new Date(obsDt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                {!locationPrivate && <li>{locName}</li>}
                <li>{Math.round(distance * 100) / 100} miles away</li>
            </ul>
        </ div>
    );
}