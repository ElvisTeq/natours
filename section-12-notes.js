// #1
// Setting up Pug in Express

// Created => "views" folder

// Created => "base.pug" file

// Added => "app.js"
// ----------------------------------------- npm i pug
// => Module for rendering HTML (Template Engine)
// ----------------------------------------- app.set('view engine', 'pug')
// => To tell express what (Template Engine) we using
// ----------------------------------------- app.set('setting', 'folderLocation')
// => Setting/Connecting to folder

// ----------------------------------------- base.pug
// File name to use pug

// ----------------------------------------- require('path')
// Module to manipulate path names
// ----------------------------------------- path.join(__dirname, 'views')
// Create a path behind the scenes joining "__dirname/views"
// To prevent error if another dev has "app.js" in a different location
// "./views" => will not work for them

// ----------------------------------------- .render('')
// Was use to render "base.pug"

///////////////////////////////////////////////////////////////////////////////////////

// #2
// First Step with Pug

// ---------------------------------------- .render('template', { data })
// { data } => to pass data into the template

// ******************** Buffer Code
// => We can write JS in "base.pug"
// Ex => h2= user.toUpperCase()

// ******************** Unbuffer Code
// --------------------------------------- (- const x = 9)
// => Code that is not going to appear in the output

// ******************** Interpolation Code "#{}"
// => Added template string with "#{}" instead of "${}" from ES6
// => Adding Code to a String
// Ex => title Natours | #{tour}

// ******************* Important ***********************
// => We use "app.use(express.static(path.join(__dirname, 'public')));" in "app.js"
// => This causes that "images" and "css/style.css" will automatically be search in "public" folder in "base.pug"

///////////////////////////////////////////////////////////////////////////////////////

// #3
// Creating Our Base Template

// ----------------------------------- header.header
// => <header class="header"> in "pug"
// "." => points to a class

// ----------------------------------- nav.nav.nav--tours
// => <nav class="nav nav--tours">

// ----------------------------------- a.nav__el(href='#') All tours
// => <a href="#" class="nav__el">All tours</a>

// ----------------------------------- .header__logo
// => <div class="header__logo">
// div => "." to automatically create a div element

// ----------------------------------- (src='' alt='' href='')
// () => use to add attributes
// Ex => <img src="img/logo-white.png"/>
// Ex => img(src='img/logo-white.png')

// ----------------------------------- li: a(href='#') About us
// => <li><a href="#">About us</a></li>

// ----------------------------------- p.footer__copyright &copy; by Elvis
// => <p class="footer__copyright">&copy; Elvis</p>

///////////////////////////////////////////////////////////////////////////////////////

// #4
// Including Files into Pug Templates

// Created => "_header.pug" for the Header
// "_" => File that's only going to be served/ included to another file

// ------------------------------------ include _header
// => Added in "base.pug" to include "_header.pug"

// ------------------------------------ include _footer
// Added in "base.pug" to include "_footer.pug"

// ------------------------------------ Pug beautify
// => extension to auto fix pug spacing installed
// ************ How to Use *************
// => Select All
// => ctrl + shift + p
// => type: "Beautify Pug"

///////////////////////////////////////////////////////////////////////////////////////

// #5
// Extending Our Base Templates with Blocks

// Created => "overview.pug" and "tour.pug"  in "views" folder

// Added => "app.get('/overview')" in "app.js"
// to render('overview.pug') if URL = /overview

// --------------------------------------- extends base
// => to extends current file into the file "base"
// => "overview.pug" for examples

// ********************** Important **********************
// Only works for "Block" element

///////////////////////////////////////////////////////////////////////////////////////

// #6
// Setting up the Project Structure

// Created => "reviewRouter.js" in "routes" folder
// => Refactored "ROUTES" from "app.js" to "reviewRouter.js"

// Created => "viewsController.js"
// => Refactored "viewRoutes.js" functions into "viewsController.js"

///////////////////////////////////////////////////////////////////////////////////////

// #7
// Building the Tour Overview - p1

// Implemented => "Get tour data from collection" in "getOverview()"
// => tours = Tour.find()
// => render('overview', {tours})

// ---------------------------------------------- each el in tours
// => To loop in PUG
// el => each tours from "tours"

///////////////////////////////////////////////////////////////////////////////////////

// #8
// Building the Tour Overview - p2

// --------------------------------------- el= value
// "=" => to set a value to a element

// --------------------------------------- .toLocaleString('en-us', {month: 'long', year: 'numeric'})
// => Method was used to convert "Date" into String
// 'en/us' => language
// {Options}
// month: 'long' =>  show Month full name
// year: 'numeric' => show year in number

// --------------------------------------- "| "
// Adds a space between elements
// See Example in => "overview.pug"

///////////////////////////////////////////////////////////////////////////////////////

// #9
// Building the Tour Page - p1

// ------------------------------------ .populate()
// => To automatically replace the specified path in the document, with document(s) from other collection(s).

// ------------------------------------ "/" Relative URL
// adding => "/"

// ------------------------------------ minxin randomName()
// => function for PUG
// Examples => See usage in "tour.pug" "overviewBox()"
// ***************** How to Use
// => +randomName()

// ***************** Mistakes ****************
// .find() => for JS arrays
// => The find() method returns the first element in the provided array that satisfies the provided testing function
// .findOne() => for MongoDB
// => Returns one document that satisfies the specified query criteria on the collection

// ***************** Important *******************
// Using "block" "extends" in PUG => Will make the main page load in the current file (which causes error)
// So we need to add "/" to conver URL into "Relative URL" (Which will make the URL/File run from the main ROOT)

///////////////////////////////////////////////////////////////////////////////////////

// #10
// Building the Tour Page - p2

// Created => "_reviewCard.pug" in "views" folder
// Contains mixin => to loop array/review.rating to determine "rating stars"

// ---------------------------------------------- include fileName
// importing on PUG
// Ex => "tour.pug"

// ---------------------------------------------- "- if ()"
// To add conditional to PUG
// Example => "tour.pug"

// ---------------------------------------------- each a, b in tour.images
// => we can define 2 variables when looping in PUG
// Ex => See "tour.pug"

// ****************** Important *******************
// We redefine the "class" element so we can manipulate with "${}"
// Ex => img.picture-box__img.picture-box__img--1
// Answer => img.picture-box__img(class=`picture-box__img--${i + 1}`)

///////////////////////////////////////////////////////////////////////////////////////

// #11
// Including a Map with Mapbox - p1

// Created => "mapbox.js" in "public/js"

// ---------------------------------- block append anyName
// => To get the original code from the "block"
// => We can also add aditional code to it
// Ex => "tour.pug"

// ---------------------------------- block prepend anyName
//

// ---------------------------------- "#" to create ID in PUG

// ---------------------------------- data-anyName => data attribute (can only contain string)
// data is stored as => "dataset.anyName" in JS
// Ex => "mapbox.js"

// ---------------------------------- /* eslint-disable */
// => To disable eslint in current file
