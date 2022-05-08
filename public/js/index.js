/* eslint-disable */

import '@babel/polyfill'; // => package to make New JS features to work on Older Browsers
import { displayMap } from './mapbox';
import { login } from './login';

// DOM ELEMENTS (To prevent error if content don't exist)

// Get "#map" data in "tour.pug"
const mapBox = document.getElementById('map');
// Quering/Getting input value from "login.pug"
const loginForm = document.querySelector('.form');

// DELEGATION

if (mapBox) {
  // JSON.parse => to conver to JSON (is was stored as a String)
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent Reloading
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
