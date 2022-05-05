const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

// "/" => localhost:3000 => main page = overview
router.get('/', viewsController.getOverview);

router.get('/tour', viewsController.getTour);

module.exports = router;
