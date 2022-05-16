// #1
// Preparing API for Deployment

// -------------------------------------------------- npm i compression
// To Compress all TEXT sent to CLIENT
// Added in "app.js" => app.use(compression());

// Deleted unnecessary console.log

// Run => "build:js": "parcel build ./public/js/index.js --out-dir ./public/js --out-file bundle.js"

////////////////////////////////////////////////////////////////////////////////////////////

// #2
// Deploying App to Heroku

// ----------------------------------------------- npm install -g heroku

// ----------------------------------------------- keroku login

// ********************** How to Use Heroku ************************
// IN => "package.json"
// Make sure start command is set
// => "start": "node server.js",
/*
"engines": {
  "node": ">=10.0.0"
}
*/

// Make sure Port is set to => (process.env.PORT)

// Add/Commit with Git

// ----------------------------------------------- heroku create
// Creates link for our APP

// ----------------------------------------------- git push heroku master

// ----------------------------------------------- heroku open
// To open app on heroku

// ----------------------------------------------- heroku logs --tail

// Heroku wont work because (confing.env) is in (.gitignore)
// => So we have to manually assign its value

// ----------------------------------------------- heroku config:set NODE_ENV=production
// Sometimes values has to be in quotes ('')
// We can change the config values in the heroku website

// ----------------------------------------------- heroku apps:rename anyname
// To change website name

////////////////////////////////////////////////////////////////////////////////////////////

// #3
// Testing for Secure HTTPS Connections

// Changed => "createSendToken()" in "authController.js"
// Added secure options

// ----------------------------------------------- if (req.secure)
// If connection is secured (DOES NOT WORK IN HEROKU)

// ----------------------------------------------- if (req.headers['x-forwarded-proto'] === 'https')
// THIS IS FOR HEROKU to check If connection is secured

// ----------------------------------------------- app.enable('trust proxy');
// Added => "app.js"

////////////////////////////////////////////////////////////////////////////////////////////

// #4
// Responding to a SIGTERM Signal

// SIGTERM
// => HEROKU every 24 hrs will send a SIGTERM to out app to close our server

// Implemented in => "server.js"
// Handling SIGTERM Signal
