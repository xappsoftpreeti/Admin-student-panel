const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAdmin } = require('../Controller/adminAuthController');
const authMiddleware = require('../Middleware/authMiddleware');

// Admin Registration Route
router.post('/register', registerAdmin);

// Admin Login Route
router.post('/login', loginAdmin);

// Protected Route (only accessible with a valid JWT)
router.get('/profile', getAdmin)

module.exports = router;

