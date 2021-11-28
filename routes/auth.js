
const express = require('express');
const router = express.Router();

const userController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');

// Login user
router.post('/login', userController.login);

// Register user
router.post('/register', userController.register);

// Get logged in user
router.get('/', isAuth, userController.getUser);

module.exports = router;