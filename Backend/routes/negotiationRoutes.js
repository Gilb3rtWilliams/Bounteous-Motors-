const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getNegotiations,
  createNegotiation,
  updateNegotiationStatus,
} = require("../controllers/negotiationController");
const Negotiation = require("../models/Negotiation");

const router = express.Router();

// User Routes
router.get("/", protect, getNegotiations);
router.post("/", protect, createNegotiation);
router.put("/:id/status", protect, updateNegotiationStatus);

// Get a specific negotiation
router.get("/:id", protect, async (req, res) => {
  try {
    const negotiation = await Negotiation.findById(req.params.id).populate("buyer").populate("car");
    if (!negotiation) {
      return res.status(404).json({ message: "Negotiation not found" });
    }
    res.json(negotiation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
