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
