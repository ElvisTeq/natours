// #1
// Modeling Users

// "userSchema" created on "userModel.js"

//////////////////////////////////////////////////////////////////////////

// #2
// Creating new Users

// "authController.js" created

// router.post('/signup') => added to "userRouters.js"
// => we use ".post()" for signup, login, resetPassword

//////////////////////////////////////////////////////////////////////////

// #3
// Managing Passwords

// Encrypting passwords

// "passwordConfirm" changes in "userModel"

// ------------------------------------ validator : function() {}
// => returns true/false
// false => error
// only works on ".save()" and ".create()"

//
// *************************** ALWAYS INCRIPT PASSWORDS ******************************
// Using mongoose pre-save Middleware

// ------------------------------------ userSchema.pre('save', function(next) {})
// => Middleware that runs before ".save()"

// ------------------------------------ this.isModified('password') {}
// => to check if password ".isModified"

// -------------------------------------------------------- npm i bcryptjs
// => JS package to encrypt passwords

// -------------------------------------------------------- bcrypt.hash(this.password, 12):
// Returns a promise => need to async/await
// => to encrypt password
// 12 => difficulty layer => the higher the number the longer it takes to load and harder to hack

// ********** NOTED **********
// required: true; => in the schema, means is only a required imput
// not required to be persisted in the database
// thats why we can set => "passwordConfirm" = undefined

//////////////////////////////////////////////////////////////////////////

// #4
// Jason Web Token (JWT)

// => is like an encrypt password assigned to a matching user && password
// => which the server receives and verify
// => if valid => it will send protected data to the client

// ********** NOTED **********
// Tokens always takes an ID to create

//////////////////////////////////////////////////////////////////////////

// #5
// Signing up Users

// Changes made on "authController.js"
// changes on .signup => To specify the only things we need to create a newUser
// => so no one can manually imput a new role to the new created account
// => no longer possible to add => admin, instead, we edit it from compass or mongoDB

// https://github.com/auth0/node-jsonwebtoken
// ------------------------------------------ npm i jasonwebtoken
// => package for JWT

// ------------------------------------------ jwt.sign(payload, secretOrPrivateKey, {options, callback})
// payload => what to convert
// secretOrPrivateKey => self created secret key (must be at least 32 long)

// ------------------------------------------ jwt.verify(token, secretOrPrivateKey, [options, callback])
//

// *********** IMPROTANT ************
// SECRET code should be at least 32 characters long

//////////////////////////////////////////////////////////////////////////

// #6
// Logging in Users

// Created => ".login()" in "auntController.js"

// Implemented => ".getAllUsers" from "userController.js"

// Added => ".post('/login')" to the router

// --------------------------- select: false
// => options for the schema to hide the object

// --------------------------- .select('+object')
// => to explicitly select/add an object
// => was needed to select "+password" => it was "select: false" in the schema

// --------------------------------------- schemaName.methods.anyName = function() {}
// To create a method that can be use by all the instances of "schemaName"
// .anyName => name of the function
// Ex => userModel.js

// --------------------------------------- bcrypt.compare(originalPassword, encryptedPassword)
// returns true/false
// To check is the password entered is the same as the encrypted one

//////////////////////////////////////////////////////////////////////////

// #7
// Protecting Tour Routes - p1

// Created middleware => ".protect()" in "authController"
// Added => ".protect()" to "tourRoutes.js" => "getAllTours"

// ---------------- req.headers
// => HTTP headers => request headers

// Standar to send JWT as a Header
// ------------------------------------ Authorization: Bearer Token
// Authorization => header name for token
// Bearer Token => "Token" = token
// Ex => ".protect()" in "authController"

// ************ Noted ************
// => Apparently the Token is Stored in the "req.headers"
// as => Authorization: Bearer Token

//////////////////////////////////////////////////////////////////////////

// #8
// Protecting Tour Routes - p2

// Added => error handling for "JsonWebTokenError" && "TokenExpiredError" in "errorController.js"

// Created => "handleJWTError()" && "handleJWTExpiredError()" in "errorController.js"

// Added => "passwordChangedAt: Date"  to the Schema
// => if user has changed his password => it will contain this

// Created => "userSchema.methods.changedPasswordAfter()" in "userModel.js"
// => check if passwordChanged after first token was issued

// -------------------------------- { promisify } = require('util')
// build-in Node method to promisify a function
// Ex. => const anyName = await promisify(function)(functionArg)

// ------------------------------------------------ jwt.verify(token, secretCoken)
// takes => token + secretCode
// returns => objects id, creationDate(iat), expDate(exp) of the object

//////////////////////////////////////////////////////////////////////////

// #9
// Advanced Postman Setup

// Using Envorinments in Postman App
// Add new Environment =>
// Variable: URL
// Initial Value: http://127.0.0.1:3000/

