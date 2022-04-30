const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  // api/v1/tours/tourId/reviews
  if (req.params.tourId) filter = { tour: req.params.tourId };

  // if filter is empthy, .find() empthy => return all
  const reviews = await Review.find(filter);

  if (!reviews) {
    return new AppError('Tour does not have any reviews yet', 404);
  }

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Get tourId from "req.params"
  if (!req.body.tour) req.body.tour = req.params.tourId;
  // req.user.id => comes from "protect()"
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
