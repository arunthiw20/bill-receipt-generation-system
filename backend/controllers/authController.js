const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../config/db");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error checking existing user:", err);
      return res.status(500).json({ message: "Error checking existing user" });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered." });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      User.create(name, email, hashedPassword, (err) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ message: "Error creating user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error finding user by email:", err);
      return res.status(500).json({ message: "Error finding user by email" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  });
};

exports.profile = async (req, res) => {
  try {
      console.log("User ID from token authcontollr:", req.user.id);
      const [users] = await db.promise().query("SELECT * FROM users WHERE id = ?", [req.user.id]);
      
      if (users.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }
      const [bills] = await db.promise().query(
        "SELECT * FROM bills WHERE user_id = ? ORDER BY purchase_date DESC LIMIT 10", 
        [req.user.id]
      );

      res.json({
        user: users[0],
        bills: bills
      });

  } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};