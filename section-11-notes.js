// ************ 1. Types of Relationship between data **************
// 1). 1:1
// => Movie--Name (movie can only have 1 name)

// 2). 1:MANY
// 1:FEW => Movie--awards (movie can have a few awards)
// 1:MANY => Movie--Reviews (hundred-thousands)
// 1:TON => App--log (log can grow to millions of documents)

// 3). MANY:MANY
// => Movie Can have many Actors
// => Same Actors can play in many Movies

// ************* 2. Referencing Vs. Embedding ******************

// Referenced/Normalize => All "actors:" from the movie are separated and referenced by "_id"
// => "actors": [actorID('1'), actorID('2')]
//  PROS => Perfomance: it's easier to query each document on its own
//  CONS => We need 2 queries to get data from referenced document

// Embedded/Denormalized => All "actors:" are stored in the same movie document
// => "actors": [{actor1Data}, {actor2Data}]
//  PROS => Increases perfomance => get information in one query
//  CONS => Impossible to query the embedded document on its own

// ************ 3. When to EMBED and WHen to REFERENCE? **************

// * REFERENCING
// => IF 1:TON, MANY:MANY
// => Data is Updated a lot, (movies reviews)
// => If we need to query datasets on their own

// * EMBEDDING
// => IF 1:FEW, or 1:MANY
// => Data is mostly read, Data does not change quickly
// => Ex. (Movies + Images(100)) => images in a movie are not updating frequently or never.
// => If datasets really beloing together (user + Email)

// *********** 4. Types of Referencing ***********

// * Child Referencing
// => Parent contains all IDs referencing all child Elements
// 1:FEW => All IDs in the parent element could be too heavy

// * Parent Referencing
// => Child contain ID referencing Parent Element
// 1:MANY, 1:TON => each Child element are separated so space is unlimited

// * Two-Way Referencing
// => Parent and Child are connected in both directions (movie + actors) (actors + movies)
// MANY:MANY => Both contains a list of IDs

// ********* TIPS *********

// => Always favor embedding, unless theres a good reason to not to

// => Structure data before deciding to Embed/Reference

// => 1:TON, MANY:MANY is usually a good reason to REFERENCE

// => Favor REFERENCING if data is Updated a lot, and if Dataset is frequently need to be access

// => Don't allow arrays to grow indefinitely: use CHILD REFERENCING for 1:MANY, and PARENT REFERENCING got 1:TON

// => Use TWO-WAY Referencing for MANY:MANY

///////////////////////////////////////////////////////////////////////////////////

// #1
// Designing Our Data Model

// users => reviews
// 1:MANY
// Parent Referencing => 1 user can write many reviews, sometimes we need to query only the reviews

// tours <=> locations
// FEW:FEW => Tour has few locations, same location can be in a few tours
// Embedding => because FEW:FEW few of them, They belong together (tours needs to contain locations)

// tours <=> users
// FEW:FEW => tours contains a few tour guides, same guide might works for a few differnt tours
// Child Referencing or Embedding => Embedding because tour must contain a guide, Child Referencing because tour guide has info on his own that me may query

// tours => bookings <= users
// 1:MANY => 1 tour/user can have many bookings, booking can only have 1 tour/user
// Parent Referencing => Bookings will contain ID from user/tour that belongs

///////////////////////////////////////////////////////////////////////////////////

// #2
// Modelling Locations (Geospatial Data) => (longitude latitude location)
// => Creating Embedded data

// MongoDb supports Geospatial data

// Added => "startLocation" and "locatioins" in the Schema in "tourModel.js"

// --------------------------------- locations: []
// [] => this creates a embedded document

// ---------------------------------- node ./dev-data/data/import-dev-data.js --delete
// Deleted all our tours

// ---------------------------------- node ./dev-data/data/import-dev-data.js --import
// imported data from "import-dev-data.js" => "tours.json"

///////////////////////////////////////////////////////////////////////////////////

// #3
// Modelling tours guides: Embedding

// => When data is stored in "[]" in the schema is EMBEDDED

// Added => "guides: Array" into "tourModel.js"

// Added => "tourSchema.pre('save')" Middleware in "tourModel.js"
// => When creating a new User
// => Find all user By Id in, then store it to "guides:"

