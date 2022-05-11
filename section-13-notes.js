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

// ---------------------------------------------------- multer.memoryStorage();
// Store as buffer (raw memory)
// Gives access to => req.file.buffer

// ---------------------------------------------------- sharp(req.file.buffer).resize(500, 500)
// Using sharp
// (req.file.buffer) => from =>  (multer.memoryStorage())

// ---------------------------------------------------- .toFormat('jpeg')
// Convert to jpeg

// ---------------------------------------------------- .jpeg({ quality: 90 })
// Change img quality
// => to compress, make it take less space

// ---------------------------------------------------- .toFile(``)
// Save to
