const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// ________________________________________________________________
// #5
// Jason Web Token (JWT)

// Creating token => always uses ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: => logs out the user
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // ________________________________________________________________
  // #5
  // Jason Web Token (JWT)
  // signing up Users

  // Creating token
  const token = signToken(newUser._id);
  // ________________________________________________________________
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
// ________________________________________________________________
// #6 = s10
// Logging in Users

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email/password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exist && password is correct
  // .select('+') => to explicitly select password, because is hidden in the schema
  const user = await User.findOne({ email }).select('+password');

  // user => instance of userSchema => contain ".correctPassword()"
  // if !user || password !== encryptPassword => error
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

// ________________________________________________________________
// #7 - #8 = s10
// Protecting Tour Routes - p1 - p2

// This runs everytime a request happends for security

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if exist
  let token;
  if (
    // authorization => header name that contains "Bearer Token"
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  // decoded => contains => id, creationDate (iat), expDate (exp) of the object
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('Token belonging to this User does no longer exist.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // Grant Access to protected Route
  // Store changes to "req.user" => is what moves from middleware to the others
  req.user = currentUser;
  next();
});

// ________________________________________________________________
// #10 = s10
// Authorization: User Roles and Permissions

// (...roles) => argument for the middleware function
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// ________________________________________________________________
// #11 - s10
// Password Reset Functionality: Reset Token

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email'));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  // required data from the schema: false
  await user.save({ validateBeforeSave: false });
  // because we only need to input the email to get out password

  // 3) Send it to user's email
});
