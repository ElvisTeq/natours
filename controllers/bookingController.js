// Using stripe => add secret key after "require"render
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // URL to deridect when success payment
    // Adding variables to URL for "createBookingCheckout()"
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // URL to deridect when cancel payment
    customer_email: req.user.email, // autofill customer email
    client_reference_id: req.params.tourId, // ID reference for the client
    // Info about the product
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`], // takes a array if images
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3) Crease session as response
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createBookingCheckout = async (req, res, next) => {
  // Temporary solution (unsecure)
  // Variables were added on (success_url:) in "getCheckoutSession"
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  // Hidding req.query
  res.redirect(req.originalUrl.split('?')[0]);
  // This will redirect to ("/") => which will trigger (.get('/')) in "viewRoutes.js"
  // No need to call next() => This function will be called again with no (req.query)
};
