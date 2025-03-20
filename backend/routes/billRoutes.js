// routes/billRoutes.js
const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const verifyToken = require("../middleware/authMiddleware");

// Route to new bill
router.post("/create", verifyToken, billController.createBill);
router.get("/last", verifyToken, billController.getLastBills);

module.exports = router;
