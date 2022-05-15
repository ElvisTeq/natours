// #1
// Image Uploads Using Multer: Users

// Implemented => (multer) in "userRoutes.js"
// Added => in "user.Controller"

// --------------------------------------------------- npm i multer
// => Package / Middleware to handle multi-part form data
// => (form encoding used to upload files from a form)

// --------------------------------------------------- const upload = multer({ OPTIONS });
// Using multer
// If no "OPTIONS/DESTINATION" img will be saved in URL memory (not in our file folder)

// --------------------------------------------------- upload.single('NAME')
// NAME => name of the field that's going to hold the image to upload
// req.file => to access ('NAME')

// --------------------------------------------------- Body => form-data (in POSTMAN)
// To add multi-part form data in POSTMAN
// Key => name
// Value => text/file

// ************************** Important ***************************
// upload.single('NAME') => won't show in req.body

////////////////////////////////////////////////////////////////////////////////////////

// #2
// Configuring Multer

// => Giving IMG a better file-name
// => Allowing only IMG-files to be uploaded

// Created => "uploadUserPhoto()" in "userController.js"

// --------------------------------------------------- multer.diskStorage({ destination:, filename: })
// To configure destination, filename
// Ex => "multerStorage" in "userController.js"

// --------------------------------------------------- multerFilter = (req, file, cb) => {}
// To Filter images
// Ex => "multerStorage" in "userController.js"

////////////////////////////////////////////////////////////////////////////////////////

// #3
// Saving Image Name to Database

// Added => in "updateMe()"
// => if (req.file) filteredBody.photo = req.file.filename;

// Changed => in "user.Model.js"
// set => photo: {default: 'default.jpg'}

////////////////////////////////////////////////////////////////////////////////////////

// #4
// Resizing Images

// Created => "resizeUserPhoto()" in "userController.js"
// Implemented (sharp) library

// ****************************** Using Sharp **********************************
// ---------------------------------------------------- npm i sharp
// Library to resize images (Node.js)

// ---------------------------------------------------- multer.memoryStorage(); (buffer)
// Store as buffer (raw memory)
// Gives access to => req.file.buffer

// ---------------------------------------------------- sharp(req.file.buffer)
// Using sharp
// (req.file.buffer) => from =>  (multer.memoryStorage())

// ---------------------------------------------------- .resize(500, 500)
// to Resize

// ---------------------------------------------------- .toFormat('jpeg')
// Convert to jpeg

// ---------------------------------------------------- .jpeg({ quality: 90 })
// Change img quality
// => to compress, make it take less space

// ---------------------------------------------------- .toFile(``)
// Save to

////////////////////////////////////////////////////////////////////////////////////////

// #5
// Adding Image Uploads to Form

// Changes => "account.pug"
// Changed imput type for uploading image

// ---------------------------------------------------- input(type='file')
// => imput type that the "form" receives

// Changed => (if (userDataForm)) "index.js"
// => Implemented "new FormData()"
// => ".apprend()" => to add data to the form

// ---------------------------------------------------- const form = new FormData()
// To create a FormData

// ---------------------------------------------------- form.append('name', data)
// To add data to the form

// ---------------------------------------------------- enctype='multipart/form-data'
// We need to specify anchor type if we want to Submitting form without API

////////////////////////////////////////////////////////////////////////////////////////

// #6
// Uploading Multiple Images: Tours

// Created => "uploadTourImages()" in "tourController.js"
// Implemented => "upload.fields"

// ---------------------------------------------------- upload.single('name')
// To upload one single img
// => req.file

// ---------------------------------------------------- upload.array('name', 5)
// To upload more than 1
// => req.files

// ---------------------------------------------------- upload.fields([{name:, maxCount:}])
// To upload separated by group/fields
// Ex => "uploadTourImages()"
// => req.files

// Created => "resizeTourImages()" in "tourController.js"

////////////////////////////////////////////////////////////////////////////////////////

// #7
// Processing Multiple Images

