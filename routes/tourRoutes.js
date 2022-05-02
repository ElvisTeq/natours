const express = require('express');
const fs = require('fs');

const tourController = require('./../controllers/tourController.js');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();
//_________________________________________________________________________
// #10 - s11
// Implementing Simple Nested Routes

/*
router
  // Crating req.params
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
*/

// #11- s11
// Nested Routes With Express

// if URL = contains "/:tourId/reviews" => use "reviewRouter"
// this.URL => api/v1/tours
// Contains => /tourId/reviews
// reviewRouter => api/v1/tours/tourId/reviews
router.use('/:tourId/reviews', reviewRouter);
// /: => req.params

// #15 _______________________________________________________________

// Param Middleware
/*
// Middleware that only run with certain params
router.param('id', tourController.checkID);
// in 'id' => do 'tourController.checkID'
*/
// #12 _______________________________________________________________
// User Routes

// get Top-5-Cheap when router hits "/top-5-cheap"
router
  .route('/top-5-cheap')
  // localhost:3000/api/v1/tours/top-5-cheap
  .get(tourController.aliasTopTours, tourController.getAllTours);
// aliasTopTours => Middleware to get "req.query" for "getAllTours" to show

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
// /:year => to manually give "req.params" to "/monthly-plan"

//_________________________________________________________________________________
// #23 -s11
// Geospatial Queries: Finding Tours Within Radius

router
  .route('/tours-within/:distance/:center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// URL Ex => /tours-within?distance=233&center=-40,45&unit=mi
// Better URL => /tours-within/233/center/-40,45/unit/mi

//_________________________________________________________________________________
// #24 - s11
// Geospatial Aggregation: Calculating Distances

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// URL Ex => /distances/34.111745,-118.113491/unit/mi

//_________________________________________________________________________________
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
// checkBody function deleter
// '/' => '/api/v1/tours'

// app.get('/api/v1/tours/:id?', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
router
  .route('/:id')
  // We need only the id because the rest of the route is defined by "app.use()" in "app.js"
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
