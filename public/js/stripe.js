/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

// Get Public Key
const stripe = Stripe(
  'pk_test_51Kz7kCIB9kZjHQgvdyGeZWXG1cT1f8SZVg6bcdxnpCQ21vS9QR7lLzFxn9xGzkDqi6I2cfDYouRBVr6s2izKHoU000HI2ybRs1'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    // (tourId) => from "tour.pug" ${tour.id} of current user (was stored as dataset.tour.id)
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // (session.data) => contains all info about the request
    //console.log(session);

    // 2) Create checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
