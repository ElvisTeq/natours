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
