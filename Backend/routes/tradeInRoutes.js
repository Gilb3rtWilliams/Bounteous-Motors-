const express = require("express");
const TradeIn = require("../models/TradeIn");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getTradeIns,
  createTradeIn,
  updateTradeInStatus,
} = require("../controllers/tradeInController");

const router = express.Router();

// User Routes
router.post("/", protect, createTradeIn);

// Admin Routes
router.get("/", protect, adminOnly, getTradeIns);
router.put("/:id/status", protect, adminOnly, updateTradeInStatus);

// Submit a trade-in request
router.post("/", async (req, res) => {
  try {
    const tradeIn = new TradeIn(req.body);
    await tradeIn.save();
    res.status(201).json({ message: "Trade-in request submitted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all trade-in requests
router.get("/", async (req, res) => {
  const tradeIns = await TradeIn.find();
  res.json(tradeIns);
});

module.exports = router;
