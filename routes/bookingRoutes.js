const express = require('express');
const fs = require('fs');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

// "/" => /api/v1/bookings
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
