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
