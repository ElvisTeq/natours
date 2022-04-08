const AppError = require('./../utils/appError');

// #4 - s9
// Better Errors and Refactoring

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational. trusted error: send message to client
  // appError() => gives the ".isOperational" when is called
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: Don't leak error details to client
  } else {
    // 1) Log error
    console.error('ERROR', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very Wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // logs location of the err

  // if no "res.status()" => then "500"
  err.statusCode = err.statusCode || 500;
  // if no "status:" => then "status: 'error'"
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // creating a copy of error using destructuring
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(err);

    sendErrorProd(error, res);
  }
};
