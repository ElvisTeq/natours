/* eslint-disable */
// Disabling eslint for this file

// Get "#map" data in "tour.pug"
// JSON.parse => to conver to JSON (is was stored as a String)
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);
