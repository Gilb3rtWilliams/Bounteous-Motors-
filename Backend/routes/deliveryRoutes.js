const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDeliveries,
  createDelivery,
  updateDelivery, // FIXED: Corrected function name
} = require("../controllers/deliveryController");

const router = express.Router();

// User Routes
router.post("/", protect, createDelivery);

// Admin Routes
router.get("/", protect, adminOnly, getDeliveries);
router.put("/:id/status", protect, adminOnly, updateDelivery); // FIXED: Corrected function reference

// Get delivery by ID
router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate("order");
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
