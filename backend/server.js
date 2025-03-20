const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");
const billRoutes = require("./routes/billRoutes");
const session = require("express-session");
const revenueRoutes = require("./routes/revenueRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "ff9348b4199526a43f8067b5eb81d9ada16dc7667c9ee02e7f4a3b1703f807cc92af16a2d40c3c947d03ffb8343579fdb80310893f610117a6c06cee555cbc63",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.use(express.json());

app.use("/api/bills", billRoutes, revenueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/revenue", revenueRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
