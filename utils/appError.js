// #4 - s9
// Better Errors and Refactoring

// Error => build-in error
class AppError extends Error {
  constructor(message, statusCode) {
    // super => parent class
    // message => parent class message
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // When a new Obj is created, and the constructor function is called, the function call is not going to appear in the stackTrace and will not polluted
    Error.captureStackTrace(this, this.constructor);
    // this => current object
    // this.constructor => what to do with the object
  }
}

module.exports = AppError;
