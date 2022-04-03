// #4 - s9
// Better Errors and Refactoring

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // logs location of the err

  // if no "res.status()" => then "500"
  err.statusCode = err.statusCode || 500;
  // if no "status:" => then "status: 'error'"
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
