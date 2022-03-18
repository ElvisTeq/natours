// #1
// Setting up Express and Basic Routing

// npm i express@4 => installed

// app.js => created

// ********************** HTTP Methods **********************

// ***CRUD***

// ----------- post
// => to create new resource

// ----------- get
// => to read resource

// ----------- put/patch
// => update existing resources

// ----------- delete
// =>

///////////////////////////////////////////////////////////////////////////

// #2
// APIs and RESTful API Design

// Application Programming Interface (API)
// => a piece of software that can be use by another piece of software

// RESTful (Rest Architecture)
// => to make it easy for use for everyone (understandable code, etc)

// 1. Separate API into logical resources
// resources => object or representation of something, any info that can be named can be a resource

// 2. Expose structured, resource-based URLs
// ex => https://www.natours.com/resourceName

// 3. Use HTTP methods (verbs)
// => DO not specifi what the resource name does
// ex => '/getTour' => ('GET /tours/7')
// ex => '/deleteToursByUser' => can be translated to (Delete '/user/3/tours/9')

// 4. Send data as JSON (usually)

// 5. Be stateless
// => all state is handled on the client side
// ex => based on who is logged in, data shown will be different each time
// Will never remember the previous request
// BadEx => GET /tours/nextPage => not good, nextPage will use previous page + 1
// GoodEx => GET /tours/page/6 => all we need to do is add 1 to the ID for next page

/////////////////////////////////////////////////////////////////////

// #3
// Starting Our API: Handling GET Requests

// -------------------------------------------- res.json({})
// => express method
// => sends a response that is the parameter converted to a JSON string using the JSON.stringify() method.
// => returns => object

/////////////////////////////////////////////////////////////////////

// #4
// Handling POST request

// Middle wear
// -------------------------------------------- app.use(express.json());
// => function that can modify incoming request data
// => Automatically converts incoming JSON data into JS code when using 'app'

// -------------------------------------------- Object.assign({Obj1}, {Obj2})
// => Merge 2 objects and returns a new Object

/////////////////////////////////////////////////////////////////////

// #5
// Responding to URL Parameters

// ----------------------------------------- ":"(parameter) "?"(optional)
// => we can set variables to the URL with ":"
// Ex => '/api/v1/tours/:id/:pg/:x?' => (id,pg,x) = parameters we can manipulate/consume
// ? => 'x?' => optional parameter, it will not throw an error if no value is enter in URL for 'X'

/////////////////////////////////////////////////////////////////////

// #6
// Handling Patch Requests

// ----------------------------------------- app.patch("URL/:ID", (req,res) {})
// Exampple on => "appEx.js"

/////////////////////////////////////////////////////////////////////

// #7
// Handling DELETE Request

// ----------------------------------------- app.delete("URL/:ID", (req,res) {})
// Same as .patch(), But the difference is
// => res.status(204) = no content
// => .json( data: null )

/////////////////////////////////////////////////////////////////////

// #8
// Refactoring Our Routes

// appEx.js => was created to keep our examples from previous lectures #(1~7)

// ------------------------------------------- app.route('URL')
// => to target a URL, basically saying "this URL"
// => we can chain methods
// Ex => app.route('URL').get().route().post().patch().delete()

/////////////////////////////////////////////////////////////////////

// #9
// Middleware and the Request-Response Cycle

// In Express => everything is middleware (even routers)
// => middleware are functions that run in the middle when we send/receive request

// Middleware stack => all middleware function run in sync mode, one after another in order

// Reques-Response Cycle => Everything, All the process together in the Middleware
// From => Incoming request => Middleware stack/functions => response

/////////////////////////////////////////////////////////////////////

// #10
// Creating Our Own Middleware

// ------------------------------------------ .use((req, res, next) => {})
// Method to create middleware
// next() => always needs to be called last in order to work

/////////////////////////////////////////////////////////////////////

// #11
// Using 3rd-Party Middleware

// Just need to install the middleware and ".use()" it
// ------------------------------------------ npm i morgan
// => app.use(morgan('dev'));
// Usefull tool for developing, automatically logs in the terminal some data about our request

/////////////////////////////////////////////////////////////////////

// #12
// Implementing the "Users" Routes

// Created "app.route()" for users, and functions created for users

/////////////////////////////////////////////////////////////////////

// #13
// Creating and Mounting Multiple Routers

// Middleware function
// ----------------------------------------- express.Router()
// To create a sub router, necessary when we need to split our code in modules
// Ex => const tourRouter = express.Router()
// => app.use('/api/v1/tours', tourRouter)

/////////////////////////////////////////////////////////////////////

// #14
// A better File Structure

// Refactored all Users/Tours by their own module

// "tourRoutes.js" / "userRouters.js" => files created
// Contains all routes

// 'userController.js' / 'tourController.js' => files created
// Contrains all function/methods

/////////////////////////////////////////////////////////////////////

// #15
// Param Middleware

// ------------------------------------------- router.param('id' (req, res, next, val) {})
// Any router function that has => "('id' (req, res, next, val) {})" is a middleware function
// Middleware that only run with certain parameters
// Ex => 'tourRouters.js'
// next() => always needs to be called on Middleware functions

// ********** NOTED IMPORTANT ***********
// res.status().json({}) => is the key to work with the web-site

/////////////////////////////////////////////////////////////////////

// #16
// Chaining multiple Middleware Functions

// "tourController.js"
// => Created a middleware

// ********** NOTED IMPORTANT ***********
// res.status().json({}) => is the key to work with the web-site

// If any param of (req, res, next, val) is not used in the function => function will not work
// that's why the "checkBody" middleware has only (req, res, next)

/////////////////////////////////////////////////////////////////////

// #17
// Serving Static Files

// How to open static files

// --------------------------------------------------- app.use(express.static('folder/location'))
// To access the file in URL will be => localhost:3000/file
// localhost:3000 => folder
// file => file inside the folder

// Example.
// app.use(express.static(`${__dirname}/public`));
// localhost:3000/overview.html => Will open "public/overview.html"
// Ex => localhost:3000/img/pin.png => Will open "public/img/pin.png"

/////////////////////////////////////////////////////////////////////

// #18
// Environment Variables

// => Are global variables that are used to define the environment in which the node app is running

// Production Environments / Development Environments
// => Development is default

// --------------------------------------------------- app.get('env');
// console.log(app.get('env')) => to log current environment
// this is from express

// --------------------------------------------------- process.env
// console.log(process.env) => will log all env data of Node.js
// process.env.USERNAME => example to get USERNAME from the data

// --------------------------------------------------- NODE_ENV=develpment nodemon server.js
// Same result as above but this is a command for the terminal

// --------------------------------------------------- NODE_ENV=develpment X=23 nodemon server.js
// X=23 => manual environment vartiable, it could be anything we put

// *****************************************************
// We can create a file containing all environment variables
// fileName => "config.env" created
// --------------------------------------------------- npm i dotenv
// to install package to use out 'config.env' file

// --------------------------------------------------- dotenv.config({path: './config.env'})
// => method to use out config file
// require('dotenv') => is needed for this method
// "SET NODE_ENV=development&&nodemon server.js" was added in "package.json" start" for this to run
// => npm start will make it run

// --------------------------------------------------- process.env.NODE_ENV
// console.log this => logs current environment 'production/developer'
// NODE_ENV => was set manually on the "config.env" File
