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
// To deploy/redeploy application

// ----------------------------------------------- heroku open
// To open app on heroku

// ----------------------------------------------- heroku logs --tail
// Log heroku

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

// ----------------------------------------------- heroku ps
// to check HEROKU "Dino"

// ----------------------------------------------- heroku ps:restart
// Restarting keroku

////////////////////////////////////////////////////////////////////////////////////////////

// #5
// Implementing CORS (Cross Origin Resource Sharing)

// To allow access for anyone to our API request

// ----------------------------------------------- npm i cors

// ----------------------------------------------- app.use(cors());
// (To allow everyone to acess our API) => only (GET)

// ----------------------------------------------- cors()
// We can also specify routes we want to allow
// app.use('/api/v1/tours', cors(), tourRouter);

// ----------------------------------------------- app.use(cors({ origin: 'URL' }))
// We can also specify the URL that is allowed to acces our API

// ----------------------------------------------- app.options('*', cors());
// To allow (POST) (DELETE) (PATCH) in our app
// ('*') => URL

////////////////////////////////////////////////////////////////////////////////////////////

// #6
// Finishing Payments with Stripe Webhooks
//  => How to use Stripe

// Added => Webhooks in Stripe
// Created URL with webhook => https://tour-map-elvis.herokuapp.com/webhook-checkout

// Added => in "app.js"
// => app.post('/webhook-checkout', express.raw({ type: 'application/json' }), bookingController.webhookCheckout);

// Created => "webhookCheckout()" in "bookingController.js"
// => implementation of Stripe Webhook

// => bodyParser.raw({ type: 'application/json' }),

// ------------------------------------------------- npm i body-parser

// Added => "body(data-alert=`${alert ? alert : ''}`)" in "base.pug"

// Created => "alerts()" in "viewsController.js"
// To check if URL contains "alert=booking"
// if do => add/create "alert" (req.locals.alert) = with message alert

// Then => in "index.js", Check if body contains HTML Body contains "alert"
// If not => no message

// **************************** Important *******************************
// Webhook needs to be called before (body parsing) the html
