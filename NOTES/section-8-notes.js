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

//////////////////////////////////////////////////////////////////////////////

// #16
// Pagination

// Impemented in "getAllTours"

// -------------------------------------------- query.skip(Num)
// => how many object to skip

// -------------------------------------------- query.limit(Num)
// => how many to show per page

// Example
// => page=2&limit=10 => p1 1-10 => p2 11-20 => p3 21-30
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);

// -------------------------------------------------------- Tour.countDocuments()
// Method to get the total of documents
// Returns a promise (await)

//////////////////////////////////////////////////////////////////////////////

// #17
// Aliasing

// Ex => To get 5 best & Cheapest Tours
// req.query => ?limit=5&sort=-ratingsAverage,price
// limit=5 => show 5
// sort=-ratingAverage => sort high~Low
// Price => low~high

// New router created at "tourRouter.js"
// When Router is enter to automatically sort 5 best & Cheapest Tours
//  Using => Middleware to manipulate "req.query" for "getAllTours" to show

//////////////////////////////////////////////////////////////////////////////

// #18
// Refactoring API Features
// => getAllTours & APIFeatures

// Created a class => APIFeatures => Moved to "apiFeatures.js"
// => Which contains all methods for sorting/paginate/filter etc
// Receives => (query(allData), reqString(req.query))
// in which => all methods inside this class will manipulate

// Then We create a new object from "APIFeatures"
// APIFeatures(queryObject, req.query(comingFromExpress))
// then => chaing the methods

//////////////////////////////////////////////////////////////////////////////

// #19
// Aggregation Pipeline: Matching and Grouping

// -------------------------------------------------- Tour.aggregate([{}])
// => Example on "tourController.js" "getTourStats"
// => to get/match a data from a list of data
// => Group them and sort them by average/min/max/sum/exclude
// => calculate averages,etc

//////////////////////////////////////////////////////////////////////////////

// #20
// Aggregation Pipeline: Unwinding and Projecting

// "getMonthlyPlan" created

// -------------------------------------------------- $unwind: "$"
// => Deconstruct an array field from the input documents => output one document for each element of the array
// => To separate documents data by input "/:year" individually
// Ex => was use to get all Tours from 2021 => we got "every single" tour from 2021 "separated"
// => Event repeated one but in different dated.

// ******************** NOTE ***********************
// To manually give "req.params" to an router => add "/:paramName"

//////////////////////////////////////////////////////////////////////////////

// #21
// Virtual Properties

// Field we can define in the Schema that will not be persisted
// => will not be save into the data base, for space saving
// => mostly use for conversion of datas

// Changed added to "TourModel.js"
// ------------------------------------------------ tourSchema.virtual('fieldName').get(function(){return this.changes})
// => regular function was used in order to have ".this"
// => virtual will not show untill we add the settings to the schema.

// const tourSchema = new mongoose.Schema({SchemaSettings}, {
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true },
// })

// *************** Purpose ****************
// => always try to keep Application logic and Bussiness Logic Separate
// => This was a "Bussiness Bogic", because had nothing to do with (req, res)

//////////////////////////////////////////////////////////////////////////////

// #22
// Document Middleware

// 4 Types of Middlewate in Mongoose
// 1) Document
// 2) Query
// 3) Aggregate
// 4) Module Middleware

// .this => current doccument
// ------------------------------------------------- tourSchema.pre('save', function(next) {})
// Runs before an actual event => to manipulate documents before being save()
// => runs before .save() and .create() only
// next() => needed at the end
// => we can use multiple ".pre()" middlewares for the same HOOK
// HOOK => .pre("save")

// ------------------------------------------------- tourSchema.post('save', function(doc, next) {})
// .post() => Is executed after all the ".pre()" is executed
// this function does not returns ".this"
// doc => .this => Finished document

// DOCUMENT MIDDLEWARE: Example in "tourModel.js"

//////////////////////////////////////////////////////////////////////////////

// #23
// Query Middleware

// To run functions before or after a certain query is executed

// .this => returns the query
// ------------------------------------------------- tourSchema.pre('find', function(next) {})
// .post('find', function(docs, next) {}) => will be executed after ".pre()"
// changed to /^find/ for regular expression

// Regular Expression --------------------------- /^name/
// "^" => find all the strings that starts with "name"

// ****************** NOTE ******************
// By setting in the "Schema" =>
// anyNAme: {type: Boolean, default: false}
// by adding "anyName" to a new created Object/Tour, it will hide it
// anyName: true => in order for the tour to show

//////////////////////////////////////////////////////////////////////////////

// #24
// Aggregation Middleware

// To add "hooks" before, or after an aggregation happends

// "HOOK" => .pre('thisIsTheHookTarget', function() {})

// .this => aggregation object
// -------------------------------------------------- tourSchema.pre('aggregate', function(next) {})
// this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
// => to add $match aggregation to a pipeline

//////////////////////////////////////////////////////////////////////////////

// #25
// Data Validation: Build-in Validators

// ------------------------------------------------ maxlength: [num, 'err']
// ------------------------------------------------ minlength: [num, 'err']
// => Validator for String length

// ------------------------------------------------ min: [num, 'err']
// ------------------------------------------------ max: [num, 'err']
// => Validator for Numbers/Dates

// ------------------------------------------------ enum: { value: ['string'], message: 'err' }
// => To sonly accept the values we specify => Strings Only

// ************************ NOTED ***********************
// runValidator: true => in order for upgradeTour to work when trting to change name

//////////////////////////////////////////////////////////////////////////////

// #26
// Data Validation: Custom Validators

// Added to priceDiscount in the Schema

// Is just a regular function that returns true/false
// ----------------------------------------------- validate: {validator: function(val) {}, message: 'err'}
// (val) => value we entered
// If true => pass
// If false => err message => has access to {VALUE} => Value entered

// ************************ IMPORTANT *************************
// validate: => only work for creating new documents
// will not work when updating documents

// ---------------------------------------------- npm i validator
// => installed validator library
