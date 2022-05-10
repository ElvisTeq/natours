/* eslint-disable */

import '@babel/polyfill'; // => package to make New JS features to work on Older Browsers
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateData } from './updateSettings';

// DOM ELEMENTS (To prevent error if content don't exist)
const mapBox = document.getElementById('map'); // Get "#map" data in "tour.pug"
const loginForm = document.querySelector('.form--login'); // Quering/Getting input value from "login.pug"
const logOutBtn = document.querySelector('.nav__el--logout'); // Selecting Logout button
const userDataForm = document.querySelector('.form-user-data'); // Selecting user data Form

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

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateData(name, email);
  });