///////////////////////////////////////////////////////////////////////////////////

// #4
// Modelling Tour Guides: Child Referencing

// Changed => "guides: [{}]" in "tourModel.js"

// Child Referencing using Mongoose
// => Basically just storing the ID of the users using "type: mongoose.Schema.ObjectId"

// --------------------------- type: mongoose.Schema.ObjectId
// To tell mongoose this is a ID

// --------------------------- ref: 'User'
// Reference name
// This will point to ".populate()" function in the future

///////////////////////////////////////////////////////////////////////////////////

// #5
// Populating Tour Guides

// Modified => ".getTour()" in "tourController.js"
// Added ".populate({})"

// Created => Middleware in "tourModel.js" => ".pre(/^find/)" to .populate() all the "find" calls

// .populate() => Points to "ref: User" in the schema
// ------------------------------------------------- .populate({ path: 'guides', select: '-__v -passwordChangedAt'})
// Returns the tours.guides data/info, (tours.guides only had the ID of the guides)
// path: 'guides' => select guides to convert into data
// select: '-__V' => filter out the selected names, (remember to add "-" before the name)

// ********************** Important ************************
// .populate => returns a new query, if is used many times in a application it will be slow
// .populate() => Points to "ref: User" in the schema

///////////////////////////////////////////////////////////////////////////////////

// #6
// Modelling Reviews: Parent Referencing

// Created => "reviewModel.js" inside "models" folder

// Created => "reviewSchema"

// ************************ Remember ************************
// schemaName = new mongoose.Schema({})
// newName = mongoose.model('newName', schemaName)
// module.exports = Name

///////////////////////////////////////////////////////////////////////////////////

// #7
// Creating and getting Reviews

// Challenge => Vid.155

// Created => "reviewController.js" & "ewviewRoutes.js"

// Added => "app.use('/api/v1/reviews', reviewRouter)" to "app.js"

///////////////////////////////////////////////////////////////////////////////////

// #8
// Populating Reviews

// Created => Populate middleware in "reviewModel.js" for "getAllReviews"

///////////////////////////////////////////////////////////////////////////////////

// #9
// Virtual Populate: Tours and Reviews

// Using ".virtual()" to create a temporary field for "Reviews"

// Implemented => "tourModel.js"

// ----------------------------------- tourSchema.virtual('reviews', { ref: , foreingField: , localField: })
// To populate a virtual field
// reviews => name
// ref: reference like in the schema
// foreingField: => field of the referenced model
// localField: => '_id' => makes "_id" = foreingField

///////////////////////////////////////////////////////////////////////////////////

// #10
// Implementing Simple Nested Routes
// => So we don't have to enter tour and user id to create a review

// Created => req.params to handle "tourId" fomr the URL

// Implemented => in "createReview()"

///////////////////////////////////////////////////////////////////////////////////

// #11
// Nested Routes With Express

// -------------------------- router.use('/:tourId/reviews', reviewRouter);
// => to nest '/:tourId/reviews' to "reviewRouter"

// -------------------------- const router = express.Router({ mergeParams: true });
// mergeParams: true => for the merging to work in "reviewRouter"
// this makes that => "/" = 'api/v1/tours/tourId/reviews' and '/api/v1/reviews'

///////////////////////////////////////////////////////////////////////////////////

// #12
// Adding a Nested GET Endpoint

// Changes => "getAllReviews()" in "reviewController.js"

// By Nesting Routes With Express, we can manipulate "tourId" from URL "api/v1/tours/tourId/reviews"
// => To get all reviews from 1 tour

///////////////////////////////////////////////////////////////////////////////////

// #13
// Building Handler Factor Functions: Delete

// Created => "handleFactory.js" and ".deleteOne(Model)"
// => Making a single function to work on any Model

// Changes => "deleteTour" from "tourController.js"
// => "deleteReview" from "reviewController.js"
// => "deleteUser" from "userController.js"

///////////////////////////////////////////////////////////////////////////////////

// #14
// Factoring functions: Update and Create

// Created => ".updateOne(Model)" and ".createOne()" in "handleFactory.js"
// => Added the new function to all the "update" and "create" models

