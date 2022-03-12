const fs = require('fs');
const express = require('express');
// express contains a bunch of function we can use
const app = express();
// We store/assign the functions to 'app'

// Middleware
// => function that can modify incoming request data
app.use(express.json());

// #3 ______________________________________________________________

// File was a json file
// JSON.parse => to convert into JS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// #5 ________________________________________________________________

const getTour = (req, res) => {
  // req.params => all parameters enter on the URL
  console.log(req.params);

  // Get ID param in URL & convert to number
  const id = req.params.id * 1;

  // Get tour based on ID enter
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  // Display tour from ID
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// #4 ________________________________________________________________

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour Here...>' } });
};

// #7 ________________________________________________________________
// Deleting Tours

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
};
// __________________________________________________________________

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
app.route('/api/v1/tours').get(getAllTours).post(createTour);

// app.get('/api/v1/tours/:id?', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
