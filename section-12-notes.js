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

///////////////////////////////////////////////////////////////////////////////////////

// #12
// Including a Map with Mapbox - p2

// Added => Mapbox implementation "documentation" in "mapbox.js" and "tour.pug"

// ----------------------------------- new mapboxgl.LatLngBounds()
// => To tell the map to focus/displat/show a location

// ----------------------------------- map.fitBounds(bounds, {mapOptions})
// => makes all coordinates in "bounds" show in the map with the correct "zoom" level
// Added => {padding} in "mapbox.js"

// ----------------------------------- new mapboxgl.Popup({options}).setLngLat(coordinates).setHTML(`<p></p>`).addTo(map)
// To create a popup message in the map
// .setLngLat() => popup location
// .setHTML() => popup HTML text/message
// .addTo() => to add popup to map

// ----------------------------------- npm i helmet@3.23.3
// => downgrading helmet version to support mapbox

///////////////////////////////////////////////////////////////////////////////////////

// #13
// Building the Login Screen

// Created => "getLoginForm()" in "viewsController.js"

// Added => "router.get('/login')" in "viewRoutes.js"

// Created => "login.pug" HTML

///////////////////////////////////////////////////////////////////////////////////////

// #14
// Logging in Users With Our API - p1

// HTTP request => AJAX (Requesting data from the API)

// Created => "login()" in "login.js"

// Using "axios"
// ------------------------------------------------- axios
// => script(src='https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js')
// => Added to the "base.pug" to get access to "axios library"
// => To get HTTP/AJAX request from our API to the Application
// Ex => "login()" in "login.js"

// ------------------------------------------------- npm i cookie-parser
// => Package to parse incoming cookies request
// => cookie contains "jwt" JSON Web Token
// => Added package to "app.js"

// ------------------------------------------------- app.use(cookieParser())
// => to use cookie-parser package
// Implemented => "app.js"

// Changes => ".protect()" in "authController.js"
// => Using "app.use(cookieParser())" to have access to "req.cookies.jwt"
// => If existing account is logged in => token = "req.cookies.jwt" (current token)

///////////////////////////////////////////////////////////////////////////////////////

// #15
// Logging in Users With Our API - p2

// Created => "isLoggedIn()" in "authController.js"
// => Function similar to ".protect()" that checks if a user is logged in
// => To

// -------------------------------------------------- res.locals.user (PUG)
// => All PUG template has access to "res.locals"
// .user => We can create a variable for all templates to use
// Ex => res.locals.user = currentUser

// -------------------------------------------------- if / else (PUG)
// Ex => "_header.pug"

// -------------------------------------------------- npm i cors
// => Fixed issue with "'http://localhost:3000' has been blocked by CORS policy"
// => added to "app.js"

// Changes => in "login.js"
// => Added code to If login is success => show message => redirect to main page

///////////////////////////////////////////////////////////////////////////////////////

// #16
// Logging in Users With Our API - p3

// Created => "index.js"
// => refactored/imported code from "mapbox.js", "login.js"

// Created => "alert.js"
// Created => "showAlert()" and "hideAlert()"

// Bundling all JS files into one
// ----------------------------------------------- npm i parcel-bundler (package for bundling)
// ADDED => ("watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js") => in "package.json"
// (parcel watch) => Command to run
// (./public/js/index.js) => File that will run the code
// (--out-dir ./public/js) => Folder to bundle all "script" (JS files)
// (--out-file bundle.js) => Created file which contains the bundled data "bundle.js" (name)
// ADDED => script(src='/js/bundle.js') in the "base.pug"

// ---------------------------------------------- npm i axios
// => To get HTTP/AJAX request from our API to the Application
// Ex => "login.js"

// ---------------------------------------------- npm i @babel/polyfill
// => Library to make New JS features to work on Older Browsers
// => import '@babel/polyfill' => Not saved in any variable => Will run automatically
// Added => "index.js"

// ********************* Important **********************
// => npm i mapbox => will not work with "parsel"

///////////////////////////////////////////////////////////////////////////////////////

// #17
// Logging out Users

// Created => "logout()" in "authController.js"
// => Create cheap token
// => Tricking the application by re-assigning a new token, so it will logout from the JWT

// Created => "logout()" in "login.js"
// => Using axios to "GET" request to "URL", and reaload server

// ----------------------------------------------- location.reload(true)
// => Server reload (to make changes to the browser from the backend)

// Added => eventListening for button click to logOut() in "index.js"

// ********************** Bug Fix **********************
// Replaced => "catchAsync" with "try/catch" for "isLoggedIn()" in "authController"
// => To avoid error when creating a cheap token with "logout()" in "authController.js"
// => "try/catch" => error will be catch locally
// => "catchAsync" => will catch error from all "async" function

///////////////////////////////////////////////////////////////////////////////////////

// #18
// Rendering Error Pages

// Changes => "getTour()" in "viewController.js"
// => handling error if (!tour)

// Created => "error.pug"

// Changed => "sendErrorDev()" and "sendErrorProd()" in "errorController.js"
// => To check if req.url starts with "/api" => So we can handle error that are not from API (back-end) vs (unknown)
// => .render "error.pug" based on (back-end) or (unknown) error

// ------------------------------------------ req.originalUrl
// => URL after the "Host"

// ******************* Important **********************
// ("isOperational": true) => means that the error is created by ourself

///////////////////////////////////////////////////////////////////////////////////////

// #19
// Building the User Account Page

// Created => "account.pug"
// => Setting "account.pug"

// Added => route for "account.pug" in "viewRouter.js"

// Created => "getAccount()" in "viewsController.js"
// => To render "account.pug"

///////////////////////////////////////////////////////////////////////////////////////

// #20
// Updating User Data (Option 1)

// Submitting a form Without API

// Step 1) Speficy request
// --------------------------------------- (action='/submit-user-data' method='POST')
// Always need to be added in the "form" element
// Form will send a "POST" request to "/submit-user-data"
// Ex => "account.pug"

// Step 2) Speficy (name) properties to send
// --------------------------------------- (name='anyThing') (name='somethingElse')
// data will be stored in (req.body) for (/submit-user-data)
// Added to => "input" field in "account.pug"
// Needed to add middleware => "express.urlencoded" to convert URL data

// Created => router POST for (/submit-user-data)

// Created => "updateUserData()" in "viewsController.js"
// To handle (/submit-user-data)

// --------------------------------------- app.use(express.urlencoded({ SETTINGS }));
// => Middleware to parse data coming from URL encoded form
// Added => "app.js"

// ******************** Fixed Bug ********************
// Changed => in "login.pug" loginForm('form') into ('form--login')
// => It was calling the login function to all the "form" elements

///////////////////////////////////////////////////////////////////////////////////////

// #21
// Updating User Data with Our API (Option 2)

// Created => "updateSettings.js" in "./public/js"

// Created => "updateData()" in "updateSettings.js"
// Implemented updateData in "index.js" (similar to "login()")

// Challenge passed
