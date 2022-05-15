const express = require('express');
const fs = require('fs');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Need to be looged in before doing any request from here
router.use(authController.protect);
// "/" => /api/v1/bookings
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// Restricting request from here
router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking); // Automatically creates when Successfull payment

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
