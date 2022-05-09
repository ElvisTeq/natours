const AppError = require('./../utils/appError');

// #4 - s9
// Better Errors and Refactoring

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  // Object.values => Get all err.errors values
  // .map() => get each err.errors.message
  const errors = Object.values(err.errors).map((el) => el.message);

  // .join('. ') => joins them together in a string separated by ". "
  const message = `Invalid Input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Expired token, please log in again!', 401);

const sendErrorDev = (err, req, res) => {
  // A) API (req.originalUrl) = Everyrhing after (localhost:3000)
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) Render "error" template
  console.error('ERROR', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  // A) API (Check if error is from Back-End)
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational. trusted error: send message to client
    // appError() => gives the ".isOperational" when is called
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: Don't leak error details to client
    // 1) Log error
    console.error('ERROR', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very Wrong!',
    });
  }

  // B) RENDERED WEBSITE (If Error is from the User)
  // A) Operational. trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: Don't leak error details to client
  // 1) Log error
  console.error('ERROR', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later.',
  });
};
module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // logs location of the err

  // if no "res.status()" => then "500"
  err.statusCode = err.statusCode || 500;
  // if no "status:" => then "status: 'error'"
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    // creating a copy of error using destructuring
    let error = { ...err };
    error.message = err.message; // Fixed bug (error undefined) in Production Mode

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === 'Validation failed')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
