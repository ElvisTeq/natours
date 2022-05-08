/* eslint-disable */

const login = async (email, password) => {
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
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message); // to get error from "axios"
  }
};

// Quering/Getting input value from "login.pug"
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent Reloading
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