// ------------------------------------------- {{URL}}
// => like => `${URL}`
// => {{URL}}api/v1/tours

// Creating a variable when sending a .post/request (TEST tab in Postman)
// ------------------------------------------- pm.environment.set("variable_key", "variable_value");
// "variable_key" => VariableName
// "variable_value" => pm.responde.json().token => Initial Value
// => {{VariableName}}: pm.responde.json().token

// Setting "Bearer Token" in (AUTHORIZATION tab in Postman)
// => select Type => {{VariableName}}

//////////////////////////////////////////////////////////////////////////

// #10
// Authorization: User Roles and Permissions

// Added => "role:" to the Schema in "userModel.js"

// Created => "restrictTo()" in "authController.js"

// Added => ".protect, .restrictTo()" to "deleteTour()" in "tourRoutes.js"
// => To verify account role before running .deleteTour()

// ************************ Important *************************
// => To pass Arguments into Middleware function
// exports.restrictTo = (...arg) => {return (req, res , next) => {}}

// ************************ Note from Teacher *********************
// We could implement this authentication functions because
// We stored => req.user=currentUser => in .protect() => which contains the current JWT
// Then => we used the stored user in the next Middleware => .restrictTo() To manipulate the same log in user

//////////////////////////////////////////////////////////////////////////

// #11
// Password Reset Functionality: Reset Token

// Added to "userRouter.js"
// router.post('/forgotPassword', authController.signup);
// router.post('/resetPassword', authController.login);

// Created => ".forgotPassword()" in "authController.js"

// Created => "userSchema.methods.createPasswordResetToken" in "userModel.js"

// Added => "crypto = require('crypto')" to "userModel.js"
// build-in module

// ------------------------------------ crypto.randomBytes(32)
// crypto module method
// => generate a cryptographically well-built artificial random data
// => (size, callback)

// ------------------------------------ .toString('hex')
// => convert to string hex format (1~9 A~F)

// ----------------------------------- .save({ validateBeforeSave: false });
// => makes mandatory data from the schema: false before saving

//////////////////////////////////////////////////////////////////////////

// #12
// Sending Emails woth Nodemailer

// DOWNLOADED => Mailtrap
// => website used to fake send/receive emails for developers

// Created => "email.js" in "utils"

// Implemented => ".forgotPassword()" in "authController.js"

// ------------------------------------ npm i nodemailer
// module to send emails

// ------------------------------------ nodemailer.createTrasnport({})
// => to define the service to send the emails
// Ex => gmail, email, yahoo, etc ...

// To create a sendEmail function => "email.js"

//////////////////////////////////////////////////////////////////////////

// #13
// Password Reset Functionality: Setting new Password

// Created => ".resetPassword" in "authController.js"

// ------------------------------- .isModified('')
// => to check if document was modified
// true/false

// ------------------------------- .isNew
// => to check if document is new
// true/false

// ************************* IMPORTANT ****************************
// Always use ".Save()" => on passwords because it contains => middleware functions and validations that runs on save()

//////////////////////////////////////////////////////////////////////////

// #14
// Updating the Current User: Password

// Created => ".updatePassword" in "authController.js"

//////////////////////////////////////////////////////////////////////////

// #15
// Updating current User : Data

// Created => "updateMe()" in "userController.js"

// Created => "filterObj()" in "userController.js"
// => filter => only receives "name" and "email" from "req.body"

// Implemented in "updateMe"
// ------------------------------------------------- findByIdAndUpdate(req.user.id, function, {options})
// find object by ID => req.user.id
// function => function to filter
// {options} => for the data to update

//////////////////////////////////////////////////////////////////////////

// #16
// Deleting the Current User

// Created => "userSchema.pre(/^find/)" in "user Model.js"
// middleware to run before "find()"

// Created => "deleteMe" in "userController"

// Hide user based on if "active: true/false"

//////////////////////////////////////////////////////////////////////////

// #17
// Security Best Practices and Suggections

// See Vid: 141

//////////////////////////////////////////////////////////////////////////

// #18
// Sending JWT via Cookie

// Changes => in "createSendToken()" in  "authController.js"

// To create cookie
// --------------------------------------------- res.cookie('name', token, {options})
// Ex => in "creaseSendToken()"

// {options for cookie}
// secure: true/false => to show hide from res
// httpOnly: true/false => cannot be modified/access in any way by the browser

// ****************** Detail *******************
// Creating a cookie with same name will override the old one

//////////////////////////////////////////////////////////////////////////

// #19
// Implementing Rate Limiting

// Created => "limiter" in "app.js"

// --------------------------------------------- npm i express-rate-limit
// => Package to create limits

// --------------------------------------------- rateLimit({options})
// to create limit
// Ex => see "limiter"

// ******************** Detail *******************
// Details/info about limiter is shown in "Headers" of the "res"
