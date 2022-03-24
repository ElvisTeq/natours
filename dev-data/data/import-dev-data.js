const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

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

// Read JSON File
// => .parse() => to convert into JS
const tours = JSON.parse(
  // ./ => Home folder which we started to run the app
  // ${__dirname} => current folder name
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    // Exit the process from the Terminal => Basically automatically ctrl+c
  } catch (err) {
    console.log(err);
  }
  process.exit();
  // ctrl+c
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // If no argument => will delete all
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
  // ctrl+c
};

// if => "node dev-data/data/import-dev-data.js --import" in the Terminal
if (process.argv[2] === '--import') {
  importData();
  // if => "node dev-data/data/import-dev-data.js --delete" in the Terminal
} else if (process.argv[2] === '--delete') {
  deleteData();
}
