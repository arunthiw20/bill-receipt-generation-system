// models/Bill.js
const db = require("../config/db");

const Bill = {
  create: (customerName, contactDetails, items, discount, totalAmount, purchaseDate, userId, callback) => {
    const query = `
      INSERT INTO bills (customer_name, contact_details, items, discount, total_amount, purchase_date, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [customerName, contactDetails, JSON.stringify(items), discount, totalAmount, purchaseDate, userId], callback);
  },

  getLastBills: (userId, callback) => {
    const query = `SELECT * FROM bills WHERE user_id = ? ORDER BY purchase_date DESC LIMIT 10`;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching last 10 bills:", err);
            return callback(err, null);
        }
        console.log("Last 10 bills fetched successfully:", results);
        callback(null, results);
    });
},
getTotalMonthlyIncome: (callback) => {
  const query = `
    SELECT 
      SUM(total_amount) AS total_income 
    FROM bills 
    WHERE MONTH(purchase_date) = MONTH(CURDATE()) 
      AND YEAR(purchase_date) = YEAR(CURDATE());
  `;
  db.query(query, callback);
},

  getMonthlyRevenue: (year, month, userId, callback) => {
    const query = `
      SELECT SUM(total_amount) AS total_revenue 
      FROM bills 
      WHERE YEAR(purchase_date) = ? AND MONTH(purchase_date) = ? AND user_id = ?;
    `;
    db.query(query, [year, month, userId], callback);
  },

  getMonthlyRevenueSummary: (year, month, userId, callback) => {
    const query = `
      SELECT DAY(purchase_date) AS day, SUM(total_amount) AS daily_revenue
      FROM bills
      WHERE YEAR(purchase_date) = ? AND MONTH(purchase_date) = ? AND user_id = ?
      GROUP BY DAY(purchase_date)
      ORDER BY day;
    `;
    db.query(query, [year, month, userId], callback);
  }
};

module.exports = Bill;
