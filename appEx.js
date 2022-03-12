const fs = require('fs');
const express = require('express');
// express contains a bunch of function we can use
const app = express();
// We store/assign the functions to 'app'

// Middle wear
app.use(express.json());
// => function that can modify incoming request data

/*_________________________________________________________________
// #1
app.get('/', (req, res) => {
  // '/' => main URL
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});
__________________________________________________________________*/

// #3 ______________________________________________________________

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// File was a json file
// JSON.parse => to convert into JS

// Route handler
// => what to do when someone hit '/api/v1/tours'
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
      // => 'tours' from top
    },
  });
});

// #5 ________________________________________________________________

// :id => is a parameter, we create them using ":"
// ? => optional, if id is not enter, it will not throw err
app.get('/api/v1/tours/:id?', (req, res) => {
  // req.params => all parameters enter on the URL
  console.log(req.params);

  // Get ID param in URL & convert to number
  const id = +req.params.id;

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
});

// #4 ________________________________________________________________

app.post('/api/v1/tours', (req, res) => {
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
});

// #6 ________________________________________________________________
// Updating existing tours

app.patch('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour Here...>' } });
});

// #7 ________________________________________________________________
// Deleting Tours

app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
