const multer = require('multer'); // to handle multi-part form data (upload img)
const sharp = require('sharp'); // To resize images (Node.js)
const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//___________________________________________________________________
// #6 - s13
// Uploading Multiple Images: Tours

const multerStorage = multer.memoryStorage();

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

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// upload.single('image') req.file
// upload.array('images', 5); req.files

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  //console.log(req.files);

  // files.imageCover/images => are created in "uploadTourImages()" above
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image

  // => Create/Store img into "imageCover" => (updateOne()) function updates the entire "req.body"
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`; //  tour-id-timeStamp-cover.jpeg
  // Edit Img with sharp
  // req.files.imageCover => array
  await sharp(req.files.imageCover[0].buffer) // (buffer) => multer.memoryStorage()
    .resize(2000, 1333) // 2/3 ratio
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // 2) Images
  req.body.images = []; // Create/Store images in array to req.body

  // Promise.all() => so next() function "req.files.images" is not empthy
  await Promise.all(
    // req.files.images => comes from "uploadTourImages()"
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer) // (buffer) => multer.memoryStorage()
        .resize(2000, 1333) // 2/3 ratio
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      // Storing to req.body
      req.body.images.push(filename);
    })
  );

  next();
});

// #3 ______________________________________________________________
/*
// File was a json file
// JSON.parse => to convert into JS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// __dirname => this file location
// .. => go back once
// then => dev-data/data/tours-simple.json
*/
// #15 _______________________________________________________________
// Param Middleware
/*
exports.checkID = (req, res, next, val) => {
  // "val" => value of parameter of URL entered
  console.log(`Tour id is: ${val}`);

  // if wrong value => return
  // else => next()
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};
*/
// #16 _______________________________________________________________
// Chaining multiple Middleware Functions
/*
exports.checkBody = (req, res, next) => {
  // req => is what the web-site send to us
  if (!req.body.name || !req.body.price) {
    // res => what we sent to the web-site
    return res.status(400).json({
      status: 'fail',
      message: 'Missing price or name',
    });
  }
  next();
};
*/
// _____________________________________________________________________

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);

// // req.requestTime => middleware from 'app'
// exports.getAllTours = catchAsync(async (req, res, next) => {
//   // localhost:3000/api/v1/tours?duration=5&difficulty=easy

//   console.log(req.query);

//   // EXECUTE QUERY
//   // Tour.find() => returns all the data from Tour
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const tours = await features.query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// Refactored to "APIFeatures"
// ______________________________________________________________
// BUILD QUERY
// 1A) Filtering

// // Creating a hard copy => destructuring
// // => Deleting excluded fields
// const queryObj = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => delete queryObj[el]);

// // req.query => query string => ?duration=5&difficulty=easy

// // 1B) Advanced Filtering

// // Convert into string => to use ".replace" method
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// // \b => Exactly the same, words that include them won't count
// // g => Global, to make changes on all, if not added will just change the first one

// // Filtering Method 1
// let query = Tour.find(JSON.parse(queryStr));
// // .find() => if no argument = all Tour data will be returned
// // We do not "await" query so we can still chain methods

// // // Filtering Method 2
// // const query = await Tour.find()
// //   .where('duration')
// //   .equals(5)
// //   .where('difficulty')
// //   .equals('easy');
// ______________________________________________________________

// // 2) Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   // sort = price,ratingsAverage
//   // We need => sort = price ratingsAverage => for .sort() to work
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
//   // Sort by creation time "new~old"
// }
// ______________________________________________________________

// // 3) Field Limiting

// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
//   // "-" => Exclusion for .select()
// }
// ______________________________________________________________

// // 4) Pagination

// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;

// // page=2&limit=10 => p1 1-10 => p2 11-20 => p3 21-30
// // .skip() => how many opject to skip
// // .limit() => how many to show per page
// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   // Total of tours
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('This page does not exist');
// }
// ______________________________________________________________

// #5 ________________________________________________________________
// #15 - s11
// Factoring functions

// Second argument => ".populate()" options
exports.getTour = factory.getOne(Tour, { path: 'reviews' });

// exports.getTour = catchAsync(async (req, res, next) => {
//   // req.params => all parameters enter/use on the URL
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   // id => route('/:id') we specified in "tourRoutes.js"

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   // Display tour from ID
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// #4 ________________________________________________________________
// #14 - s11
// Factoring functions: Update and Create

exports.createTour = factory.createOne(Tour);

// exports.createTour = catchAsync(async (req, res, next) => {
//   // const newTour = new Tour()
//   // newTour.save().then()
//   const newTour = await Tour.create(req.body);
//   // req.body => data from request

//   res.status(201).json({
//     // 201 => created
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });

// try {

// } catch (err) {
//   res.status(400).json({
//     // 400 => bad request
//     status: 'fail',
//     message: err,
//   });
// }
// });

// #6 ________________________________________________________________
// Updating existing tours
// #14 - s11
// Refactoring updateTour

exports.updateTour = factory.updateOne(Tour);

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     // to return new changes
//     new: true,
//     // to validate the schema rules
//     runValidators: true,
//   });

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// #7 ________________________________________________________________
// Deleting Tours
// ________________________________________________________________
// #13 - s11
// Building Handler Factor Functions: Delete

// .deleteOne() => "handleFactory.js"
exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// ________________________________________________________________
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      // get => all reatingsAverage >= [gte] 4.5
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // Define stats for Each "Difficulty"
        // _id: null; => To get all in 1
        // $toUpper => optional to add, to Upercase
        _id: { $toUpper: '$difficulty' },
        // +1 for each tour
        numTours: { $sum: 1 },
        // sum all ratingsQuantity
        numRatings: { $sum: '$ratingsQuantity' },
        avgRatings: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      // sort avgPrice by low to high
      $sort: { avgPrice: 1 },
      // NOTE name changes after we specify the values on top
      // was => "averagePrice"
      // now is =>"avgPrice"
    },
    // {
    //   // Can use "$match" again
    //   // Excluding all => _id: 'EASY'
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021 (in URL)

  const plan = await Tour.aggregate([
    {
      // Get all "startDates" from 2021 => show them individually (event from the same tour)
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        // $month => mongoDB
        // => Group by month
        _id: { $month: '$startDates' },
        // => +1 for each $match above
        numTourStarts: { $sum: 1 },
        // $push => add objects into array
        // $push => startDates.name
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      // _id => 1 (show)
      // _id => 0 (hide)
      $project: {
        _id: 0,
      },
    },
    {
      // -1 => Descending order
      $sort: { numTourStarts: -1 },
    },
    {
      // Show only 12
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  // /tours-within/233/center/34.111745,-118.113491/unit/mi
  // distance => /233
  // latlng => /34.111745,-118.113491
  // unit => /mi
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  // To get radians of the earth => Necessary for MongoDB "$centerSphere"
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  // in Miles => distance / 3963.2
  // in Kilometers => distance / 6378.1

  if (!lat || !lng) {
    next(
      new AppError(
        'Please Provide latitude and longitude in the format lat,lng',
        400
      )
    );
  }

  // Find tours around in a given location
  // [lng, lat] => Center
  // radius => tours around this radius
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  // 0.000621371 => meters into miles
  // 0.001 => meters into kilometer

  if (!lat || !lng) {
    next(
      new AppError(
        'Please Provide latitude and longitude in the format lat,lng',
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      // This always need to be the first stage
      // requires a geospatial index => automatically find one if contains
      // If multiple geospatial index => need to use "keys" parameter to define one
      // All fields are mandatory
      $geoNear: {
        // Specifiying GeoJson data
        near: {
          type: 'Point',
          // * 1 => to convert into Number
          coordinates: [lng * 1, lat * 1],
        },
        // Name of the field that will be created, storing all the calculated distances
        // Result comes in metters
        distanceField: 'distance',
        // Multiply to get Kilometers
        distanceMultiplier: multiplier,
      },
    },
    {
      // Only show this results in "distance"
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
