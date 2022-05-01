const express = require('express');
const fs = require('fs');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

// mergeParams: true => Allows "router.use('/:tourId/reviews', reviewRouter)" from "tourRoutes" to work
const router = express.Router({ mergeParams: true });
// This makes that "/" = 'api/v1/tours/tourId/reviews'

// Protecting all routers after this middleware
router.use(authController.protect);

router
  // "/" = '/api/v1/reviews'
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  // "/:id" => '/api/v1/reviews/id'
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
