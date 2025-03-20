const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware'); // Authentication middleware

// Get user profile and last 10 bills (protected route)
router.get('/profile', authenticate, getProfile);

module.exports = router;
