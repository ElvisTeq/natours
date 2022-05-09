/* eslint-disable */

import '@babel/polyfill'; // => package to make New JS features to work on Older Browsers
import { displayMap } from './mapbox';
import { login, logout } from './login';

// DOM ELEMENTS (To prevent error if content don't exist)
const mapBox = document.getElementById('map'); // Get "#map" data in "tour.pug"
const loginForm = document.querySelector('.form'); // Quering/Getting input value from "login.pug"
const logOutBtn = document.querySelector('.nav__el--logout'); // Selecting Logout button

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

if (logOutBtn) logOutBtn.addEventListener('click', logout);
