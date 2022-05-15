const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

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

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404)); // 404 (not found)
  }

  // 2) Render Template using data from "1)"
  // .set() => added to fix error from Mapbox
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    // )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
  console.log(tour.user);
});

// Display Login form
exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    // Remember to put title for the HTML property to show on the window
    title: 'Log into your account',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings from current user
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with all IDs from user's Bookings
  // Get tour IDs
  const tourIDs = bookings.map((el) => el.tour); // (el.tour.id) => tour IDs are stored in a ARRAY already
  // Get tours with the IDs
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      // req.body => was returning {empthy}
      // Added => app.use(express.urlencoded) => To parse incoming data
      name: req.body.name, // (name='name') in "account.pug"
      email: req.body.email, // (name='email')
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    tutle: 'Your account',
    user: updatedUser, // Make sure to display updatedUser
  });
});
