const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// this makes "config.env" file to work
// Has to be declared before "app" => becase by calling app, it will create our application without the dotenv file

const app = require('./app');
// . => current folder

// 1# _________________________________________________________
// Connecting our data base with the Express App

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(err);
  });
// _____________________________________________________________

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// #2 __________________________________________________________
// Creating a simple Tour model
// Refactored/Moved to "tourModel.js"

// #3 __________________________________________________________
// Creating Documents and Testing the Model
/*
const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR:', err);
  });
*/
