const express = require('express');
const fs = require('fs');

const tourController = require('./../controllers/tourController.js');

// #12 _______________________________________________________________
// User Routes

const router = express.Router();

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
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
