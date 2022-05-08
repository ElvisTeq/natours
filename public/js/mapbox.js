/* eslint-disable */
// Disabling eslint for this file

// Moved to "index.js"
/*
// Get "#map" data in "tour.pug"
// JSON.parse => to conver to JSON (is was stored as a String)
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);
*/

// Putting everything in a function for "export"
export const displayMap = (locations) => {
  //___________________________________________________________________________
  // #11 - s12
  // Including a Map with Mapbox - p1

  // Data from Mapbox Documentation
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2FoZW5vMTMxMiIsImEiOiJjbDJ2cW0xZTgwZWhsM3BvYTBzM3pjZGRrIn0.cHOwePsZizNWYdlN6AgqLg';

  // Creating map with Mapbox
  const map = new mapboxgl.Map({
    container: 'map', // container ID (#map in tour.pug)
    style: 'mapbox://styles/kaheno1312/cl2vrce1p001u14p8q7zjf6rt', // style URL (created in website)
    scrollZoom: false,
    // center: [-80.243273, 26.0999136], // lng, lat
    // zoom: 10, // zoom level
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds(); // Makings the map to display location in ".LngLatBounds()"

  locations.forEach((loc) => {
    // Create marker (CSS custom created icon)
    const el = document.createElement('div'); // Create HTML element
    el.className = 'marker'; // Assigning class name to the created "div", for CSS to style

    // Add marker (.Marker => mapbox method)
    new mapboxgl.Marker({
      element: el, // Marker element
      anchor: 'bottom', // marker will show above the target location
    })
      .setLngLat(loc.coordinates) // for each Add "Lng/Lat"
      .addTo(map); // for each add to the map

    // Adding popup message in map
    new mapboxgl.Popup({
      // Options
      offset: 30, // move 30px up
    })
      .setLngLat(loc.coordinates) // Display popup location
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`) // popup message
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates); // Making "bounds" to display "loc.coordinates" on map

    // Automatically set "zoom level" to show all "bounds" coordinates
    map.fitBounds(bounds, {
      // Map padding
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  });
};
