const express = require('express');
const fs = require('fs');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

// mergeParams: true => Allows "router.use('/:tourId/reviews', reviewRouter)" from "tourRoutes" to work
const router = express.Router({ mergeParams: true });
// This makes that "/" = 'api/v1/tours/tourId/reviews'

router
  // "/" = '/api/v1/reviews'
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  // "/:id" => '/api/v1/reviews/id'
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
