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
