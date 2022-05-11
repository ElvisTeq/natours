const express = require('express');
const multer = require('multer'); // to handle multi-part form data (upload img)
const userController = require('./../controllers/userController.js');
const authController = require('./../controllers/authController.js');

const upload = multer({ dest: 'public/img/users' }); // Destination to save uploaded images

// #12 _______________________________________________________________
// User Routes

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Middleware runs in sequence => So we can call ".protect()" here before running any of the routes below
// Instead of calling them individualy, All routes are protectec after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get(
  '/me',

  // Making "params.id" = "user.id" for "getUser()"
  userController.getMe,
  // getUser => calls "getOne()" which uses "params.id"
  userController.getUser
);
router.patch('/updateMe', upload.single('photo'), userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// All routes after this middleware is ".restrictTo('admin')"
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
