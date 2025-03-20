const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const revenueController = require("../controllers/revenueController");

router.get("/monthly-revenue/:year/:month", verifyToken, revenueController.getTotalMonthlyRevenue);
router.get("/monthly-summary/:year/:month", verifyToken, revenueController.getMonthlyRevenueSummary);

module.exports = router;
