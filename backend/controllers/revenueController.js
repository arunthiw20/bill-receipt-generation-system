const Bill = require("../models/Bill");
const db = require('../config/db.js');

exports.getTotalMonthlyRevenue = (req, res) => {
  const { year, month } = req.params;
  const userId = req.user.id;

  const query = `SELECT SUM(total_amount) AS totalIncome FROM bills WHERE user_id = ? AND MONTH(purchase_date) = ? AND YEAR(purchase_date) = ?`;

  db.query(query, [userId, month, year], (err, result) => {
    if (err) {
      console.error('Error fetching total monthly revenue:', err);
      return res.status(500).json({ message: 'Error fetching total monthly revenue' });
    }
    console.log(`Fetching getTotalMonthlyRevenue:`, result);
    res.status(200).json({ totalIncome: result[0].totalIncome });
  });
};


exports.getMonthlyRevenueSummary = (req, res) => {
  const { year, month } = req.params;
  const userId = req.user.id;
  console.error('Database query userId, year, month:', userId, year, month);

  const query = `SELECT * FROM bills WHERE user_id = ? AND MONTH(purchase_date) = ? AND YEAR(purchase_date) = ?`;
  
  db.query(query, [userId, month, year], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error retrieving revenue summary' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No data found for the given year and month' });
    }
    console.log(`Fetching getMonthlyRevenueSummary:`, result);
    res.json(result); // Return the summary result
    
  });
};