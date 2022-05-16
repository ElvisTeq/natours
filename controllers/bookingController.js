// Using stripe => add secret key after "require"render
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
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

    //        **** This was for the "createBookingCheckout() ****
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,

    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // URL to deridect when cancel payment
    customer_email: req.user.email, // autofill customer email
    client_reference_id: req.params.tourId, // ID reference for the client
    // Info about the product
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
        ], // takes a array if images
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

// Get data using the data pass on stripe to create pay session
const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

// Using Stripe Webhook (when payment is Success)
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET // Secret key from Stripe Webhook
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // We defined this in "Stripe" Webhook creation
  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object); // event.data.object === (session)

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

/*
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
*/
