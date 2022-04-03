// #1
// Debugging Node.js with ndb

// ----------------------------------------------- sudo npm i ndb --global
// To install globally => didn't work

// ----------------------------------------------- npm i ndb --save-dev
// To install as a dev dependancy

// "debug": "ndb server.js"
// => added to "package.json"
// npm run debug => to run this tool

// Better way of debugging instead of using console.log

//////////////////////////////////////////////////////////////////////////

// #2
// Handling Unhandled Routes

// => Handling wrong URL

// ---------------------------------------------- app.all('*', (req, res, next) => {})
// .all() => .get, post, delete, find, update
// '*' => Everything => all URLs

// ----------------------- req.originalUrl
// => input URL

// ************************ Important ************************
// handling with ".all()" => has to be after the ROUTER MOUNTING
// Or else any URL will be (404)

//////////////////////////////////////////////////////////////////////////

// #3
// Implementing Global Error Handling Middleware

// ---------------------------------------------- app.use((err, req, res , next) => {})
// When 4 arguments are given is automatically recognized as a Error Handling Middleware
//

// ------------------------ err.statusCode
// => res.status(Code)

// ------------------------ err.status
// => .json({ status: })

// ************************ IMPORTANT **************************
// next() => anything passed inside the "next()" function, Express will take it as a ERROR
// Will skip all the other middlewares into the global err handling

//////////////////////////////////////////////////////////////////////////

// #4
// Better Errors and Refactoring

// "appError.js", "errorController.js" created

// ----------------------------------------------- .startWith('')
// To check if a String start with ''

// ----------------------------------------------- err.stack
// .log(err.stack) => will log where is the Error

// ----------------------------------------------- isOperational = Boolean
// => manually setting a boolean to a object
// => so we can manipulate based on this boolean in the future

// "appError.js"
// ----------------------------------------------- Error.captureStackTrace(curObj, toDoWithObj)
// this => current object
// this.constructor => what to do with the object
