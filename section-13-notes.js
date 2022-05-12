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