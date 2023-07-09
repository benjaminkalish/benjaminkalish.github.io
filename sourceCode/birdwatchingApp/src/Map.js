import duck from './duck.png';
import React, { useCallback, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: "AIzaSyD1qP-q5GuVMrkvWcT3MnGYelq1IqW5HDM",
  version: "weekly",
  libraries: ["places"]
});

export default function Map({ coords, birdCoords }) {

  const g = useRef();
  const m = useRef();
  const homeMarker = useRef();
  const birdMarker = useRef();

  const setMarkers = useCallback(function (google, map) {
    homeMarker.current = new google.maps.Marker({
      position: coords,
      map: map,
      title: 'You are here'
    });
    if (birdCoords) {
      birdMarker.current = new google.maps.Marker({
        position: birdCoords,
        map: map,
        icon: duck,
        animation: google.maps.Animation.BOUNCE,
        title: 'Bird is here'
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(coords);
      bounds.extend(birdCoords);
      map.fitBounds(bounds);
    }
  }, [coords, birdCoords]);

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: coords,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        controlSize: 25
      });

      g.current = google;
      m.current = map;
      setMarkers(google, map);
    })
      .catch(e => {
        console.error(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (g.current && m.current && coords && birdCoords) {
      const google = g.current;
      const map = m.current;
      setMarkers(google, map);
    }
    return (() => {
      if (birdMarker.current) {
        birdMarker.current.setMap(null);
      }
    });
  }, [coords, birdCoords, setMarkers]);

  return (
    <div id='map'></div>
  )
}
