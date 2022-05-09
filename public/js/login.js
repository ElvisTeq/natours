/* eslint-disable */

// import library
import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST', // Type of request
      url: 'http://127.0.0.1:3000/api/v1/users/login', // URL to request
      data: {
        email, // email: email
        password, // password: password
      },
    });

    // If login success => Display alert message
    // => Set timer to ".assign" => redirect to "/" main page
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message); // to get error from "axios"
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });

    if ((res.data.status = 'success')) location.reload(true); // Forces a reload form the server and not from browser
  } catch (err) {
    showAlert('error', 'Error logging out!');
  }
};