// Created => "setTourUserIds()" in "reviewController.js"

// Changes => made to the "createReview()" so it can use ".createOne()"
// => Separated some code to "setTourUserIds()" so ".createOne()" works

///////////////////////////////////////////////////////////////////////////////////

// #15
// Factory Functions: Reading

// Created => "getOne()" in "handleFactory.js"
// => added a second argument to the function for ".populate()" options
// if empthy => will not call ".populate()"

// Changed => replaced "getOne()" to all "get" functions

// Created => "getAll()" in "handleFactory.js"
// To replace all the getAll functions for the Models

// ***************** Important ****************
// Merged functionality when created "getOne()" with "getAllTours()" and "getAllReviews()"
// "getAllTours()" => added all the "APIFeatures"
// "getAllReviews()" => uses "req.params.tourId" to "GET" all reviews from one tour

///////////////////////////////////////////////////////////////////////////////////

// #16
// Adding a /me Endpoint

// Created => "getMe()" in "userController.js"
// => tricking "getOne()" by setting "params.id" = "user.id"

///////////////////////////////////////////////////////////////////////////////////

// #17
// Adding Missing Authentication and Authorization

// Adjusting/Fixing Authentication and Authorization for all "Routes.js"

// ********************* Important **********************
// Middleware runs in sequence => If we call "router.use(authController.protect)" before any middleware
// We don't need to add ".protect()" individualy
// Example => "userRouter.js"

///////////////////////////////////////////////////////////////////////////////////

// #18
// Importing Review and User Data

// Changes => to "import-dev-data.js"
// => added functionallity yo delete users and reviews

// Deleted all "user", "reviews", "tours"
// with => node ./dev-data/data/import-dev-data.js --delete

// Imported new "user", "reviews", "tours"
// with => node ./dev-data/data/import-dev-data.js --import

// Commenting password Encryption in "userModel.js"
// => because data we importing already contains passwords

// Added => "await User.create(users, { validateBeforeSave: false });"
// => Turning validation off in order to create new users

///////////////////////////////////////////////////////////////////////////////////

// #19
// Improving Read Perfomance with Indexes

// -------------------------------------------- .explain()
// => "const doc = await features.query.explain();"
// => gets detailed data of the req.param

// To create a Index
// -------------------------------------------- tourSchema.index({ price: 1, ratingsAverage: -1 });
// This causes that if we search for price, it will start in a ascending order
// 1 => (Low ~ High)
// -1 => (High ~ Low)

// ********* When Should we Decide to Use Indexes *********
// => Need to study our code pattern and figure out ourself

// *********** Important ************
// To delete a Index we need to do it in the database
// The whole point of indexing is to shortcut when finding data

///////////////////////////////////////////////////////////////////////////////////

// #20
// Calculating Average Rating on Tours - P1

// Created => ".static.calcAverageRatings" in "reviewModel.js"

// Created => Middlewate to run ".static.calcAverageRatings"

// -------------------------------- this.constructor
// this => current document
// this.constructor => the model who created "this"
// Example => "reviewModel.js"

///////////////////////////////////////////////////////////////////////////////////

// #21
// Calculating Average Rating on Tours - P2

// This is for
// => findOneAndUpdate
// => findOneAndDelete

// Changes => in "reviewModel.js"

// Using => Schema.pre(/^findOneAnd/) => to get the data we want to call ".calcAverageRatings"
// Then storing it, so ".post" has access to it

// Using => Schema.post(/^findOneAnd/) => to run ".calcAverageRatings"
// Reason => "await this.findOne();" does not work in ".post", query has already executed
// ".calcAverageRatings" is a statis function

///////////////////////////////////////////////////////////////////////////////////

// #22
// Preventing Duplicate Reviews

// Added => "reviewModel.js"
// --------------------------------- reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
// => Each combination of "tour" and "user" has to be unique
// => Tour cannot have the same user => User cannot have the same tour
// => Preventing Duplicate Reviews

// ---------------------------------- set: () => {}
// function for the schema
// Implemented => "tourModel.js" schema

// Changes => "ratingsAverage" on "tourModel.js" schema
// Math.round() => the average number
