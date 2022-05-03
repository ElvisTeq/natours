const express = require('express');
// express contains a bunch of function we can use

const morgan = require('morgan');
// Automatically logs in the terminal some data about our request

const rateLimit = require('express-rate-limit');
// Securing HTTP Headers
const helmet = require('helmet');

// Sanitization agains NoDQL query injection
const mongoSanitize = require('express-mongo-sanitize');
// sanitization agains XSS
// To manipulate Path names
const path = require('path');
const xss = require('xss-clean');
// Prevent Parameters Pollution
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
// We store/assign the functions to 'app'

//____________________________________________________________________
// #1 - s12
// Setting up Pug in Express

app.set('view engine', 'pug');
// Defining "view" location
app.set('views', path.join(__dirname, 'views'));
// same as => app.set('views', './views'));
// But is not ideal => other dev could have "./" in a different folder

//____________________________________________________________________
// 1) Global Middlewares
// => functions that can modify incoming request data
// #17 _____________________________________________________________
// Serving Static Files
app.use(express.static(path.join(__dirname, 'public')));
// __dirname => this file name

//_________________________________________________________________
// #20 - s10
// Setting Security HTTP Headers
app.use(helmet());

// _________________________________________________________________
// #19 - s10
// Implementing Rate Limiting

const limiter = rateLimit({
  // 100 request
  max: 100,
  // 1 Hour in Milliseconds
  windowMs: 60 * 60 * 1000,
  // Err message
  message: 'Too many request from this IP, please try again in an hour!',
});

// Apply limiter to "/api"
// => if URL contains /api
app.use('/api', limiter);

// #18 _____________________________________________________________
// Environment Variables

// if we are on development mode, automatically run morgan.dev
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// _________________________________________________________________
// #21 - s10
// Data Sanitization agains NoDQL query injection
app.use(mongoSanitize());
// "email": { "$gt": "" } => no longer works

// Data sanitization agains XSS
app.use(xss());

// _________________________________________________________________
// #22 - s10
// Preventing Parameters Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// #10 _____________________________________________________________
// Creating Middleware

// app.use((req, res, next) => {
//   console.log('Hello from the middleware..');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//____________________________________________________________________
// #1 - s12
// Rendering base.pug

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Elvis',
  });
  // .render('base') => "base.pug"
  // Possible because => We setted Pug Express Before
});

// #13 _______________________________________________________________
// Mounting Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//  __________________________________________________________________
// #2 - S9
// Handling Unhandled Routes

// .all() => .get, post, delete, find.
// '*' => Everything => all URLs
app.all('*', (req, res, next) => {
  // Any Argument is passed into "next()" => is a error
  // This causes all Middleware to skip into the Global Error Handling Middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//  __________________________________________________________________
// #3 - S9
// Global Error Handling Middleware

app.use(globalErrorHandler);

module.exports = app;

// ___________________________________________________________________
// Start Server => moved to another module

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

// #14 _____________________________________________________________
// Everything below was refactored to its own module

// #3 ______________________________________________________________

// // File was a json file
// // JSON.parse => to convert into JS
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// // req.requestTime => middleware created for 'app'
// // getAllTours => is called by 'app'
// const getAllTours = (req, res) => {
//   console.log(req.requestTime);

//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// // #5 ________________________________________________________________

// const getTour = (req, res) => {
//   // req.params => all parameters enter on the URL
//   console.log(req.params);

//   // Get ID param in URL & convert to number
//   const id = req.params.id * 1;

//   // Get tour based on ID enter
//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
//   }

//   // Display tour from ID
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };

// // #4 ________________________________________________________________

// const createTour = (req, res) => {
//   // console.log(req.body);

//   // Creating new tours/ID
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   // req.body => What we want to post, it was what we typed in the Postman body

//   tours.push(newTour);

//   // To add/save data into the file
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     // File to override
//     JSON.stringify(tours),
//     // Data that we want to write to the file
//     // JSON.stringify => because File is written in .json
//     (err) => {
//       // res => display result
//       res.status(201).json({
//         // 201 => created
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };

// // #6 ________________________________________________________________
// // Updating existing tours

// const updateTour = (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
//   }

//   res
//     .status(200)
//     .json({ status: 'success', data: { tour: '<Updated tour Here...>' } });
// };

// // #7 ________________________________________________________________
// // Deleting Tours

// const deleteTour = (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
//   }

//   res.status(204).json({ status: 'success', data: null });
// };

// // #12 _______________________________________________________________
// // User methods

// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet define',
//   });
// };

// const createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet define',
//   });
// };

// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet define',
//   });
// };

// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet define',
//   });
// };

// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet define',
//   });
// };

// // __________________________________________________________________
// // Tour Routes

// // #13 _______________________________________________________________
// // Creating and Mounting Multiple Routers

// // Creating router
// const tourRouter = express.Router();
// const userRouter = express.Router();

// // Mounting Router
// // app.use('/api/v1/tours', tourRouter);
// // app.use('/api/v1/users', userRouter);

// // => moved to below
// // => Needs to be declared after the methods

// // __________________________________________________________________
// // tourRouters.js => own module

// /*
// // app.get('/api/v1/tours', getAllTours);
// // app.post('/api/v1/tours', createTour);

// tourRouter.route('/').get(getAllTours).post(createTour);
// // '/' => because we already defined '/api/v1/tours' by "app.use()"

// // app.get('/api/v1/tours/:id?', getTour);
// // app.patch('/api/v1/tours/:id', updateTour);
// // app.delete('/api/v1/tours/:id', deleteTour);

// tourRouter
//   .route('/:id')
//   // We need only the id because the rest of the route is already defined by "app.use()"
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);
//   */

// // #12 _______________________________________________________________
// // User Routes

// userRouter.route('/').get(getAllUsers).post(createUser);

// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
