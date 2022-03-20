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

// --------------------------------------------- new mongoose.model('Name', Schema)
// To create model

// Example on => 'server.js'