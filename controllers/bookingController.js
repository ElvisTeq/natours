// Using stripe => add secret key after "require"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourID);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`, // URL to deridect when success payment
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // URL to deridect when cancel payment
    customer_email: req.user.email, // autofill customer email
    client_reference_id: req.params.tourID, // ID reference for the client
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
