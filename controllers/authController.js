const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

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

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // ________________________________________________________________
  // #18 - s10
  // Creating cookie
  const cookieOptions = {
    expires: new Date(
      // 90 * 24 (hour) * 60 (minute) * 60 (seconds) * 1000 (milliseconds) = 90 days into milliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // Cookie cannot be modified/access in any way by the browser
    httpOnly: true,
  };

  // secure: true => Cookie will be sent in a incrypted connection
  // if False => It will appear in postman
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from the output
  user.password = undefined;
  // ________________________________________________________________
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
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

  createSendToken(newUser, 201, res);

  // ************** Refactored into "createSendToken" *****************
  // ________________________________________________________________
  // #5
  // Jason Web Token (JWT)
  // signing up Users

  // Creating token
  // const token = signToken(newUser._id);
  // // ________________________________________________________________
  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
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
  createSendToken(user, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

// ________________________________________________________________
// #17 - s12
// Logging out Users

// Create/Replace new cheap "JWT" (to logout)
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // 10 sec
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

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
    // We have access to "req.cookies.jwt" because of "app.use(cookieParser())" in (#14 - s12)
  } else if (req.cookies.jwt) {
    // If existing account is logged in, token = curren token
    token = req.cookies.jwt;
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

//____________________________________________________________________________
// #15 - s12
// Logging in Users With Our API - p2

// Only for rendered pages, not for errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 2) Verify Token
      // decoded => contains => id, creationDate (iat), expDate (exp) of the object
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 4) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // If all above true, There's a logged-in user
      res.locals.user = currentUser; // Creating a variable with "currentUser" for PUG
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

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
  // _________________________________________________________________________
  // #12 - s10
  // Sending Email

  // .protocol => http
  // host => 127.0.0.1:3000
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}}`;

  const message = `Forgot you password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    // sendEmail({mailOptions}) => in "email.js"
    await sendEmail({
      email: req.body.email,
      subject: 'Your password reset token is valid for 10 min!',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    // clear => if any error
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // validateBeforeSave: false => save data, and turn "required: false" in the schema
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was a error sending email. Try again later!', 500)
    );
  }
  // _________________________________________________________________________
});

// _________________________________________________________________________
// #13 - s10

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  // req.params.token => resetToken from ".forgotPassword"
  // resetToken => hashed should be = "passwordResetToken" from the ".createPasswordResetToken()"
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    // if "passwordResetToken" is not "hashedToken" = null
    passwordResetToken: hashedToken,
    // if "passwordResetExpires" is < "Date.now()" = null
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  // Clear reset tokens
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  // .save() => "passwordConfirm" contains a validator in the Schema
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // => Created on "userModel.js" as a ".pre('save')" middleware function

  // 4) Log the user in, send JWT
  // Create new token
  createSendToken(user, 200, res);
  // const token = signToken(user._id);

  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

// _________________________________________________________________________
// #14 - s10
// Updating the Current User: Password

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  // .select('+password') => because "select: false" in the schema
  const user = await User.findById(req.user.id).select('+password');
  console.log(user);

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, create/send JWT
  createSendToken(user, 200, res);
});
