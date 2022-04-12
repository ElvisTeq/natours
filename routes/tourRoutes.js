const express = require('express');
const fs = require('fs');

const tourController = require('./../controllers/tourController.js');
const authController = require('./../controllers/authController');

const router = express.Router();

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
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
// /:year => to manually give "req.params" to "/monthly-plan"

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
// checkBody function deleter
// '/' => We will define '/api/v1/tours' by "app.use()" in "app.js"

// app.get('/api/v1/tours/:id?', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
router
  .route('/:id')
  // We need only the id because the rest of the route is defined by "app.use()" in "app.js"
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
