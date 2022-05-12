const multer = require('multer'); // to handle multi-part form data (upload img)
const sharp = require('sharp'); // To resize images (Node.js)
const fs = require('fs');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// _______________________________________________________________
// #2 - s13
// Configuring Multer

// Option 1) (Sharp) library
// Store as buffer (raw memory)

const multerStorage = multer.memoryStorage();

// Option 2) (Multer) library
// Store in disk

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(firstArg) => Error if there's one, (null) if not
//     // cb(secondArg) => Destination
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // file => req.file
//     // req => req.user/body
//     const ext = file.mimetype.split('/')[1]; // file.mimetype (contain file-type)
//     // filename => user-id-timeStamp.jpeg
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); // cb(secondArg) => File name
//   },
// });

// Filtering type of File
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!, please upload only images', 400), false);
  }
};

// Bundling/Create multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware for Uploading a single image
exports.uploadUserPhoto = upload.single('photo'); // "photo" field name that's going to hold the image to upload
// _______________________________________________________________
// #4 - s13
// Resizing Images

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Get img => change name
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`); // to store as

  next();
});

// _______________________________________________________________
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // Object.keys(obj) => Loop over all the key values of "obj"
  // .forEach(el) => check all keys that contains "...allowedFields" => add to newObj
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// _______________________________________________________________
// #16
// Adding a /me Endpoint

// Making "params.id" = "user.id" for "getOne()"
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// #12 _______________________________________________________________
// User methods

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }
  // 2) Filter out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // Add "photo" property with "req.file.filename"
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    // new: true => updates old data
    new: true,
    // runValidators: true => validate email
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!, Please use /signup',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// Do not Update Password with
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
