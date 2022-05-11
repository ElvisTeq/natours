/* eslint-disable */

import '@babel/polyfill'; // => package to make New JS features to work on Older Browsers
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS (To prevent error if content don't exist)
const mapBox = document.getElementById('map'); // Get "#map" data in "tour.pug"
const loginForm = document.querySelector('.form--login'); // Quering/Getting input value from "login.pug"
const logOutBtn = document.querySelector('.nav__el--logout'); // Selecting Logout button
const userDataForm = document.querySelector('.form-user-data'); // Selecting user data Form
const userPasswordForm = document.querySelector('.form-user-password');

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

    const form = new FormData(); // Create form
    // Add data to form with name: value
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...'; // Button message

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    // Using await => So we can clear imput field right away
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password'; // Button message
    // Clearing imput field
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
