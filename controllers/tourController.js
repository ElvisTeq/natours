const fs = require('fs');
const Tour = require('./../models/tourModel.js');

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

// req.requestTime => middleware from 'app'
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    // .find() => if no argument = all Tour data will be returned

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// #5 ________________________________________________________________

exports.getTour = async (req, res) => {
  try {
    // req.params => all parameters enter/use on the URL
    const tour = await Tour.findById(req.params.id);
    // id => route('/:id') we specified in "tourRoutes.js"

    // Display tour from ID
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// #4 ________________________________________________________________

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour()
    // newTour.save().then()
    const newTour = await Tour.create(req.body);
    // req.body => data from request

    res.status(201).json({
      // 201 => created
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      // 400 => bad request
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

// #6 ________________________________________________________________
// Updating existing tours

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      // to return new changes
      new: true,
      // to validate the schema rules
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// #7 ________________________________________________________________
// Deleting Tours

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
