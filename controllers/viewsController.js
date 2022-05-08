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

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the Data, for the requested tour (including reviews and guides)
  // .populate() => to include 'review rating user' from 'reviews'
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2) Build template

  // 3) Render Template using data from "1)"

  // .set() => added to fix error from Mapbox
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  res.status(200).render('login', {
    // Remember to put title for the HTML property to show on the window
    title: 'Log into your account',
    email,
    password,
  });
});
