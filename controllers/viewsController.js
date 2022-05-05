const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

//____________________________________________________________________
// #5 - s12
// Extending Our Base Templates with Blocks

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from "1)"

  res.status(200).render('overview', {
    // #{title} => in pug
    title: 'All Tours',
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