// Implementing => "resizeTourImages()" in "tourController.js"

// **************** Important ****************
// We get (req.file) => by using "multer"
// (req.file.buffer) => by using " multer.memoryStorage()" (buffer img)

////////////////////////////////////////////////////////////////////////////////////////

// #8
// Building a Complex Email Handler

// Using a class to create Emails for different kind of situations

// Implemented in => "email.js"

// ------------------------------------------------------ pug.renderFile('fileToRender', {DATA})
// Takes a file to render the PUG code into real HTML

// ------------------------------------------------------ npm i html-to-text
// => const { htmlToText } = require('html-to-text');

////////////////////////////////////////////////////////////////////////////////////////

// #9
// Email Templates with PUG: Welcome Emails

// ------------------------------------------------ https://html2pug.now.sh/
// To convert HTML into PUG

// ------------------------------------------------ https://github.com/leemunroe/responsive-html-email-template
// Email template

// Created => "email" folder =>
// "welcome.pug"
// "baseEmail.pug"

// ------------------------------------------------ .sendMail({OPTIONS})
// To send Email
// Ex => "email.js" => (await this.newTransport().sendMail(mailOptions);)

// ------------------------------------------------ req.protocol (https)

// Changes => "signUp()" in "authController.js"

// ********************** Important ***********************
// Do not add comments between imported functions/methods

////////////////////////////////////////////////////////////////////////////////////////

// #10
// Sending Password Reset Emails

// Created => "passwordReset.pug"

// Created => "sendPasswordReset()" in "email.js"

// Implemented => "changePassword()" in "authController.js"
// => Implementen funcitonality to send email for password reset

////////////////////////////////////////////////////////////////////////////////////////

// #11
// Using Sendgrid for "Real" Emails

// Using Nodemailer / SendGrid to send real emails
// See => "newTransport()" in "emails.js"

// ---------------------------------------------------- Sendgrid.com
// API to send real Emails

// ---------------------------------------------------- Mailsac.com
// To create fake emails for testing

// Stored => SendGrid "key" "Password" in "config.env"

////////////////////////////////////////////////////////////////////////////////////////

// #12
// Credit Card Payment with Stripe

// ----------------------------------------------------- Stripe.com
// API for Credit Card Payment

// ----------------------------------------------------- https://stripe.com/docs
// Documentation

////////////////////////////////////////////////////////////////////////////////////////

// #13
// Integrating Stripe into the Back-End

// Created => "bookingRoutes.js"
// Added router in "app.js" => app.use('/api/v1/bookings', bookingRouter);

// Created => "bookingController.js"
// Created => "getCheckoutSession()"
// => Implemented "Stripe"

// ----------------------------------------------------- npm i stripe
// Package for Credit Card Payment

// **************************** HOW TO USE STRIPE *********************************
// ----------------------------------------------------- const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Add secret key after requiring stripe

// ----------------------------------------------------- stripe.checkout.sessions.create({OPTIONS})
// To create checkout session

////////////////////////////////////////////////////////////////////////////////////////

// #14
// Processing Payments on the Front-End

// Using => if/else in PUG "tour.pug"
// => for the book tour button, to check if logged in or not => to redirect to login page

// Created => "stripe.js" in "./public/js"
// Using (Stripe) in Fron-End
// Using Axios to sent request to Stripe

// --------------------------------------------------- <script src="https://js.stripe.com/v3/"></script>
// Script for HTML
// Added to "tour.pug"

// --------------------------------------------------- Stripe('publicKey')
// To save/get Stripe public key

// --------------------------------------------------- stripe.redirectToCheckout({sessionId: })
// Redirect user to checkout URL
// See example => "stripe.js"

// ********************* ADDITIONAL NOTES *************************
// in HTML/PUG => data-tour-id = dataset.tourId ("-" is automatically converte into camelcase notation)

////////////////////////////////////////////////////////////////////////////////////////

// #15
// Modelling the Bookings

// Created => "bookingModel.js"
// => Created Schema using Mongoose
