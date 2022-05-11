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
