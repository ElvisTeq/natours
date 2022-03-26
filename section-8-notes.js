// 1
// Connecting our data base with the Express App

// DATABASE => added to "config.env"
// => Changed <password> to UPPERCASE
// => Changed /natours? => our project database "name"

// ---------------------------------------------- npm i mongoose
// mongoose@5 => version 5 installed
// require('mongoose')

// ---------------------------------------------- mongoose.connect()
// First argument => (Connection String)
// Second Argument => (Object with some options) "not important just copy the same for future projects"
// Returns a PROMISE => .then(connection => {})

//////////////////////////////////////////////////////////////////////////////

// #2
// Creating a simple Tour model

// "mongoose" => work similar to a class
// => We create a model using mongoose => create object from it, To Query/Update/Delete doccuments "CRUD"
// => To creade a model, we need a Schema

// "Schema" => use to describe out data, set defaul value, validate data .etc
// => Basically giving rules to the data

// --------------------------------------------- new mongoose.Schema({})
// To create schema
// This is were we put the rules, what content is needed for the created objects

// --------------------------------------------- new mongoose.model('Name', Schema)
// To create model
// This is basically our class
// Ex => new 'Name' ({Data: value})

// Example on => 'server.js'

//////////////////////////////////////////////////////////////////////////////

// #3
// Creating Documents and Testing the Model

// ---------------------------------------------- new "Model"({Data})
// To create a document
// It works similar to classes
// const whatever = new "Model"({Data})

// ---------------------------------------------- .save()
// Method to save created model
// Returns a promise => .then().catch()

// Example => "server.js"

//////////////////////////////////////////////////////////////////////////////

// #4
// MVC, Model, View, Controller

// Application logic => "Controller"
// => Code about the application
// Ex. managing request and responses

// Business Logic => "Model"
// => Code that solves business problems
// Ex. Creating new tours in database, Check users password, Validating users input data

// FAT MODELS/THIN CONTROLLES:
// => Offload ad much logic as possible into the model
// => Keep the controllers as simple/little logic as possible

//////////////////////////////////////////////////////////////////////////////

// #5
// Refactoring for MVC (Model, View, Controller)

// "./models/tourModel.js" => created
// => for Schema & Model

//////////////////////////////////////////////////////////////////////////////

// #6
// Another way of creating documents

// checkBody function from "tourController.js" deleted

// -------------------------------------------------- modelName.create({})
// => const name = modelName.create({})
// A easier way to create a model
// => Returns a promise
// Example in => tourController.js => "createTour"

// Starting to use Async/Await & Try/Catch

//////////////////////////////////////////////////////////////////////////////

// #7
// Reading documents with mongoose

// "getAllTours","getTour"  from "tourController.js" => changes

// -------------------------------------------------- .find({})
// If no argument => will return all

// -------------------------------------------------- .findOne({}, optionalFunction)
// => to find one object
// => Optional Second arg => function

// -------------------------------------------------- .findById()
// translated to => .findOne({ _id: (ARGUMENT) })

//////////////////////////////////////////////////////////////////////////////

// #8
// Updating documents
// => Updates and Keep unchanged data

// "Query.prototype" in any documentation => methods/function that can only be use by instances

// Changes made on "updateTour" => tourController.js
// ------------------------------------------------- .findByIdAndUpdate(1, 2, {3})
// 1 => req.params.id => Id
// 2 => req.body => Data we want to update
// 3 => Options => Example = "updateTour" => tourController.js

//////////////////////////////////////////////////////////////////////////////

// #9
// Deleting Documents
// => No need to send data back to the client when deleting

// "deleteTour" => changes
// ----------------------------------------------- .findByIdAndDelete(req.params.id)
// => finds ID and delete

//////////////////////////////////////////////////////////////////////////////

// #10
// Modeling the Tours

// Updated our schema from "tourModel.js"

//////////////////////////////////////////////////////////////////////////////

// #11
// Importing Development Data
// => Using the terminal to run functions from another file

// import-dev-data.js => created on "data" folder

// ---------------------------------------------- .deleteMany()
// If no argument => will delete all

// ******** In the Terminal Console **********
// ---------------------------------------------- process.argv
// console.log(process.argv)
// => The data we typed in the "Terminal" => logs where the command is located
// If we type => "node dev-data/data/import-dev-data.js"
// Will log an Array of the location of arguments we type in the Terminal

// Example
// node dev-data/data/import-dev-data.js --import
// console.log(process.argv) => [node, dev-data/data/import-dev-data.js, --import]

// ---------------------------------------------- process.exit()
// equivalent to => ctrl+c

//////////////////////////////////////////////////////////////////////////////

// #12
// Making the API Better: Filtering

// Changes made in => "getAllTours" in "tourController.js"

// in the URL => everything after the "?"
// Ex => localhost:3000/api/v1/tours?duration=5&difficulty=easy
// => Filtering everything with => duration = 5, difficulty = easy

// ---------------------------------------------- req.query
// console.log(req.query)
// the filtering that EXPRESS automatically do for us for the query string

// Deleting unwanted query string by creating a copy of the "req.query" and a array of query-string we dont want
// => excludedArr.forEach(el => delete queryStringCopy[el])

// ************ NOTE ***************
// We await separately in one short line, after finishing doing our queryString manipulation
// => If not, we would not be ablo to chain the queryString after is "await"

//////////////////////////////////////////////////////////////////////////////

// #13
// Advanced Sorting
// Sorting by => gte | gt | lte | lt

// "getAllTours" => "tourController.js"

// Template literal used with .replace()
// => to add (MongoDB operator sign "$") to all matching template literal
// $ => MongoDB needs in order to work

//////////////////////////////////////////////////////////////////////////////

// #14
// Advanced Sorting

// Example in "getAllTours"
// -------------------------------------------- query.sort("stringNameToSort")
// ?sort=price => URL
// ?sort=-price => hight to low (reverse)

// -------------------------------------------- "-"
// Use to reverse the sorting

// ********************* NOTED *********************
// sort = price,ratingsAverage
// => is was what we typed in the URL

// Mongoose works like this => .sort('stringNameToSort stringNameToSort')
// In order to sort 2 things at the same time => we need to convert "sort" into a string that ".sort" can take
// => removing the ","

// Example
// sort = price,ratingsAverage
// => req.query.sort.split(',').join(' ');
// sort = price ratingsAverage

//////////////////////////////////////////////////////////////////////////////

// #15
// Making the API Better: Limiting Fields

// -------------------------------------------- query.select('')
// -------------------------- "-" => To exclude
// Expects => ('field1 field2 field3')
// Solution => req.query.fields.split(',').join(' ');

// **************** NOTE ******************
// select: false, => in the schema to make it excluded by default
// => permanently hide form the output
