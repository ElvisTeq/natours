const fs = require('fs');

// #3 ______________________________________________________________

// File was a json file
// JSON.parse => to convert into JS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// __dirname => this file location
// .. => go back once
// then => dev-data/data/tours-simple.json

// #15 _______________________________________________________________
// Param Middleware

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

// #16 _______________________________________________________________
// Chaining multiple Middleware Functions

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

// _____________________________________________________________________

// req.requestTime => middleware from 'app'
// getAllTours => is called by 'app'
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

// #5 ________________________________________________________________

exports.getTour = (req, res) => {
  // req.params => all parameters enter/use on the URL
  console.log(req.params);

  // Get ID param in URL & convert to number
  const id = req.params.id * 1;

  // Get tour based on ID enter
  const tour = tours.find((el) => el.id === id);

  // Display tour from ID
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// #4 ________________________________________________________________

exports.createTour = (req, res) => {
  // console.log(req.body);

  // Creating new tours/ID
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // req.body => What we want to post, it was what we typed in the Postman body

  tours.push(newTour);

  // To add/save data into the file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    // File to override
    JSON.stringify(tours),
    // Data that we want to write to the file
    // JSON.stringify => because File is written in .json
    (err) => {
      // res => display result
      res.status(201).json({
        // 201 => created
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// #6 ________________________________________________________________
// Updating existing tours

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour Here...>' } });
};

// #7 ________________________________________________________________
// Deleting Tours

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
