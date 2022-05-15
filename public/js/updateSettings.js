// updateData fuction

import axios from 'axios';
import { showAlert } from './alert';

// export const updateData = async (name, email) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe', // url from out API (postman)
//       data: {
//         name,
//         email,
//       },
//     });
//     if ((res.data.status = 'success'))
//       showAlert('success', 'Your info has been updated');
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// (type) => password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword' // url from out API (postman)
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      // We pass {name, email} as (data) in "index.js"
      // Or { passwordCurrent, password, passwordConfirm }
      data,
    });
    if ((res.data.status = 'success'))
      showAlert('success', `${type.toUpperCase()} has been updated`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
