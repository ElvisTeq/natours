/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert'); // get alert "class"
  if (el) el.parentElement.removeChild(el); // (DOM trick) to remove itself
};

// type: 'success' or 'error
export const showAlert = (type, msg) => {
  hideAlert(); // Remove ".alert" content
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup); // inside of "body" => insert "markup" document "afterbegin"
  window.setTimeout(hideAlert, 5000);
};
