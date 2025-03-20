const db = require("../config/db");

const User = {
  create: (name, email, hashedPassword, callback) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },
  getProfile: (userId, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], callback);
  }
};

module.exports = User;
