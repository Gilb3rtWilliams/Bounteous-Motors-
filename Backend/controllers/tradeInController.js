const asyncHandler = require("express-async-handler");
const TradeIn = require("../models/TradeIn");

// Fetch all trade-in requests (Admin only)
const getTradeIns = asyncHandler(async (req, res) => {
  const tradeIns = await TradeIn.find({}).populate("user", "name email");
  res.json(tradeIns);
});

// Create a new trade-in request
const createTradeIn = asyncHandler(async (req, res) => {
  const { user, oldCarDetails, estimatedValue, newCarId, status } = req.body;
  const tradeIn = await TradeIn.create({ user, oldCarDetails, estimatedValue, newCarId, status });

  if (tradeIn) {
    res.status(201).json(tradeIn);
  } else {
    res.status(400).json({ message: "Invalid trade-in data" });
  }
});

// Update trade-in status
const updateTradeInStatus = asyncHandler(async (req, res) => {
  const tradeIn = await TradeIn.findById(req.params.id);
  if (tradeIn) {
    tradeIn.status = req.body.status || tradeIn.status;
    const updatedTradeIn = await tradeIn.save();
    res.json(updatedTradeIn);
  } else {
    res.status(404).json({ message: "Trade-in request not found" });
  }
});

module.exports = { getTradeIns, createTradeIn, updateTradeInStatus };
