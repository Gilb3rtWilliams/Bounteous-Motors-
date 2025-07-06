const asyncHandler = require("express-async-handler");
const Negotiation = require("../models/Negotiation");

// Fetch all negotiations
const getNegotiations = asyncHandler(async (req, res) => {
  const negotiations = await Negotiation.find().populate("buyer").populate("car");
  res.json(negotiations);
});

// Create a new negotiation
const createNegotiation = asyncHandler(async (req, res) => {
  const { buyerId, sellerId, carId, offerPrice } = req.body;

  const negotiation = await Negotiation.create({ buyerId, sellerId, carId, offerPrice });

  res.status(201).json(negotiation);
});

// Update negotiation status (New Function)
const updateNegotiationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // Expecting status from the request body

  const negotiation = await Negotiation.findById(req.params.id);

  if (!negotiation) {
    return res.status(404).json({ message: "Negotiation not found" });
  }

  negotiation.status = status;
  await negotiation.save();

  res.json({ message: "Negotiation status updated", negotiation });
});

module.exports = { getNegotiations, createNegotiation, updateNegotiationStatus };
