const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    // validator => imported module
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      // This only works on SAVE()/CREATE()
      validator: function (el) {
        // returns => true/false => if false => error
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

// _________________________________________________________________________
// #3
// Managing Passwords

// Middleware that Runs before ".save()"
// async/await => because ".hash" => returns a promise
userSchema.pre('save', async function (next) {
  // Run if password is modified
  if (!this.isModified('password')) return next();

  // Hash password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  // Clear passwordConfirm field => No need to be saved
  // => we already validate passwordConfirm using "validator: function()"
  this.passwordConfirm = undefined;

  next();
});
// _________________________________________________________________________

const User = mongoose.model('User', userSchema);

module.exports = User;
