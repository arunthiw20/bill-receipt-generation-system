const express = require("express");
const { register, login, profile } = require("../controllers/authController");
const { body, validationResult } = require('express-validator');
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
    "/register", 
    [
      body('name').notEmpty().withMessage('Name is required'),  // Ensure name is provided
      body('email').isEmail().withMessage('Invalid email format'),  // Validate email format
      body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')  // Password length check
        .matches(/\d/).withMessage('Password must contain a number'),  // Ensure password contains a number
    ], 
    (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  // Return errors
      }
      next();
    },
    register
  );

router.post(
    "/login", 
    [
      body('email').isEmail().withMessage('Invalid email format'),
      body('password').notEmpty().withMessage('Password is required'),
    ],
    (req, res, next) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    login
  );

router.get("/profile", verifyToken, profile);

module.exports = router;
