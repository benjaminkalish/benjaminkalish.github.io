/* global google*/
/* global $ */
(function () {
  'use strict';

  let data = [];

  $('#sidebar').click(mapMarker);

  function mapMarker(e) {
    let index = e.target.parentNode.index;
    if (index || index === 0) {
      const newPositon = { lat: data[index].lat, lng: data[index].lng };
      const newMarker = new google.maps.Marker({
        position: newPositon,
        map: map,
        title: data[index].title
      });
      newMarker.addListener('click', () => {
        infoWindow.setContent(e.target.parentNode.innerHTML);
        infoWindow.open(map, newMarker);
      });
      infoWindow.close();
      map.panTo(newPositon);
    }
  }

  const bmgLoc = { lat: 40.09584720509516, lng: -74.22222707431865 };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: bmgLoc,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    controlSize: 25
  });

  const infoWindow = new google.maps.InfoWindow();

  $('button').click(search);

  function search() {
    loadContent(`http://api.geonames.org/wikipediaSearch?q=${$('input').val()}&maxRows=10&username=bkalish&type=json`);
    $('.results').remove();
  }

  async function loadContent(filename) {
    try {
      const response = await fetch(filename);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      let received = await response.json();
      data = received.geonames;
      divFactory(data);
    } catch (e) {
      console.log(`nope: ${e.message}`);
    }
  }

  function divFactory(data) {
    for (let i = 0; i < data.length; i++) {
      let newDiv = $('<div class="results"></div>');
      newDiv.append(`
            <img src="${data[i].thumbnailImg || ''}">
            <h4>${data[i].title}</h4>
            <article>
              ${data[i].summary}
              <a href="https://${data[i].wikipediaUrl}" target="blank">Wikipedia</a>
            </article>
      `);
      $('#sidebar').append(newDiv);
      newDiv[0].index = i;
    }
  }

})();